# Generated by Django 4.2 on 2024-05-07 13:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parties', '0005_statement_hide_in_app'),
    ]

    operations = [
        migrations.AddField(
            model_name='party',
            name='votematch_id',
            field=models.CharField(blank=True, default='', verbose_name='Votematch ID'),
        ),
        migrations.AddField(
            model_name='statement',
            name='votematch_id',
            field=models.CharField(blank=True, default='', verbose_name='Votematch ID'),
        ),
    ]
