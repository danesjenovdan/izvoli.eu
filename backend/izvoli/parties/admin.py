from django.contrib import admin
from django import forms
from django.db import models
from django.contrib.auth.models import User


from .models import (
    Election,
    Party,
    StatementGroup,
    Statement,
    StatementAnswer,
)

# Register your models here.
admin.site.register(Election)
admin.site.register(Party)
admin.site.register(StatementGroup)
admin.site.register(Statement)
admin.site.register(StatementAnswer)
