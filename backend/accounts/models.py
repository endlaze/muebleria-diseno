from django.db import models
from django.contrib.auth.models import User
from locations.models import Location, City


class EmployeeType(models.Model):
    desc = models.CharField(max_length=50)
    min_salary = models.DecimalField(max_digits=19, decimal_places=2)
    max_salary = models.DecimalField(max_digits=19, decimal_places=2)


class Employee(User):
    emp_type = models.ForeignKey(EmployeeType, on_delete=models.CASCADE)
    salary = models.DecimalField(max_digits=19, decimal_places=2)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)


class Client(User):
    def add_address(self, city, zip_code, address_line):
        Address.objects.create(client=self, city=city,
                               zip_code=zip_code, address_line=address_line)


class Address(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='client')
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='city')
    zip_code = models.IntegerField()
    address_line = models.CharField(max_length=100)
