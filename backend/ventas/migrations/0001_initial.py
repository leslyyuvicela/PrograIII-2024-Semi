# Generated by Django 5.1.1 on 2024-09-24 23:51

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('menu', '0001_initial'),
        ('usuarios', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Carrito',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='carrito', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Carrito',
                'verbose_name_plural': 'Carritos',
                'db_table': 'carritos',
            },
        ),
        migrations.CreateModel(
            name='Carrito_Producto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.IntegerField()),
                ('detalles', models.TextField(null=True)),
                ('carrito', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='productos', to='ventas.carrito')),
                ('ingredientes', models.ManyToManyField(related_name='carritos_productos', to='menu.ingrediente')),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='carritos', to='menu.producto')),
            ],
            options={
                'verbose_name': 'Carrito_Producto',
                'verbose_name_plural': 'Carritos_Productos',
                'db_table': 'carritos_productos',
            },
        ),
        migrations.CreateModel(
            name='Carrito_Producto_Extra',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.IntegerField()),
                ('carrito_producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='extras', to='ventas.carrito_producto')),
                ('extra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='carrito_productos', to='menu.extras')),
            ],
            options={
                'verbose_name': 'Carrito_Producto_Extra',
                'verbose_name_plural': 'Carritos_Productos_Extras',
                'db_table': 'carritos_productos_extras',
            },
        ),
        migrations.CreateModel(
            name='Venta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('costo_envio', models.DecimalField(decimal_places=2, max_digits=5, null=True)),
                ('direccion', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ventas', to='usuarios.direccion')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ventas', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Venta',
                'verbose_name_plural': 'Ventas',
                'db_table': 'ventas',
            },
        ),
        migrations.CreateModel(
            name='Venta_Producto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.IntegerField()),
                ('precio_compra', models.DecimalField(decimal_places=2, max_digits=5)),
                ('detalles', models.TextField(null=True)),
                ('ingredientes', models.ManyToManyField(related_name='ventas_productos', to='menu.ingrediente')),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ventas', to='menu.producto')),
                ('venta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='productos', to='ventas.venta')),
            ],
            options={
                'verbose_name': 'Venta_Producto',
                'verbose_name_plural': 'Ventas_Productos',
                'db_table': 'ventas_productos',
            },
        ),
        migrations.CreateModel(
            name='Venta_Producto_Extra',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.IntegerField()),
                ('precio_compra', models.DecimalField(decimal_places=2, max_digits=5)),
                ('extra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='venta_productos', to='menu.extras')),
                ('venta_producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='extras', to='ventas.venta_producto')),
            ],
            options={
                'verbose_name': 'Venta_Producto_Extra',
                'verbose_name_plural': 'Ventas_Productos_Extras',
                'db_table': 'ventas_productos_extras',
            },
        ),
    ]
