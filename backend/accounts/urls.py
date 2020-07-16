from .views import EmployeeTypeViewSet, EmployeeViewSet, ClientViewSet, AddressViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('employee_type', EmployeeTypeViewSet, 'employee_type')
router.register('employee', EmployeeViewSet, 'employee')
router.register('client', ClientViewSet, 'client')
router.register('address', AddressViewSet, 'client-address')

urlpatterns = router.urls
