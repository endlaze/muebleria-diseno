from django.db import models
from products.models import Product
from accounts.models import Client


class Order(models.Model):
    date = models.DateTimeField(editable=False)
    delivered = models.BooleanField()
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name='orders'
    )


class OrderProduct (models.Model):
    order = models.ForeignKey(
        Order,
        related_name='ord_products',
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
    quantity = models.IntegerField()
    backorder_quantity = models.IntegerField()


class Delivery(models.Model):
    order = models.OneToOneField(
        Order,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='delivery'
    )

    delivery_date = models.DateField()

    ORDER_STATUSES = (
        (1, 'En proceso'),
        (2, 'En camino'),
        (3, 'Entregado')
    )

    status = models.IntegerField(choices=ORDER_STATUSES)


class Review(models.Model):
    order = models.ForeignKey(
        Order,
        related_name='reviews',
        on_delete=models.CASCADE
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='reviews'
    )

    rating = models.FloatField()
    comment = models.TextField()
