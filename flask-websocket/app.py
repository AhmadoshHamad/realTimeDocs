from flask import Flask, request, jsonify # type: ignore
from flask_socketio import SocketIO, send, emit # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore
from flask_bcrypt import Bcrypt # type: ignore
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity # type: ignore
from flask import g

# from flask_cors  import CORS, cross_origin

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
# app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

# db = SQLAlchemy(app)
# bcrypt = Bcrypt(app)
# # CORS = CORS(app,supports_credentials=True)
# jwt = JWTManager(app)


# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(150), nullable=False, unique=True)
#     password = db.Column(db.String(150), nullable=False)

# @app.before_request
# def before_request():
#     if not hasattr(g, 'db_initialized'):
#         db.create_all()
#         g.db_initialized = True

# When a client connects
@socketio.on('connect')
def handle_connect():
    print('A user connected')

# When a client disconnects
@socketio.on('disconnect')
def handle_disconnect():
    print('A user disconnected')

# When a message is received from a client
@socketio.on('send_message')
def handle_message(data):
    # Broadcast the message to all clients except the sender
    print(f"Received message: {data['message']}")
    socketio.emit('receive_message', data, skip_sid=request.sid)

# @app.route('/register', methods=['POST'])
# def register():
#     data = request.get_json()
#     hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
#     new_user = User(username=data['username'], password=hashed_password)
#     db.session.add(new_user)
#     db.session.commit()
#     return jsonify(message="User registered successfully"), 201

# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     user = User.query.filter_by(username=data['username']).first()
#     if user and bcrypt.check_password_hash(user.password, data['password']):
#         access_token = create_access_token(identity={'username': user.username})
#         return jsonify(access_token=access_token), 200
#     else:
#         return jsonify(message="Invalid credentials"), 401
    
# @app.route('/protected', methods=['GET'])
# @jwt_required()
# def protected():
#     current_user = get_jwt_identity()
#     return jsonify(logged_in_as=current_user), 200
@app.route('/')
def index():
    return "Hello World"


if __name__ == '__main__':
    # eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 5000)), app)
    socketio.run(app, host='0.0.0.0', port=5000)
