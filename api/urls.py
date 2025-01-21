from django.urls import path
from .views import listar_professores, ProfessoresView, ProfessoresDetailView

# Cada url passada aqui, executa as funções importadas do view
urlpatterns = [
    path('professores', listar_professores),
    path('prof', ProfessoresView.as_view()),
    path('id/<int:pk>', ProfessoresDetailView.as_view())
]
