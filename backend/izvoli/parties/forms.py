from django import forms
from django.forms import widgets

from .models import StatementAnswer

class StatementAnswerForm(forms.ModelForm):
    class Meta:
        model = StatementAnswer
        fields = ["answer", "comment", "statement", "party"]
        widgets = {
            "answer": forms.RadioSelect(), # choices=[(True, "da"), (False, "ne")]
            "statement": forms.HiddenInput(),
            "party": forms.HiddenInput(),
            "comment": forms.Textarea()
        }
