from django.contrib import admin
from django.urls import path
from mi_app import views

urlpatterns = [
    path('libros/', views.lista_libros, name='lista_libros'),
    path('libros/<int:id>/', views.detalle_libro, name='detalle_libro'),
    path('libros/nuevo/', views.crear_libro, name='crear_libro'),
    path('libros/<int:id>/actualizar/', views.actualizar_libro, name='actualizar_libro'),
    path('libros/<int:id>/eliminar/', views.eliminar_libro, name='eliminar_libro'),
]
