# Generated by Django 5.1.1 on 2024-11-10 20:20

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0010_alter_descuento_fin_alter_descuento_inicio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='descuento',
            name='fin',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 10, 14, 20, 33, 79146)),
        ),
        migrations.AlterField(
            model_name='descuento',
            name='inicio',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 10, 14, 20, 33, 79146)),
        ),
    ]