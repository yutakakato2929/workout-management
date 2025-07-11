# Generated by Django 5.1.7 on 2025-03-16 03:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Workout',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('exercise', models.CharField(max_length=100)),
                ('sets', models.IntegerField()),
                ('reps', models.IntegerField()),
                ('weight', models.FloatField(blank=True, null=True)),
            ],
        ),
    ]
