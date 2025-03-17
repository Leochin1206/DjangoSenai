from django.urls import path
from .views import listar_professores, ProfessoresView, ProfessoresDetailView, listar_disciplinas, DisciplinasView, DisciplinasDetailView
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView,)

# Cada url passada aqui, executa as funções importadas do view
urlpatterns = [
    path('professores', listar_professores),
    path('prof', ProfessoresView.as_view()),
    path('prof/id/<int:pk>', ProfessoresDetailView.as_view()),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('disciplina', listar_disciplinas),
    path('disci', DisciplinasView.as_view()),
    path('disci/id/<int:pk>', DisciplinasDetailView.as_view()),
]

