package auth

import (
	"crypto/rand"
	"encoding/json"
	"fmt"
	"os"
	"strconv"

	"com.rishabh.beingInGym/model"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/twilio/twilio-go"
	twilioApi "github.com/twilio/twilio-go/rest/api/v2010"
	"gopkg.in/gomail.v2"
)

func SendOtp(c *gin.Context) {
	var model model.SendOtpSchema
	if err := c.ShouldBindJSON(&model); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	otp := gen6DigitRandomDigits()

	if model.Phone != "" {
		if err := sendOtpByPhone(model.Phone, otp); err != nil {
			c.JSON(500, gin.H{"error": "Failed to send OTP by phone"})
			return
		}
	}

	if model.Email != "" {
		if err := sendOtpByEmail(model.Email, otp); err != nil {
			c.JSON(500, gin.H{"error": "Failed to send OTP by email"})
			return
		}
	}

	c.JSON(200, gin.H{"message": "OTP sent successfully"})
}

func sendOtpByPhone(phone, otp string) error {
	if err := godotenv.Load(); err != nil {
		return fmt.Errorf("error loading .env file: %w", err)
	}

	accountSid := os.Getenv("TWILIO_ACCOUNT_SID")
	authToken := os.Getenv("TWILIO_AUTH_TOKEN")
	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		Username: accountSid,
		Password: authToken,
	})

	params := &twilioApi.CreateMessageParams{}
	params.SetTo(phone)
	params.SetFrom(os.Getenv("TWILIO_PHONE_NUMBER"))
	params.SetBody(fmt.Sprintf("Your OTP is: %s", otp))

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		return fmt.Errorf("error sending SMS message: %w", err)
	}

	response, _ := json.Marshal(resp)
	fmt.Println("Response: " + string(response))
	return nil
}

func sendOtpByEmail(email, otp string) error {
	if err := godotenv.Load(); err != nil {
		return fmt.Errorf("error loading .env file: %w", err)
	}

	from := os.Getenv("SMTP_EMAIL")
	password := os.Getenv("SMTP_PASSWORD")
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPortStr := os.Getenv("SMTP_PORT")
	smtpPort, err := strconv.Atoi(smtpPortStr)
	if err != nil {
		return fmt.Errorf("invalid SMTP_PORT: %w", err)
	}

	m := gomail.NewMessage()
	m.SetHeader("From", from)
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Your OTP Code")
	m.SetBody("text/plain", fmt.Sprintf("Your OTP is: %s", otp))

	d := gomail.NewDialer(smtpHost, smtpPort, from, password)

	if err := d.DialAndSend(m); err != nil {
		return fmt.Errorf("error sending email: %w", err)
	}

	fmt.Println("OTP sent successfully to email: " + email)
	return nil
}

func gen6DigitRandomDigits() string {
	b := make([]byte, 3)
	_, err := rand.Read(b)
	if err != nil {
		panic(err)
	}
	return fmt.Sprintf("%06d", int(b[0])<<16|int(b[1])<<8|int(b[2]))
}