class user:
    def __init__(self, first_name, last_name, email, password, profile_picture):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.profile_picture = profile_picture

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.email} {self.password} {self.profile_picture}"
