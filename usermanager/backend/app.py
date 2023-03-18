from flask import Flask, request, jsonify, json
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Null

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    score = db.Column(db.Integer, nullable = False)

    def __repr__(self):
        return f"name: '{self.name}', id: {self.id}, score: {self.score}"

@app.route('/getUser/<name>')
def getUser(name):
    user = User.query.filter_by(name = name).first()
    if(user):
        return f"name: '{user.name}', id: {user.id}, score: {user.score}"
    else:
        return f"User with name: {name} not found"

#for testing only
@app.route('/getAll')
def getAll():
    users = User.query.all()
    for user in users:
        print(user)
    return ""

@app.route('/add/<id>/<name>/<score>', methods = ['POST'])
def addUser(id,name,score):
    if(request.method == 'POST'):
        newUser = User(id = id, name = name, score=score)

        oldUser = User.query.filter_by(id = id).first()

        if (not oldUser):
            db.session.add(newUser)
            db.session.commit()
            return f"Added {name} with score: {score}"
        else:
            return f"FAILED to add: id: {id} already exists"

@app.route('/delete/<id>', methods = ['OPTIONS', 'DELETE'])
def deleteUser(id):
    if(request.method == 'DELETE' or request.method == 'OPTIONS'):

        user = User.query.filter_by(id=id).first()
        db.session.delete(user)
        db.session.commit()
        
        return f"user with id {id} deleted"

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        app.debug = True
        app.run()