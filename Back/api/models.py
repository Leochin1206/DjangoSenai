from django.db import models

class Cadastro(models.Model):
    ni = models.CharField(max_length=15)
    nome = models.CharField(max_length=255)
    email = models.EmailField()
    cel = models.CharField(max_length=255)
    ocup = models.FloatField()
    
class CadastroDisciplinas(models.Model):
    disciplina = models.CharField(max_length=255)
    sigla = models.CharField(max_length=255)
    curso = models.CharField(max_length=255)
    semestre = models.IntegerField()
    carga_horaria = models.IntegerField()