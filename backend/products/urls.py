from .views import MaterialViewSet, FurnitureTypeViewSet, FurnitureViewSet, FurnitureComboViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('material', MaterialViewSet, 'material')
router.register('furniture_type', FurnitureTypeViewSet, 'furniture_type')
router.register('furniture', FurnitureViewSet, 'furniture')
router.register('furniture_combo', FurnitureComboViewSet, 'furniture_combo')
urlpatterns = router.urls
