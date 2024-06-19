from django.db import models

class Movie(models.Model):
    movie_name = models.CharField(max_length=255)
    director = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.movie_name

