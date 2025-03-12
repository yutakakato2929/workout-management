from rest_framework import viewsets
from .models import Workout
from .serializers import WorkoutSerializer
from django.db.models import Sum, Count
from rest_framework.decorators import api_view
from rest_framework.response import Response

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer

@api_view(['GET'])
def workout_stats(request):
    """トレーニングデータの統計情報を返す"""
    total_workouts = Workout.objects.count()  # 総トレーニング回数
    total_reps = Workout.objects.aggregate(Sum('reps'))['reps__sum'] or 0  # 合計レップ数
    total_volume = Workout.objects.aggregate(Sum('sets'))['sets__sum'] or 0  # 合計セット数
    workout_counts_by_date = Workout.objects.values('date').annotate(count=Count('id'))  # 日別トレーニング回数

    return Response({
        "total_workouts": total_workouts,
        "total_reps": total_reps,
        "total_sets": total_volume,
        "workout_counts_by_date": list(workout_counts_by_date),
    })