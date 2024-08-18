from flask import Flask, request, jsonify,g,Blueprint # type: ignore
from flask_socketio import SocketIO, send, emit # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore
from datetime import datetime # Add this line to import datetime module
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
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
class Sheet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Cell(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    row = db.Column(db.Integer, nullable=False)
    column = db.Column(db.Integer, nullable=False)
    value = db.Column(db.String(30), nullable=False)
    sheet_id = db.Column(db.Integer, db.ForeignKey('sheet.id'), nullable=False)
    sheet = db.relationship('Sheet', backref=db.backref('cells', lazy=True))

class UserSheet(db.Model):
    __tablename__ = 'user_sheet'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    sheet_id = db.Column(db.Integer, db.ForeignKey('sheet.id'), primary_key=True)
    # Define relationships
    user = db.relationship('User', backref=db.backref('user_sheets', lazy=True))
    sheet = db.relationship('Sheet', backref=db.backref('user_sheets', lazy=True))

class SheetInvitation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    sheet_id = db.Column(db.Integer, db.ForeignKey('sheet.id'), nullable=False)
    status = db.Column(db.Integer,default=0)
    user = db.relationship('User', backref=db.backref('invitations', lazy=True))
    sheet = db.relationship('Sheet', backref=db.backref('invitations', lazy=True))

class UserDoc(db.Model):
    __tablename__ = 'user_doc'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    doc_id = db.Column(db.Integer, db.ForeignKey('document.id'), primary_key=True)
    # Define relationships
    user = db.relationship('User', backref=db.backref('user_docs', lazy=True))
    document = db.relationship('Document', backref=db.backref('user_docs', lazy=True))

with app.app_context():
    # // delete db
    # db.drop_all()  # Drop all tables
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
        return jsonify({"message": "User created successfully", "user_id": new_user.id,'username':username,'email':email}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    # username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or  (user.password != password):
        return jsonify({"message": "Invalid credentials"}), 401

    return jsonify({"message": "Login successful", "user_id": user.id,"username" : user.username,"email":email}), 200
    
# @app.route('/protected', methods=['GET'])
# @jwt_required()
# def protected():
#     current_user = get_jwt_identity()
#     return jsonify(logged_in_as=current_user), 200

# documents apis


@app.route('/documents/<int:id>', methods=['POST'])
def create_document(id):
    data = request.json
    doc_name = data['name']
    updated_at = datetime.utcnow()
    new_document = Document(document_content='', name=doc_name, updated_at=updated_at)
    db.session.add(new_document)
    db.session.commit()
    # link the document to the user
    user_doc = UserDoc(user_id=id, doc_id=new_document.id)
    db.session.add(user_doc)
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
    return jsonify({'id': document.id, 'document_content': document.document_content,'updated_at' : document.updated_at}), 200

# Update a document (UPDATE)
@app.route('/documents/<int:id>', methods=['PUT'])
def update_document(id):
    document = Document.query.get_or_404(id)
    data = request.json
    document.document_content = data['document_content']
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
    data = request.json
    
    if not data or not all(k in data for k in ('row', 'column', 'value', 'sheet_id')):
        return jsonify({'message': 'Missing data'}), 400
    
    new_cell = Cell(
        row=data['row'],
        column=data['column'],
        value=data['value'],
        sheet_id=data['sheet_id']
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

    data = request.json
    if 'row' in data:
        cell.row = data['row']
    if 'column' in data:
        cell.column = data['column']
    if 'value' in data:
        cell.value = data['value']

    try:
        db.session.commit()
        return jsonify({'message': 'Cell updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error updating cell: {str(e)}'}), 500


# POST API to create a new Sheet
@app.route('/sheets', methods=['POST'])
def create_sheet():
    data = request.json
    
    if not data or 'name' not in data:
        return jsonify({'message': 'Missing data'}), 400
    
    new_sheet = Sheet(name=data['name'])
    
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
    # eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 5000)), app)
    socketio.run(app, host='172.23.194.171', port=5000)
