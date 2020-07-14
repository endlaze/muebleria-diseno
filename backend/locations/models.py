from django.db import models


class Country(models.Model):
    iso3 = models.CharField(max_length=3, unique=True)
    name = models.CharField(max_length=50)
    phone_code = models.IntegerField()


class City(models.Model):
    name = models.CharField(max_length=50)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)


class Location(models.Model):
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    BRANCH_OFFICE = 1
    WORKSHOP = 2
    LOC_TYPES = (
        (BRANCH_OFFICE, 'Sucursal'),
        (WORKSHOP, 'Taller')
    )
    loc_type = models.IntegerField(choices=LOC_TYPES)
