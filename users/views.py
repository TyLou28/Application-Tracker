from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import userSerialiser

@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serialiser = userSerialiser(users, many=True)
    return Response(serialiser.data)

@api_view(['POST'])
def register(request):
    serialiser = userSerialiser(data=request.data)
    if serialiser.is_valid():
        serialiser.save()
        return Response(serialiser.data, status=status.HTTP_201_CREATED)
    return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)
