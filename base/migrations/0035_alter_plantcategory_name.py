# Generated by Django 4.0.4 on 2023-03-08 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0034_alter_plantcategory_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plantcategory',
            name='name',
            field=models.CharField(choices=[('Trajnice-perene', 'Trajnice-perene'), ('Penjačice', 'Penjačice'), ('Puzavice', 'Puzavice'), ('Ukrasno žbunje', 'Ukrasno žbunje'), ('Začinsko i aromatično bilje', 'Začinsko i aromatično bilje'), ('Ukrasne trave', 'Ukrasne trave'), ('Sedumi i čuvarkuće', 'Sedumi i čuvarkuće'), ('Lišćari', 'Lišćari'), ('Četinari', 'Četinari'), ('Biljke za hlad', 'Biljke za hlad'), ('Sadnice voća', 'Sadnice voća'), ('Proizvodi na akciji', 'Proizvodi na akciji'), ('Ostalo', 'Ostalo')], default='Ostalo', max_length=50, unique=True),
        ),
    ]
