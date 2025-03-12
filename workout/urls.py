from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WorkoutViewSet
from .views import workout_stats


router = DefaultRouter()
router.register(r'workouts', WorkoutViewSet)

urlpatterns = [
    path('stats/', workout_stats, name='workout-stats'),
    path('', include(router.urls)),
]