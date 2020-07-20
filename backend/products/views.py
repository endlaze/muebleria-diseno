from rest_framework import viewsets
from .models import Material, FurnitureType, Furniture
from .serializers import MaterialSerializer, FurnitureTypeSerializer, FurnitureSerializer


class MaterialViewSet(viewsets.ModelViewSet):
    serializer_class = MaterialSerializer
    queryset = Material.objects.all()


class FurnitureTypeViewSet(viewsets.ModelViewSet):
    serializer_class = FurnitureTypeSerializer
    queryset = FurnitureType.objects.all()


class FurnitureViewSet(viewsets.ModelViewSet):
    serializer_class = FurnitureSerializer
    queryset = Furniture.objects.all()
