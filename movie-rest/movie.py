from flask import Flask, render_template, request, jsonify, make_response
import json
import sys
from werkzeug.exceptions import NotFound

app = Flask(__name__)

PORT = 3200
HOST = '0.0.0.0'

with open('{}/databases/movies.json'.format("."), "r") as jsf:
   movies = json.load(jsf)["movies"]

# root message
@app.route("/", methods=['GET'])
def home():
    return make_response(render_template("index.html",body_text="<h1 style='color:blue'>Hello Word!</h1>"),200)


# get all movies
@app.route("/movies", methods=['GET'])
def get_movies():
    return make_response(jsonify(movies),200)
    # return make_response(jsonify([]),200)

# get movie by id
@app.route("/movies/<string:movie_id>", methods=['GET'])
def get_movie(movie_id):
    response = {}
    for movie in movies:
        if movie["id"] == movie_id:
            response["links"] = {"Description": "Ce lien permet de récuperer les dates de diffusion du film","lien": "http://localhost:3202/showtimes/movie/"+movie_id}
            response["movie"] = movie

            return make_response(jsonify(response),200)
    raise NotFound("Movie with id {} not found".format(movie_id))


# post movie
@app.route("/movies", methods=['POST'])
def post_movie():
    movie = request.json
    # check if movie already exists
    for m in movies:
        if m["id"] == movie["id"]:
            raise NotFound("Movie with id {} already exists".format(movie["id"]))
    movies.append(movie)
    return make_response(jsonify(movie),201)

# update movie
@app.route("/movies/<string:movie_id>", methods=['PUT'])
def update_movie(movie_id):
    movie = request.json
    for m in movies:
        if m["id"] == movie_id:
            m["title"] = movie["title"]
            m["director"] = movie["director"]
            m["rating"] = movie["rating"]
            return make_response(jsonify(m),200)
    raise NotFound("Movie with id {} not found".format(movie_id))

# delete movie
@app.route("/movies/<string:movie_id>", methods=['DELETE'])
def delete_movie(movie_id):
    for movie in movies:
        if movie["id"] == movie_id:
            movies.remove(movie)
            return make_response(jsonify(movie),200)
    raise NotFound("Movie with id {} not found".format(movie_id))


# get all movies by director
@app.route("/movies/director/<string:director>", methods=['GET'])
def get_movies_by_director(director):
    movies_by_director = []
    for movie in movies:
        if movie["director"] == director:
            movies_by_director.append(movie)
    return make_response(jsonify(movies_by_director),200)
    

if __name__ == "__main__":
    print("Server running in port %s"%(PORT))
    app.run(host=HOST, port=PORT)
