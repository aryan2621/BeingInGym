package model

type SendOtpSchema struct {
	Email string `json:"email"`
	Phone string `json:"phone"`
	Id    string `json:"id" binding:"required"`
}
type VerifyOtpSchema struct {
	OTP string `json:"otp" binding:"required"`
	Id  string `json:"id" binding:"required"`
}
type ResponseHTTP struct {
	Success bool   `json:"success"`
	Data    any    `json:"data"`
	Message string `json:"message"`
}
