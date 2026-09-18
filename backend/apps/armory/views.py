from rest_framework import viewsets, filters, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Weapon, WeaponModel, WeaponAnimation, WeaponVariant
from .serializers import (
    CategorySerializer, WeaponListSerializer, WeaponDetailSerializer,
    WeaponModelSerializer, WeaponAnimationSerializer, WeaponVariantSerializer
)

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

class WeaponViewSet(viewsets.ModelViewSet):
    queryset = Weapon.objects.select_related('category', 'faction', 'universe', 'model_3d').prefetch_related('animations', 'variants').all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'id'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'category__slug', 'rarity', 'faction', 'universe', 'is_featured', 'energy_type']
    search_fields = ['name', 'description', 'lore_snippet', 'primary_material', 'fictional_manufacturer']
    ordering_fields = ['fictional_power_rating', 'fictional_stability', 'name', 'created_at']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return WeaponDetailSerializer
        return WeaponListSerializer

    @action(detail=False, methods=['get'], url_path='featured')
    def featured_weapons(self, request):
        featured = self.get_queryset().filter(is_featured=True)[:6]
        serializer = WeaponListSerializer(featured, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='compare')
    def compare_weapons(self, request):
        ids_param = request.query_params.get('ids', '')
        if not ids_param:
            return Response({'error': 'Please provide comma separated weapon IDs'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            ids = [int(i.strip()) for i in ids_param.split(',') if i.strip().isdigit()]
        except ValueError:
            return Response({'error': 'Invalid IDs provided'}, status=status.HTTP_400_BAD_REQUEST)

        weapons = self.get_queryset().filter(id__in=ids)
        serializer = WeaponDetailSerializer(weapons, many=True, context={'request': request})
        return Response(serializer.data)
