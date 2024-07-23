from fastapi import FastAPI
app = FastAPI()

@app.post("/register")
def register():
    return {"message": "User registered successfully"}
