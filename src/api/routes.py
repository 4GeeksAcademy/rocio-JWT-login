"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import os

api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api
)

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    if not email or not password : 
       return jsonify({"msg": "email y password son requeridos"}) 
    user = User.query.filter_by(email = email, password=password).first()
    if not user : return jsonify({"msg": "email y password son incorrectos"})

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)



@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
    email = get_jwt_identity()
    dictionary ={
        "message": "hello world "+email
    }
    return jsonify(dictionary)


