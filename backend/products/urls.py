from .views import MaterialViewSet, FurnitureTypeViewSet, FurnitureViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('material', MaterialViewSet, 'material')
router.register('furniture_type', FurnitureTypeViewSet, 'furniture?type')
router.register('furniture', FurnitureViewSet, 'furniture')
urlpatterns = router.urls
