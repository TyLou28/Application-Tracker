from rest_framework import serializers
from .models import Applications 

class ApplicationsSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Applications
        fields = '__all__'
        read_only_field = ['applied_date']