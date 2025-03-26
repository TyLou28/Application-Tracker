from rest_framework import serializers
from .models import User

class userSerialiser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        read_only_field = ['id']
        write_only_field = ['password']