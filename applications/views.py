from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Applications
from .serializers import ApplicationsSerialiser

@api_view(['GET'])
def get_applications(request):
    applications = Applications.objects.all()
    serialiser = ApplicationsSerialiser(applications, many=True)
    return Response(serialiser.data)

@api_view(['POST'])
def create_applications(request):
    serialiser = ApplicationsSerialiser(data=request.data)
    if serialiser.is_valid():
        serialiser.save()
        return Response(serialiser.data, status=status.HTTP_201_CREATED)
    return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)

