from .views import OrderViewSet, ReviewViewSet, DeliveryViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('ord', OrderViewSet, 'ord')
router.register('review', ReviewViewSet, 'review')
router.register('delivery', DeliveryViewSet, 'delivery')

urlpatterns = router.urls
