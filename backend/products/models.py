from django.db import models
from locations.models import Workplace


class Product(models.Model):
    description = models.TextField()
    price = models.DecimalField(max_digits=19, decimal_places=2)
    available_quantity = models.IntegerField()
    picture = models.TextField()


class Material(models.Model):
    description = models.CharField(max_length=50)


class FurnitureType(models.Model):
    description = models.CharField(max_length=50)


class Furniture(Product):
    materials = models.ManyToManyField(Material)

    furn_type = models.ForeignKey(
        FurnitureType,
        related_name='furniture_tp',
        on_delete=models.CASCADE
    )

    workshop = models.ForeignKey(
        Workplace,
        related_name='furniture',
        on_delete=models.CASCADE
    )
