from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Applications
from .serializers import ApplicationsSerialiser

@api_view(['GET'])
def get_applications(request):
    applications = Applications.objects.all()
    serialiser = ApplicationsSerialiser(applications, many=True)
    return Response(serialiser.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_application(request):
    request.data['user'] = request.user.id
    serialiser = ApplicationsSerialiser(data=request.data)
    if serialiser.is_valid():
        serialiser.save()
        return Response(serialiser.data, status=status.HTTP_201_CREATED)
    return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def application_details(request, pk):
    try:
        application = Applications.objects.get(pk=pk)
    except Applications.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        application.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serialiser = ApplicationsSerialiser(application, data=request.data)
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_201_CREATED)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_applications(request):
    user = request.user
    applications = Applications.objects.filter(user=user)
    serializer = ApplicationsSerialiser(applications, many=True)
    return Response(serializer.data)