from rest_framework import serializers
from .models import User

class userSerialiser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True},
                        'id': {'read_only': True}}
    
    def create(self, validated_data):
        email = validated_data["email"]
        first_name = validated_data["first_name"]
        last_name = validated_data["last_name"]
        password = validated_data["password"]

        user = User.objects.create_user(email=email, first_name=first_name, last_name=last_name, password=password)
        user.save()
        return user

class userRegistrationSerialiser(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "email", "password1", "password2")
        extra_kwargs = {'password': {'write_only': True},
                'id': {'read_only': True}}
        
    def validate(self, attrs):
        if attrs['password1'] != ['password2']:
            raise serializers.ValidationError("Passwords do not match")
        password = attrs.get("password1", "")
        if len(password) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters")
        return attrs
    
    def create(self, validated_data):
        password = validated_data.pop("password1")
        validated_data.pop("password2")

        return User.objects.create_user(password=password, **validated_data)