import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .serializers import LibroSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status



# Helper function to load data from the JSON file
def load_libros():
    try:
        with open('libros.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []  # Return empty list if file doesn't exist

# Helper function to save data to the JSON file
def save_libros(libros):
    with open('libros.json', 'w') as file:
        json.dump(libros, file, indent=4)

# Obtener todos los libros
@api_view(['GET'])
def lista_libros(request):
    libros = load_libros()
    return JsonResponse(libros, safe=False)

# Obtener un solo libro por ID
@api_view(['GET'])
def detalle_libro(request, id):
    libros = load_libros()
    libro = next((libro for libro in libros if libro['id'] == id), None)
    if libro is None:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    return JsonResponse(libro)

# Crear un nuevo libro
@api_view(['POST'])
@csrf_exempt  # To allow POST requests
def crear_libro(request):
    libros = load_libros()
    new_libro = request.data
    libros.append(new_libro)
    save_libros(libros)
    return JsonResponse(new_libro, status=status.HTTP_201_CREATED)

# Actualizar un libro existente
@api_view(['PATCH'])
@csrf_exempt
def actualizar_libro(request, id):
    libros = load_libros()
    libro = next((libro for libro in libros if libro['id'] == id), None)
    if libro is None:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    # Update the book with the new data from the request
    libro.update(request.data)
    save_libros(libros)
    return JsonResponse(libro)

# Eliminar un libro
@api_view(['DELETE'])
@csrf_exempt
def eliminar_libro(request, id):
    libros = load_libros()
    libro = next((libro for libro in libros if libro['id'] == id), None)
    if libro is None:
        return Response(status=status.HTTP_404_NOT_FOUND)

    libros.remove(libro)
    save_libros(libros)
    return Response(status=status.HTTP_204_NO_CONTENT)
