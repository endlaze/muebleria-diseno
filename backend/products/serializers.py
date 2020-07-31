from rest_framework import serializers
from .models import Material, FurnitureType, Furniture
from locations.models import Workplace
from locations.serializers import WorkplaceSerializer


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Furniture
        fields = ['id', 'title', 'description', 'price', 'available_quantity']


class MaterialSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Material
        fields = ['id', 'description']


class FurnitureTypeSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = FurnitureType
        fields = ['id', 'description']


class FurnitureSerializer(ProductSerializer):
    furn_type = FurnitureTypeSerializer(read_only=True)
    workshop = WorkplaceSerializer(read_only=True)
    materials = MaterialSerializer(read_only=True, many=True)

    furn_type_id = serializers.PrimaryKeyRelatedField(
        queryset=FurnitureType.objects.all(),
        write_only=True
    )

    workshop_id = serializers.PrimaryKeyRelatedField(
        queryset=Workplace.objects.all(),
        write_only=True
    )

    materials_ids = serializers.PrimaryKeyRelatedField(
        queryset=Material.objects.all(),
        write_only=True,
        many=True
    )

    class Meta:
        model = Furniture
        fields = ProductSerializer.Meta.fields + \
            ['furn_type', 'workshop', 'materials',
                'furn_type_id', 'workshop_id', 'materials_ids', 'picture']

    def create(self, validated_data):
        furn_type_id = validated_data.pop('furn_type_id')
        workshop_id = validated_data.pop('workshop_id')
        materials_ids = validated_data.pop('materials_ids')

        furniture = Furniture.objects.create(
            furn_type=furn_type_id,
            workshop=workshop_id,
            **validated_data
        )

        furniture.save()
        furniture.materials.add(*materials_ids)
        furniture.save()
        return furniture
