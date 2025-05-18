from functools import wraps
from flask import Flask, request, jsonify, g, Blueprint, make_response  
from flask_socketio import SocketIO, send, emit 
from flask_sqlalchemy import SQLAlchemy 
# Change this line at the top of your file
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash 
# from flask_bcrypt import Bcrypt 
# from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity 

from flask_cors  import CORS, cross_origin
from models import * 
from dotenv import load_dotenv
import os
import jwt
# from jwt import encode, decode, exceptions

app = Flask(__name__)

socketio = SocketIO(app, cors_allowed_origins="*")
load_dotenv()  # Load environment variables from .env file
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['APP_SECRET_KEY'] = os.getenv("APP_SECRET_KEY")

# db = SQLAlchemy(app)
db.init_app(app)
CORS(app, supports_credentials=True, origins=["http://localhost:3000","https://linen-stingray-263248.hostingersite.com"])

with app.app_context():
  
    db.create_all()  # Create all tables
  

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
def handle_message(auth_header):
    # Broadcast the message to all clients except the sender
    print(f"Received message: {auth_header['message']}")
    socketio.emit('receive_message', auth_header, skip_sid=request.sid)
    
@app.route('/')
def home():
    return 'Hello, Flask!'

# Login-Register-User endpoint



# Registration endpoint
@app.route('/register', methods=['POST'])
def register():
    auth_header = request.get_json()

    username = auth_header.get('username')
    email = auth_header.get('email')
    password = auth_header.get('password')

    if not username or not password or not email:
        return jsonify({"message": "all fields are required"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password)
    try:
        db.session.add(new_user)
        db.session.commit()
        # Get the user ID after committing
        user_id = new_user.id
        token = jwt.encode({"userId": user_id, "role": "to be cont", "exp": datetime.utcnow() + timedelta(minutes=30)},
                           app.config['APP_SECRET_KEY'])
        return jsonify({"token": token,
                        "message": "User created successfully"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    auth_header = request.get_json()
    # username = auth_header.get('username')
    email = auth_header.get('email')
    password = auth_header.get('password')

    if not email or not password:
        return jsonify({"message": "email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or  not check_password_hash(user.password,password):
        return jsonify({"message": "Invalid credentials"}), 401

    token = jwt.encode({
        "userId" : user.id,"role" : "to be continued",         "exp": datetime.utcnow() + timedelta(minutes=30) },
            key=app.config["APP_SECRET_KEY"])
   
    return jsonify({"token" : token}), 200


def token_required(f):
    @wraps(f)
    def decorated(*args,**kwargs):
        auth_header = request.headers.get('Authorization')
    
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify("Missing or invalid authorization header"), 401
        try:
            token = auth_header.split(' ')[1]
            payload = jwt.decode(token,app.config["APP_SECRET_KEY"], algorithms=['HS256'])
            user = User.query.filter_by(id = payload['userId']).first()
        except jwt.ExpiredSignatureError:
            return jsonify("Token Expired"), 401
        except jwt.InvalidTokenError:
            return jsonify("Not valid Token"), 401
        except Exception as e:
            return jsonify(f"Error {str(e)}"), 500
        return f(user,*args,**kwargs)
    return decorated




@app.route('/documents', methods=['POST'])
@token_required
def create_document(user):
    data = request.json
    doc_name = data['name']
    updated_at = datetime.utcnow()
    new_document = Document(document_content='', name=doc_name, updated_at=updated_at)
    db.session.add(new_document)
    db.session.commit()
    # link the document to the user
    user_doc = UserDoc(user_id=user.id, doc_id=new_document.id)
    db.session.add(user_doc)
    db.session.commit()
    return jsonify({'doc_id': new_document.id}), 201

# Get all documents (READ)
@app.route('/users/me/documents', methods=['GET'])
@token_required
def get_documents(user):
    documents = db.session.query(Document).join(UserDoc, Document.id == UserDoc.doc_id).filter(UserDoc.user_id == user.id).all()
    return jsonify([
        {
            'id': doc.id,
            'name': doc.name,
        } for doc in documents
    ]), 200

# Get a specific document by ID (READ)
@app.route('/documents/<int:doc_id>', methods=['GET'])
@token_required
def get_document(user, doc_id):
    # Check if the document belongs to the user
    user_doc = UserDoc.query.filter_by(user_id=user.id, doc_id=doc_id).first()
    if not user_doc:
        return jsonify({'error': 'access denied'}), 403

    document = Document.query.get_or_404(doc_id)
    return jsonify({
        'id': document.id,
        'document_content': document.document_content,
        'updated_at': document.updated_at
    }), 200

# Update a document (UPDATE)
@app.route('/documents/<int:id>', methods=['PUT'])
@token_required
def update_document(user,id):
    document = db.session.query(Document).join(UserDoc, UserDoc.doc_id == Document.id).filter(UserDoc.user_id == user.id).first()
    if not document:
        return jsonify ({"message" : "Forbidden"}) , 403  
    
    auth_header = request.json
    document.document_content = auth_header['document_content']
    document.updated_at = datetime.utcnow()
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
def create_user_doc(user):
    auth_header = request.json
    user_id = auth_header.get('user_id')
    doc_id = auth_header.get('doc_id')

    # Validate user and document existence
    if not User.query.get(user_id):
        return jsonify({'error': 'User not found'}), 404
    if not Document.query.get(doc_id):
        return jsonify({'error': 'Document not found'}), 404

    user_doc = UserDoc(user_id=user_id, doc_id=doc_id)
    db.session.add(user_doc)
    db.session.commit()

    return jsonify({'user_id': user_doc.user_id, 'doc_id': user_doc.doc_id}), 201

@app.route('/documents', methods=['GET'])
@token_required
def get_documents_by_user(user):
    print(user)
    print(f"user id is {user.id} !!!!!!!!!!!!11")
    # Fetch all user-doc associations for the given user
    user_docs = UserDoc.query.filter_by(user_id=user.id).all()

    if not user_docs:
        return jsonify({'error': 'User has no associated documents'}), 404

    # Extract document IDs from user-doc associations
    doc_ids = [user_doc.doc_id for user_doc in user_docs]

    # Fetch documents based on IDs
    documents = Document.query.filter(Document.id.in_(doc_ids)).all()

    # Serialize the result
    result = [{'id': doc.id, 'document_content': doc.document_content, 'name': doc.name, 'updated_at': doc.updated_at.strftime('%Y-%m-%d'),'collaborators' : get_collaborators(doc.id)} for doc in documents]

    return jsonify(result), 200

def get_collaborators(doc_id):
    user_docs = UserDoc.query.filter_by(doc_id=doc_id).all()
    user_ids = [user_doc.user_id for user_doc in user_docs]
    users = User.query.filter(User.id.in_(user_ids)).all()
    return [{ 'username': user.username} for user in users]

# Sheets apis
# POST API to create a new Cell
@app.route('/cells', methods=['POST'])
def create_cell():
    auth_header = request.json
    
    if not auth_header or not all(k in auth_header for k in ('row', 'column', 'value', 'sheet_id')):
        return jsonify({'message': 'Missing auth_header'}), 400
    
    new_cell = Cell(
        row=auth_header['row'],
        column=auth_header['column'],
        value=auth_header['value'],
        sheet_id=auth_header['sheet_id']
    )
    
    try:
        db.session.add(new_cell)
        db.session.commit()
        return jsonify({'message': 'Cell created successfully', 'cell': {
            'id': new_cell.id,
            'row': new_cell.row,
            'column': new_cell.column,
            'value': new_cell.value,
            'sheet_id': new_cell.sheet_id
        }}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error creating cell: {str(e)}'}), 500

# PUT API to update a Cell
@app.route('/cells/<int:id>', methods=['PUT'])
def update_cell(id):
    cell = Cell.query.get(id)
    if not cell:
        return jsonify({'message': 'Cell not found'}), 404

    auth_header = request.json
    if 'row' in auth_header:
        cell.row = auth_header['row']
    if 'column' in auth_header:
        cell.column = auth_header['column']
    if 'value' in auth_header:
        cell.value = auth_header['value']

    try:
        db.session.commit()
        return jsonify({'message': 'Cell updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error updating cell: {str(e)}'}), 500


# POST API to create a new Sheet
@app.route('/sheets', methods=['POST'])
def create_sheet():
    auth_header = request.json
    
    if not auth_header or 'name' not in auth_header:
        return jsonify({'message': 'Missing auth_header'}), 400
    
    new_sheet = Sheet(name=auth_header['name'])
    
    try:
        db.session.add(new_sheet)
        db.session.commit()
        return jsonify({'message': 'Sheet created successfully', 'sheet': {
            'id': new_sheet.id,
            'name': new_sheet.name,
            'updated_at': new_sheet.updated_at
        }}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error creating sheet: {str(e)}'}), 500

# GET API to retrieve all Sheets
@app.route('/sheets', methods=['GET'])
def get_sheets():
    sheets = Sheet.query.all()
    result = [
        {
            'id': sheet.id,
            'name': sheet.name,
            'updated_at': sheet.updated_at
        } for sheet in sheets
    ]
    return jsonify(result), 200

# GET API to retrieve a specific Sheet by ID
@app.route('/sheets/<int:id>', methods=['GET'])
def get_sheet(id):
    sheet = Sheet.query.get(id)
    if not sheet:
        return jsonify({'message': 'Sheet not found'}), 404
    
    return jsonify({
        'id': sheet.id,
        'name': sheet.name,
        'updated_at': sheet.updated_at
    }), 200


if __name__ == '__main__':
    # eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 5001)), app)
    socketio.run(app, host='0.0.0.0', port=5001,debug=True)


