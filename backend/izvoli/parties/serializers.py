from rest_framework import serializers
from .models import Party

class PartySerializer(serializers.ModelSerializer):

    class Meta:
        model = Party
        fields = ['id', 'name', 'image', 'votematch_id', 'finished_quiz']