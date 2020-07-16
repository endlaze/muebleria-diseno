from rest_framework import viewsets
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


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()
