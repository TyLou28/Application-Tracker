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