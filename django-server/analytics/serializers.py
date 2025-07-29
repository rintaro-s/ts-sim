from rest_framework import serializers

class ActionSerializer(serializers.Serializer):
    turn = serializers.IntegerField()
    male_score_change = serializers.IntegerField()
    female_score_change = serializers.IntegerField()
    crisis_score_change = serializers.IntegerField()
