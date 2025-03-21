from .models import Cadastro, CadastroDisciplinas
from .serializer import CadastroSerializer, CadastroDisciplinasSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_professores(request):
    if request.method == 'GET':
        queryset = Cadastro.objects.all()
        serializer = CadastroSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CadastroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# vizualiza todos os cadastros feitos e cadastra novos campos
class ProfessoresView(ListCreateAPIView):
    queryset = Cadastro.objects.all()
    serializer_class = CadastroSerializer
    permission_classes = [IsAuthenticated]

# Classe que retorna um cadastro feito, podendo fazer o update e o delete tambem
class ProfessoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Cadastro.objects.all()
    serializer_class = CadastroSerializer
    permission_classes = [IsAuthenticated]

# ============================= Disciplina =============================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_disciplinas(request):
    if request.method == 'GET':
        queryset = CadastroDisciplinas.objects.all()
        serializer = CadastroDisciplinasSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CadastroDisciplinasSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class DisciplinasView(ListCreateAPIView):
    queryset = CadastroDisciplinas.objects.all()
    serializer_class = CadastroDisciplinasSerializer
    permission_classes = [IsAuthenticated]

class DisciplinasDetailView(RetrieveUpdateDestroyAPIView):
    queryset = CadastroDisciplinas.objects.all()
    serializer_class = CadastroDisciplinasSerializer
    permission_classes = [IsAuthenticated]