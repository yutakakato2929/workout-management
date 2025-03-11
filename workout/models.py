from django.db import models

class Workout(models.Model):
    date = models.DateField()  # YYYY-MM-DD
    exercise = models.CharField(max_length=100)  # 種目
    sets = models.IntegerField()  # セット数
    reps = models.IntegerField()  # 回数
    weight = models.FloatField(null=True, blank=True)  # 重量（任意）

    def __str__(self):
        return f"{self.date} - {self.exercise} {self.sets}セット × {self.reps}回"