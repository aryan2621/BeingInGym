package main

import (
	"log"

	"com.rishabh.beingInGym/handler/auth"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.POST("/send-otp", auth.SendOtp)

	if err := router.Run("localhost:4200"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
