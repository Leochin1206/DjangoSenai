# Generated by Django 5.1.5 on 2025-03-17 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CadastroDisciplinas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('disciplina', models.CharField(max_length=255)),
                ('sigla', models.CharField(max_length=255)),
                ('curso', models.CharField(max_length=255)),
                ('semestre', models.IntegerField()),
                ('carga_horaria', models.IntegerField()),
            ],
        ),
    ]
