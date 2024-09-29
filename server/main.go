package main

import (
	"log"
	"os"

	"com.rishabh.beingInGym/database"
	"com.rishabh.beingInGym/handler/auth"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables once
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	// Initialize database with connection string from environment
	connectionString := os.Getenv("CONNECTION_STRING")
	if err := database.InitDB(connectionString); err != nil {
		log.Fatalf("Error initializing database: %v", err)
	}

	// Initialize Twilio and email services with env vars
	auth.InitEnv()

	// Create OTP table if it doesn't exist
	if err := database.CreateOTPTable(); err != nil {
		log.Fatalf("Error creating OTP table: %v", err)
	}

	// Setup Gin router with CORS middleware
	router := gin.Default()
	router.Use(cors.Default())

	// Define routes
	router.POST("/send-otp", auth.SendOtp)
	router.POST("/verify-otp", auth.VerifyOtp)

	// Get port from environment variable or default to 4200
	port := os.Getenv("PORT")
	if port == "" {
		port = "4200"
	}

	// Start the server
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
