from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Movie
from .serializers import MovieSerializer

class MovieViewSet(viewsets.ViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def list(self, request):
        movies = self.queryset
        serializer = self.serializer_class(movies, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        movie = self.queryset.filter(pk=pk).first()
        if movie:
            serializer = self.serializer_class(movie)
            return Response(serializer.data)
        else:
            return Response({"message": "Movie not found"}, status=404)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)

    def update(self, request, pk=None):
        movie = self.queryset.filter(pk=pk).first()
        if movie:
            serializer = self.serializer_class(movie, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=400)
        else:
            return Response({"message": "Movie not found"}, status=404)

    def destroy(self, request, pk=None):
        movie = self.queryset.filter(pk=pk).first()
        if movie:
            movie.delete()
            return Response(status=204)
        else:
            return Response({"message": "Movie not found"}, status=404)
