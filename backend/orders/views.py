from rest_framework import viewsets
from .models import Order, Delivery, Review
from .serializers import OrderSerializer, DeliverySerializer, ReviewSerializer


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()


class DeliveryViewSet(viewsets.ModelViewSet):
    serializer_class = DeliverySerializer
    queryset = Delivery.objects.all()


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
