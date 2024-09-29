package database

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	_ "github.com/lib/pq" // Add this line to import the PostgreSQL driver
	"golang.org/x/crypto/bcrypt"
)

var db *sql.DB

// InitDB initializes the database connection
func InitDB(connectionString string) error {
	var err error
	db, err = sql.Open("postgres", connectionString)
	if err != nil {
		return fmt.Errorf("error connecting to database: %w", err)
	}

	if err = db.Ping(); err != nil {
		return fmt.Errorf("error pinging database: %w", err)
	}

	log.Println("Successfully connected to the database")
	return nil
}

// GetDB returns the database instance
func GetDB() (*sql.DB, error) {
	if db == nil {
		return nil, fmt.Errorf("database is not initialized")
	}
	return db, nil
}

// CreateOTPTable creates the OTP table if it doesn't exist
func CreateOTPTable() error {
	query := `
	CREATE TABLE IF NOT EXISTS otp (
		id VARCHAR(255) PRIMARY KEY,
		otp_hash VARCHAR(255) NOT NULL,
		generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
	);
	`

	_, err := db.Exec(query)
	if err != nil {
		return fmt.Errorf("error creating OTP table: %w", err)
	}
	log.Println("OTP table created successfully")
	return nil
}

// VerifyOTP verifies if the OTP is valid and not expired
func VerifyOTP(inputOTP string) (bool, error) {
	query := `
	SELECT otp_hash, generated_at
	FROM otp
	ORDER BY generated_at DESC
	LIMIT 1
	`

	var storedHash string
	var generatedAt time.Time

	err := db.QueryRow(query).Scan(&storedHash, &generatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return false, nil
		}
		return false, fmt.Errorf("error querying OTP: %w", err)
	}

	// Check if OTP has expired (5-minute expiration)
	if time.Since(generatedAt) > 5*time.Minute {
		return false, fmt.Errorf("OTP has expired")
	}

	// Compare the hashed OTP with the input OTP
	err = bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(inputOTP))
	if err != nil {
		return false, nil
	}

	return true, nil
}

// StoreOTP stores the hashed OTP in the database
func StoreOTP(id string, otp string) error {
	// Generate the hashed OTP
	hashedOtp, err := bcrypt.GenerateFromPassword([]byte(otp), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("error hashing OTP: %w", err)
	}

	query := `
	INSERT INTO otp (id, otp_hash)
	VALUES ($1, $2)
	`
	_, err = db.Exec(query, id, hashedOtp)
	if err != nil {
		return fmt.Errorf("error storing OTP: %w", err)
	}
	log.Println("OTP stored successfully")
	return nil
}
