from django.urls import path
from . import views

urlpatterns = [
    path('', views.listar_peliculas, name='listar_peliculas'),
    path('crear/', views.crear_pelicula, name='crear_pelicula'),
    path('editar/<int:id>/', views.editar_pelicula, name='editar_pelicula'),
    path('eliminar/<int:id>/', views.eliminar_pelicula, name='eliminar_pelicula'),
]