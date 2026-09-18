from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, WeaponViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'weapons', WeaponViewSet, basename='weapon')

urlpatterns = [
    path('', include(router.urls)),
]
