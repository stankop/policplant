# Generated by Django 4.0.4 on 2022-05-14 21:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_alter_product_color'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='flowering_time',
            field=models.CharField(choices=[('JAKO SUNCE', 'JAKO SUNCE'), ('POLUSENKA', 'POLUSENKA'), ('SENKA', 'SENKA'), ('SUNCE', 'SUNCE')], default='SUNCE', max_length=20),
        ),
        migrations.AlterField(
            model_name='product',
            name='place_of_planting',
            field=models.CharField(choices=[('SAKSIJA', 'SAKSIJA'), ('ZARDINJERA', 'ZARDINJERA'), ('BASTA', 'BASTA'), ('OGRADA', 'OGRADA'), ('VISECA SAKSIJA', 'VISECA SAKSIJA'), ('POLUSENKA', 'POLUSENKA'), ('VECA SAKSIJA', 'VECA SAKSIJA')], default='VECA SAKSIJA', max_length=20),
        ),
    ]
