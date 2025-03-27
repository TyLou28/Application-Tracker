from django.urls import path
from .views import get_users, register, userRegistrationAPIView, userLoginAPIView, userLogoutAPIView

urlpatterns = [
    path('users/', get_users, name='get_users'),
    path('users/register', userRegistrationAPIView.as_view(), name='register'),
    path('users/login', userLoginAPIView.as_view(), name='login'),
    path('users/logout', userLogoutAPIView.as_view(), name='logout')
]