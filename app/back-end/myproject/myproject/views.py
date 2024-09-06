# myapp/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CandlestickSerializer, LineChartSerializer, BarChartSerializer, PieChartSerializer

class CandlestickDataView(APIView):
    def get(self, request):
        data = {
            "data": [
                {"x": "2023-01-01", "open": 30, "high": 40, "low": 25, "close": 35},
                {"x": "2023-01-02", "open": 35, "high": 45, "low": 30, "close": 40},
            ]
        }
        serializer = CandlestickSerializer(data=data['data'], many=True)
        if serializer.is_valid():
            return Response({"data": serializer.validated_data})
        return Response(serializer.errors, status=400)

class LineChartDataView(APIView):
    def get(self, request):
        data = {
            "labels": ["Jan", "Feb", "Mar", "Apr"],
            "data": [10, 20, 30, 40]
        }
        serializer = LineChartSerializer(data=data)
        if serializer.is_valid():
            return Response(serializer.validated_data)
        return Response(serializer.errors, status=400)

class BarChartDataView(APIView):
    def get(self, request):
        data = {
            "labels": ["Product A", "Product B", "Product C"],
            "data": [100, 150, 200]
        }
        serializer = BarChartSerializer(data=data)
        if serializer.is_valid():
            return Response(serializer.validated_data)
        return Response(serializer.errors, status=400)

class PieChartDataView(APIView):
    def get(self, request):
        data = {
            "labels": ["Red", "Blue", "Yellow"],
            "data": [300, 50, 100]
        }
        serializer = PieChartSerializer(data=data)
        if serializer.is_valid():
            return Response(serializer.validated_data)
        return Response(serializer.errors, status=400)
