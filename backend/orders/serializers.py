from rest_framework import serializers
from django.utils import timezone
from .models import OrderProduct, Order, Delivery, Review
from products.models import Product
from products.serializers import ProductSerializer
import logging


class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = ['order', 'delivery_date', 'status']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['order', 'product', 'rating', 'comment']


class OrderProductSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    product = ProductSerializer(read_only=True)
    product_obj = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        write_only=True
    )
    backorder_quantity = serializers.ReadOnlyField()

    class Meta:
        model = OrderProduct
        fields = ['id', 'product', 'product_obj',
                  'backorder_quantity', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    date = serializers.DateTimeField(read_only=True)
    ord_products = OrderProductSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'date', 'delivered', 'ord_products', 'client']

    def create(self, validated_data):

        ord_products = validated_data.pop('ord_products')

        order = Order.objects.create(
            date=timezone.now(),
            delivered=validated_data.pop('delivered'),
            client=validated_data.pop('client')
        )

        for prod in ord_products:
            self.createOrderProduct(order, **prod)

        return order

    def createOrderProduct(self, order, product_obj, quantity):
        rem_prod_quant = product_obj.available_quantity - quantity

        product_obj.available_quantity = 0 if (
            rem_prod_quant <= 0
        ) else rem_prod_quant

        product_obj.save()

        backord_quant = 0 if (rem_prod_quant >= 0) else rem_prod_quant

        new_order_product = OrderProduct.objects.create(
            order=order,
            product=product_obj,
            quantity=quantity,
            backorder_quantity=backord_quant
        )

        return new_order_product
