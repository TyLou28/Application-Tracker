from django.urls import path
from .views import get_users, userRegistrationAPIView, userLoginAPIView, userLogoutAPIView, userInfoAPIView

urlpatterns = [
    path('users/', get_users, name='get_users'),
    path('users/register', userRegistrationAPIView.as_view(), name='register'),
    path('users/login', userLoginAPIView.as_view(), name='login'),
    path('users/logout', userLogoutAPIView.as_view(), name='logout'),
    path('user', userInfoAPIView.as_view(), name='user_info')
]