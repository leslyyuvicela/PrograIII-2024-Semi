# Generated by Django 5.1.1 on 2024-11-16 21:10

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0009_producto_tipo_ingrediente'),
        ('ventas', '0003_remove_venta_producto_extra_extra_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Extras',
        ),
        migrations.AddField(
            model_name='tipo_ingrediente',
            name='mensaje',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='tipo_ingrediente',
            name='multiple',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='descuento',
            name='fin',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 16, 15, 10, 18, 346898)),
        ),
        migrations.AlterField(
            model_name='descuento',
            name='inicio',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 16, 15, 10, 18, 346898)),
        ),
        migrations.AddField(
            model_name='producto_tipo_ingrediente',
            name='producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tipos_ingrediente', to='menu.producto'),
        ),
        migrations.AddField(
            model_name='producto_tipo_ingrediente',
            name='tipo_ingrediente',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='productos', to='menu.tipo_ingrediente'),
        ),
    ]
