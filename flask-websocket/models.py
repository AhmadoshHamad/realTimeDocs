from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from datetime import datetime # Add this line to import datetime module
# from app import db

db = SQLAlchemy()




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
