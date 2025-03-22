from django.urls import path
from .views import get_applications, create_applications

urlpatterns = [
    path('applications/', get_applications, name='get_applications'),
    path('applications/create_application', create_applications, name='create_applications')
]