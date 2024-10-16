from django import forms
from .models import Pelicula
class FormPelicula(forms.ModelForm):
    class Meta:
        model=Pelicula
        fields = ['titulo', 'director', 'año']