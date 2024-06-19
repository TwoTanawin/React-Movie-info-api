import requests
import json

base_url = 'http://localhost:8000/api/movies/'

# Function to perform a GET request to retrieve all movies
def get_movies():
    response = requests.get(base_url)
    print(response.json())

# Function to perform a POST request to create a new movie
def create_movie():
    new_movie = {
        'title': 'New Movie',
        'director': 'New Director'
    }
    response = requests.post(base_url, data=json.dumps(new_movie), headers={'Content-Type': 'application/json'})
    print(response.json())

# Function to perform a PUT request to update a movie
def update_movie(movie_id):
    updated_movie = {
        'title': 'Updated Movie',
        'director': 'Updated Director'
    }
    response = requests.put(f'{base_url}{movie_id}/', data=json.dumps(updated_movie), headers={'Content-Type': 'application/json'})
    print(response.json())

# Function to perform a DELETE request to delete a movie
def delete_movie(movie_id):
    response = requests.delete(f'{base_url}{movie_id}/')
    print(response.status_code)

# Test each function
get_movies()
create_movie()
update_movie(4)  # Assuming there is a movie with ID 1
delete_movie(5)  # Assuming there is a movie with ID 1
