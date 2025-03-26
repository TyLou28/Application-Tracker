from django.db import models
from django.contrib.auth import models as auth_models

class UserManager(auth_models.BaseUserManager):

    def create_user(self, first_name: str, last_name: str, email: str, password: str = None) -> "User":
        if not email:
            raise ValueError("User must have an email")
        if not first_name:
            raise ValueError("User must have first name")
        if not last_name:
            raise ValueError("User must have last name")
        
        user = self.model(email=self.normalize_email(email))
        user.first_name = first_name
        user.last_name = last_name
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, first_name: str, last_name: str, email: str, password: str):
        user = self.create_user(first_name, last_name, email, password)
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

class User(auth_models.AbstractUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None
    
    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]
