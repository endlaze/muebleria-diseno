from rest_framework import viewsets, response
from rest_framework.decorators import action
from .models import EmployeeType, Employee, Client, Address
from .serializers import EmployeeTypeSerializer, EmployeeSerializer, ClientSerializer, AddressSerializer

class EmployeeTypeViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeTypeSerializer
    queryset = EmployeeType.objects.all()


class EmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()


class ClientViewSet(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        user = Client.objects.get(username = request.data.pop('username'))
        if user.check_password(request.data.pop('password')):
            serializer = ClientSerializer(user)
            return response.Response(serializer.data)
        else:
            return response.Response({})

class AuthViewSet(viewsets.ViewSet):
    @action(detail=True, methods=['post'])
    def login(self, request):
        user = Client.objects.get(username = request.data.username)
        if user.check_password(request.data.password):
            serializer = ClientSerializer(user)
            return response.Response(serializer.data)
        return response.Response({})


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()
