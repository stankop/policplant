# Generated by Django 4.0.4 on 2022-10-05 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_alter_plantcategory_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='user_name',
            field=models.CharField(max_length=150),
        ),
    ]
