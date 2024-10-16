from django.shortcuts import render, redirect, get_object_or_404
from .models import Pelicula
from .forms import FormPelicula

# Create your views here.

def crear_pelicula(request):
    if request.method == 'POST':
        form = FormPelicula(request.POST)
        if form.is_valid():
            form.save()
            return redirect('listar_peliculas')
    else:
        form = FormPelicula()
    return render(request, 'form_pelicula.html', {'form': form})
            
def listar_peliculas(request):
    peliculas = Pelicula.objects.all()
    return render(request, 'listar_peliculas.html', {'peliculas': peliculas})

def editar_pelicula(request, id):
    pelicula = get_object_or_404(Pelicula, id=id)
    if request.method == 'POST':
        form = FormPelicula(request.POST, instance=pelicula)
        if form.is_valid():
            form.save()
            return redirect('listar_peliculas')
    else:
        form = FormPelicula(instance=pelicula)
        return render(request, 'form_pelicula.html',{'form': form}) 

def eliminar_pelicula(request, id):
    pelicula = get_object_or_404(Pelicula, id=id)
    if request.method == 'POST':
        pelicula.delete()
        return redirect('listar_peliculas')
    return render(request, 'confirma_eliminacion.html', {'pelicula': pelicula})