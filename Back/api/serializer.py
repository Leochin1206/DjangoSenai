from rest_framework import serializers
from .models import Cadastro, CadastroDisciplinas

class CadastroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cadastro #referencia o Model de cadastro
        many = True #lida quando queremos fazer vários registros de uma vez
        fields = '__all__' #campos que serão transformados de json para python e vice versa

class CadastroDisciplinasSerializer(serializers.ModelSerializer):
    class Meta:
        model = CadastroDisciplinas
        fields = '__all__'