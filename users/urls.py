from django.urls import path
from .views import get_users, register, userRegistrationAPIView

urlpatterns = [
    path('users/', get_users, name='get_users'),
    path('users/register', userRegistrationAPIView.as_view(), name='register'),
]