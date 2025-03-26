from django.urls import path
from .views import get_users, register

urlpatterns = [
    path('users/', get_users, name='get_users'),
    path('users/register', register, name='register'),
]