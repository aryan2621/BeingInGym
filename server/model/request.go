package model

type SendOtpSchema struct {
	Email string `json:"email"`
	Phone string `json:"phone"`
	Id    string `json:"id"`
}

type ResponseHTTP struct {
	Success bool   `json:"success"`
	Data    any    `json:"data"`
	Message string `json:"message"`
}
