from flask import Flask, request, jsonify,g,Blueprint # type: ignore
from flask_socketio import SocketIO, send, emit # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore
# from werkzeug.security import generate_password_hash, check_password_hash # type: ignore
# from flask_bcrypt import Bcrypt # type: ignore
# from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity # type: ignore

from flask_cors  import CORS, cross_origin


app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app,supports_credentials=True)




class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), nullable=False, unique=True)
    email = db.Column(db.String(30), nullable=False, unique=True)
    password = db.Column(db.String(150), nullable=False)

class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    document_content = db.Column(db.Text, nullable=False)

class UserDoc(db.Model):
    __tablename__ = 'user_doc'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    doc_id = db.Column(db.Integer, db.ForeignKey('document.id'), primary_key=True)
    # Define relationships
    user = db.relationship('User', backref=db.backref('user_docs', lazy=True))
    document = db.relationship('Document', backref=db.backref('user_docs', lazy=True))

with app.app_context():
    db.create_all()  # Create all tables
    # user_doc = UserDoc(user_id=1, doc_id=3)
    # db.session.add(user_doc)
    # db.session.commit()

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

# Login-Register-User endpoint


# Registration endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not password or not email:
        return jsonify({"message": "all fields are required"}), 400

    hashed_password = password
    new_user = User(username=username,email=email ,password=hashed_password)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully", "user_id": new_user.id}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or  (user.password != password):
        return jsonify({"message": "Invalid credentials"}), 401

    return jsonify({"message": "Login successful", "user_id": user.id}), 200
    
# @app.route('/protected', methods=['GET'])
# @jwt_required()
# def protected():
#     current_user = get_jwt_identity()
#     return jsonify(logged_in_as=current_user), 200

# documents apis


@app.route('/documents', methods=['POST'])
def create_document():
    data = request.json
    doc_name = data['name']
    new_document = Document(document_content='', name=doc_name)
    db.session.add(new_document)
    db.session.commit()
    return jsonify({'id': new_document.id}), 201

# Get all documents (READ)
@app.route('/documents', methods=['GET'])
def get_documents():
    documents = Document.query.all()
    return jsonify([{'id': doc.id, 'document_content': doc.document_content} for doc in documents]), 200

# Get a specific document by ID (READ)
@app.route('/documents/<int:id>', methods=['GET'])
def get_document(id):
    document = Document.query.get_or_404(id)
    return jsonify({'id': document.id, 'document_content': document.document_content}), 200

# Update a document (UPDATE)
@app.route('/documents/<int:id>', methods=['PUT'])
def update_document(id):
    document = Document.query.get_or_404(id)
    data = request.json
    document.document_content = data['document_content']
    db.session.commit()
    return jsonify({'id': document.id, 'document_content': document.document_content}), 200

# Delete a document (DELETE)
@app.route('/documents/<int:id>', methods=['DELETE'])
def delete_document(id):
    document = Document.query.get_or_404(id)
    db.session.delete(document)
    db.session.commit()
    return jsonify({'message': 'Document deleted successfully'}), 200


# UserDoc apis

# Create a new userDoc association
@app.route('/user_docs', methods=['POST'])
def create_user_doc():
    data = request.json
    user_id = data.get('user_id')
    doc_id = data.get('doc_id')

    # Validate user and document existence
    if not User.query.get(user_id):
        return jsonify({'error': 'User not found'}), 404
    if not Document.query.get(doc_id):
        return jsonify({'error': 'Document not found'}), 404

    user_doc = UserDoc(user_id=user_id, doc_id=doc_id)
    db.session.add(user_doc)
    db.session.commit()

    return jsonify({'user_id': user_doc.user_id, 'doc_id': user_doc.doc_id}), 201

@app.route('/users/<int:user_id>/documents', methods=['GET'])
def get_documents_by_user(user_id):
    # Fetch all user-doc associations for the given user
    user_docs = UserDoc.query.filter_by(user_id=user_id).all()

    if not user_docs:
        return jsonify({'error': 'No documents found for this user'}), 404

    # Extract document IDs from user-doc associations
    doc_ids = [user_doc.doc_id for user_doc in user_docs]

    # Fetch documents based on IDs
    documents = Document.query.filter(Document.id.in_(doc_ids)).all()

    # Serialize the result
    result = [{'id': doc.id, 'document_content': doc.document_content,'name': doc.name} for doc in documents]

    return jsonify(result), 200



if __name__ == '__main__':
    # eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 5000)), app)
    socketio.run(app, host='0.0.0.0', port=5000)
