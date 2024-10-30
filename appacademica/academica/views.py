from django.shortcuts import render
from django.http import HttpResponse
import json
from .models import alumno, docente, materia, usuario
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q

# Create your views here.
def hola_mundo(request):
    return HttpResponse("Hola Mundo")

def saludo(request, nombre):
    return HttpResponse(f"Hola {nombre}, bienvenido a Programacion Computacional III")

def edad(request, edad):
    return HttpResponse("Tu edad es %s años" %edad)

def index(request):
    return render(request, 'index.html')

def vista(request, form):
    return render(request, f"{form}.html")

# Vista para consultar alumnos
def consultar_alumnos(request):
    filtro = request.GET.get('q', '')  # Recibe el parámetro de búsqueda
    if filtro:
        alumnos = alumno.objects.filter(
            Q(codigo__icontains=filtro) | 
            Q(nombre__icontains=filtro) 
        )
    else:
        alumnos = alumno.objects.all()  # Si no hay filtro, devuelve todos los alumnos
    
    datos = list(alumnos.values('id', 'codigo', 'nombre', 'direccion', 'telefono'))
    return JsonResponse(datos, safe=False)

# Vista para consultar docentes
def consultar_docentes(request):
    filtro = request.GET.get('q', '')  # Recibe el parámetro de búsqueda
    if filtro:
        docentes = docente.objects.filter(
            Q(codigo__icontains=filtro) | 
            Q(nombre__icontains=filtro) |
            Q(email__icontains=filtro)
        )
    else:
        docentes = docente.objects.all()  # Si no hay filtro, devuelve todos los docentes
    
    datos = list(docentes.values('id', 'codigo', 'nombre', 'direccion', 'telefono', 'email'))
    return JsonResponse(datos, safe=False)

# Vista para consultar materias
def consultar_materias(request):
    filtro = request.GET.get('q', '')
    if filtro:
        materias = materia.objects.filter(
            Q(codigo__icontains=filtro) | 
            Q(nombre__icontains=filtro)
        )
    else:
        materias = materia.objects.all()

    datos = list(materias.values('id', 'codigo', 'nombre', 'uv'))
    return JsonResponse(datos, safe=False)
@csrf_exempt
def guardar_alumno(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if( data.get("accion")=="nuevo" ):
            editAlumno = alumno.objects.create(
                codigo = data.get("codigo"),
                nombre = data.get("nombre"),
                direccion = data.get("direccion"),
                telefono = data.get("telefono"),
            )
        elif( data.get("accion")=="modificar" ):
            editAlumno = alumno.objects.get(id=data.get("idAlumno"))
            editAlumno.codigo = data.get("codigo")
            editAlumno.nombre = data.get("nombre")
            editAlumno.direccion = data.get("direccion")
            editAlumno.telefono = data.get("telefono")
            editAlumno.save()
        elif( data.get("accion")=="eliminar" ):
            editAlumno = alumno.objects.get(id=data.get("idAlumno"))
            editAlumno.delete()
        return JsonResponse({'msg':'ok', 'idAlumno': editAlumno.id})
    
@csrf_exempt
def guardar_docente(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if( data.get("accion")=="nuevo" ):
            editDocente = docente.objects.create(
                codigo = data.get("codigo"),
                nombre = data.get("nombre"),
                direccion = data.get("direccion"),
                telefono = data.get("telefono"),
                email = data.get("email"),
            )
        elif( data.get("accion")=="modificar" ):
            editDocente = docente.objects.get(id=data.get("idDocente"))
            editDocente.codigo = data.get("codigo")
            editDocente.nombre = data.get("nombre")
            editDocente.direccion = data.get("direccion")
            editDocente.telefono = data.get("telefono")
            editDocente.email = data.get("email")
            editDocente.save()

        elif( data.get("accion")=="eliminar" ):
            editDocente = docente.objects.get(id=data.get("idDocente"))
            editDocente.delete()
        return JsonResponse({'msg':'ok', 'idDocente': editDocente.id})

@csrf_exempt
def guardar_materia(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if( data.get("accion")=="nuevo" ):
            editMateria = materia.objects.create(
                codigo = data.get("codigo"),
                nombre = data.get("nombre"),
                uv = data.get("uv"),
            )
        elif( data.get("accion")=="modificar" ):
            editMateria = materia.objects.get(id=data.get("idMateria"))
            editMateria.codigo = data.get("codigo")
            editMateria.nombre = data.get("nombre")
            editMateria.uv = data.get("uv")
            editMateria.save()

        elif( data.get("accion")=="eliminar" ):
            editMateria = materia.objects.get(id=data.get("idMateria"))
            editMateria.delete()
        return JsonResponse({'msg':'ok', 'idMateria': editMateria.id})

# Vista para consultar usuarios
def consultar_usuarios(request):
    filtro = request.GET.get('q', '')  # Recibe el parámetro de búsqueda
    if filtro:
        usuarios = usuario.objects.filter(
            Q(usuario__icontains=filtro) | 
            Q(nombre__icontains=filtro) 
        )
    else:
        usuarios = usuario.objects.all()  # Si no hay filtro, devuelve todos los usuarios
    
    # Devolver los resultados como JSON
    datos = list(usuarios.values('id', 'usuario', 'nombre', 'direccion', 'telefono'))
    return JsonResponse(datos, safe=False)

@csrf_exempt
def guardar_usuario(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if data.get("accion") == "nuevo":
            editUsuario = usuario.objects.create(
                usuario=data.get("usuario"),
                clave=data.get("clave"),
                nombre=data.get("nombre"),
                direccion=data.get("direccion"),
                telefono=data.get("telefono"),
            )
        elif data.get("accion") == "modificar":
            editUsuario = usuario.objects.get(id=data.get("idUsuario"))
            editUsuario.usuario = data.get("usuario")
            editUsuario.clave = data.get("clave")
            editUsuario.nombre = data.get("nombre")
            editUsuario.direccion = data.get("direccion")
            editUsuario.telefono = data.get("telefono")
            editUsuario.save()
        elif data.get("accion") == "eliminar":
            editUsuario = usuario.objects.get(id=data.get("idUsuario"))
            editUsuario.delete()
        return JsonResponse({'msg': 'ok', 'idUsuario': editUsuario.id})
