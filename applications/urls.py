from django.urls import path
from .views import get_applications, create_application, application_details, user_applications

urlpatterns = [
    path('applications/', get_applications, name='get_applications'),
    path('applications/create_application', create_application, name='create_application'),
    path('user-applications', user_applications, name='user-applications'),
    path('applications/<int:pk>', application_details, name='application_details')
]