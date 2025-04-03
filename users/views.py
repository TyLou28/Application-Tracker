from rest_framework.decorators import api_view
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User
from .serializers import userSerialiser, userRegistrationSerialiser, userLoginSerialiser
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serialiser = userSerialiser(users, many=True)
    return Response(serialiser.data)

@api_view(['POST'])
def register(request):
    serialiser = userRegistrationSerialiser(data=request.data)
    if serialiser.is_valid():
        serialiser.save()
        return Response(serialiser.data, status=status.HTTP_201_CREATED)
    return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)

# Switched to APIView instead for better reuseability and scalability
class userRegistrationAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = userRegistrationSerialiser

    def post(self, request):
        serialiser = self.get_serializer(data=request.data)
        if serialiser.is_valid():
            user = serialiser.save()
            token = RefreshToken.for_user(user)
            data = serialiser.data
            data["tokens"] = {"refresh": str(token),
                              "access": str(token.access_token)}
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)

class userLoginAPIView(GenericAPIView):
        permission_classes = (AllowAny,)
        serializer_class = userLoginSerialiser

        def post(self, request):
             serialiser = self.get_serializer(data=request.data)
             if serialiser.is_valid():
                  user = serialiser.validated_data
                  serialiser = userSerialiser(user)
                  token = RefreshToken.for_user(user)
                  data = serialiser.data
                  data["tokens"] = {"refresh": str(token),
                                    "access": str(token.access_token)}
                  return Response(data, status=status.HTTP_200_OK)
             return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)
        
class userLogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
         try:
              refresh_token = request.data["refresh"]
              token = RefreshToken(refresh_token)
              token.blacklist()
              return Response(status=status.HTTP_205_RESET_CONTENT)
         except Exception as e:
              return Response(status=status.HTTP_404_NOT_FOUND)

class userInfoAPIView(RetrieveAPIView):
     permission_classes = (IsAuthenticated,)
     serializer_class = userSerialiser

     def get_object(self):
          return self.request.user