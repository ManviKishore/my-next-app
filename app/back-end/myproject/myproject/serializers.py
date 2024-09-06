# myapp/serializers.py
from rest_framework import serializers

class CandlestickSerializer(serializers.Serializer):
    x = serializers.DateField()
    open = serializers.FloatField()
    high = serializers.FloatField()
    low = serializers.FloatField()
    close = serializers.FloatField()

class LineChartSerializer(serializers.Serializer):
    labels = serializers.ListField(child=serializers.CharField())
    data = serializers.ListField(child=serializers.FloatField())

class BarChartSerializer(serializers.Serializer):
    labels = serializers.ListField(child=serializers.CharField())
    data = serializers.ListField(child=serializers.IntegerField())

class PieChartSerializer(serializers.Serializer):
    labels = serializers.ListField(child=serializers.CharField())
    data = serializers.ListField(child=serializers.IntegerField())
