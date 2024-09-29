package auth

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"os"
	"strconv"

	"com.rishabh.beingInGym/database"
	"com.rishabh.beingInGym/model"
	"github.com/gin-gonic/gin"
	"github.com/twilio/twilio-go"
	twilioApi "github.com/twilio/twilio-go/rest/api/v2010"
	"gopkg.in/gomail.v2"
)

// Initialize these variables once using the loaded environment variables
var twilioClient *twilio.RestClient
var smtpEmail, smtpPassword, smtpHost string
var smtpPort int

// InitEnv initializes environment-dependent services like Twilio and email
func InitEnv() {
	// Initialize Twilio client
	twilioClient = twilio.NewRestClientWithParams(twilio.ClientParams{
		Username: os.Getenv("TWILIO_ACCOUNT_SID"),
		Password: os.Getenv("TWILIO_AUTH_TOKEN"),
	})

	// Initialize email settings
	smtpEmail = os.Getenv("SMTP_EMAIL")
	smtpPassword = os.Getenv("SMTP_PASSWORD")
	smtpHost = os.Getenv("SMTP_HOST")
	portStr := os.Getenv("SMTP_PORT")
	smtpPort, _ = strconv.Atoi(portStr)
}

// Send OTP via Twilio SMS
func sendOtpByPhone(phone, otp string) error {
	params := &twilioApi.CreateMessageParams{}
	params.SetTo(phone)
	params.SetFrom(os.Getenv("TWILIO_PHONE_NUMBER"))
	params.SetBody(fmt.Sprintf("Your OTP is: %s", otp))

	resp, err := twilioClient.Api.CreateMessage(params)
	if err != nil {
		return fmt.Errorf("error sending SMS: %w", err)
	}

	fmt.Println("Twilio Response: ", resp)
	return nil
}

// Send OTP via Email
func sendOtpByEmail(email, otp string) error {
	m := gomail.NewMessage()
	m.SetHeader("From", smtpEmail)
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Your OTP Code")
	m.SetBody("text/plain", fmt.Sprintf("Your OTP is: %s", otp))

	d := gomail.NewDialer(smtpHost, smtpPort, smtpEmail, smtpPassword)
	if err := d.DialAndSend(m); err != nil {
		return fmt.Errorf("error sending email: %w", err)
	}

	fmt.Println("OTP sent successfully to email: " + email)
	return nil
}

// Generate 6-digit random OTP
func gen6DigitRandomDigits() string {
	// Generate a number between 100000 and 999999
	n, err := rand.Int(rand.Reader, big.NewInt(900000)) // Range size is 999999 - 100000 + 1 = 900000
	if err != nil {
		panic(err)
	}

	// Add 100000 to ensure the number is within the range 100000 - 999999
	return fmt.Sprintf("%06d", n.Int64()+100000)
}

// VerifyOtp handles OTP verification API endpoint
func VerifyOtp(c *gin.Context) {
	var req model.VerifyOtpSchema
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"status": 400, "message": err.Error()})
		return
	}

	isValid, err := database.VerifyOTP(req.OTP)
	if err != nil {
		if err.Error() == "OTP has expired" {
			c.JSON(400, gin.H{"status": 400, "message": "OTP has expired"})
		} else {
			c.JSON(500, gin.H{"status": 500, "message": "Failed to verify OTP"})
		}
		return
	}

	if !isValid {
		c.JSON(400, gin.H{"status": 400, "message": "Invalid OTP"})
		return
	}

	c.JSON(200, gin.H{"status": 200, "message": "OTP verified successfully"})
}

// SendOtp handles OTP sending API endpoint
func SendOtp(c *gin.Context) {
	var req model.SendOtpSchema
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"status": 400, "message": err.Error()})
		return
	}

	otp := gen6DigitRandomDigits()
	if err := database.StoreOTP(req.Id, otp); err != nil {
		c.JSON(500, gin.H{"status": 500, "message": "Failed to store OTP"})
		return
	}

	if req.Phone != "" {
		if err := sendOtpByPhone(req.Phone, otp); err != nil {
			c.JSON(500, gin.H{"status": 500, "message": "Failed to send OTP by phone"})
			return
		}
	}

	if req.Email != "" {
		if err := sendOtpByEmail(req.Email, otp); err != nil {
			c.JSON(500, gin.H{"status": 500, "message": "Failed to send OTP by email"})
			return
		}
	}

	c.JSON(200, gin.H{"status": 200, "message": "OTP sent successfully"})
}
