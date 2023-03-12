from flask import Flask

api = Flask(__name__)

@api.route('/')
def my_profile():
    response_body = {
        "name": "World",
        "about" :"Hello!"
    }

    return response_body