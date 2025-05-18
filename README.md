# RealTimeDocs - Collaborative Document Editor

## Project Overview

RealTimeDocs is a real-time collaborative document editing platform inspired by Google Docs. This application allows users to create, edit, and collaborate on documents in real-time with multiple users simultaneously.

The project demonstrates the implementation of modern web technologies including React, Redux, Flask WebSockets, and real-time collaborative features.



## The Challenge

This project was developed as part of a one-week coding challenge to create a Google Docs-like application with real-time collaboration features. The challenge covered:


<!-- ![RealTimeDocs Screenshot](login.png) -->

## Features

- **Real-time Collaboration**: Edit documents simultaneously with multiple users
- **User Authentication**: Secure login and registration system
- **Document Management**: Create, view, edit and delete documents
<!-- - **Document Sharing**: Share documents with other users -->
- **Rich Text Editing**: Format text with various styling options
- **Spreadsheet Support**: Basic spreadsheet functionality (similar to Google Sheets)
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React.js with Vite
- Redux & Redux Saga for state management
- Socket.IO client for real-time communication
- TailwindCSS for styling
- React Router for navigation
- React-Quill for rich text editing

### Backend
- Flask (Python web framework)
- Flask-SocketIO for WebSockets
- SQLAlchemy for database ORM
- JWT for authentication
- RESTful API architecture

## Installation and Setup

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- Git

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/realTimeDocs.git
cd realTimeDocs
```

2. Set up the Python virtual environment
```bash
cd flask-websocket
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the flask-websocket directory with the following:
```
SQLALCHEMY_DATABASE_URI=sqlite:///instance/users.db
APP_SECRET_KEY=your-secret-key-here
```

5. Run the Flask server
```bash
python app.py
```
The server will run on http://localhost:5001

### Frontend Setup

1. Navigate to the React project directory
```bash
cd ../react-websocket
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the react-websocket directory with:
```
VITE_SOCKET_URL=http://localhost
VITE_SOCKET_PORT=5001
```

4. Start the development server
```bash
npm run dev
```
The application will be available at http://localhost:5173

## Project Structure

```
realTimeDocs/
├── flask-websocket/       # Backend Flask application
│   ├── app.py             # Main Flask application
│   ├── models.py          # Database models
│   └── requirements.txt   # Python dependencies
└── react-websocket/       # Frontend React application
    ├── public/            # Static files
    ├── src/               # Source code
    │   ├── components/    # React components
    │   ├── pages/         # Page components
    │   ├── actions/       # Redux actions
    │   ├── reducers/      # Redux reducers
    │   ├── App.jsx        # Main application component
    │   └── main.jsx       # Application entry point
    ├── package.json       # Node.js dependencies
    └── vite.config.js     # Vite configuration
```

## Usage

1. Register a new account or login with existing credentials
2. Create a new document from the dashboard
3. Edit your document with the rich text editor
4. Share your document with other users via the share button
5. Collaborate in real-time with shared users

## Future Improvements

- Enhanced document organization with folders
- More advanced text formatting options
- Comment and suggestion features
- Version history and document recovery
- Mobile application support


Developed as part of a one-week coding challenge


> "Salamat Team,  
> I know that you are looking forward to this, its gonna be fun, full of information, and challenging.
> This is something you need to learn yourself, and the 1 week timeline is something you need to use wisely.
> By the end of this week you will be amazed how much you achieved, and how powerful our brains are."

### Challenge Requirements:

- **React.js, Vite, Tailwind CSS**
- **Understanding of Browser Rendering**:
  - Browser rendering process
  - DOM and CSSOM trees
  - Event loop and task queue in JavaScript
- **Front-end Skills**:
  - HTML semantics and structure
  - Advanced CSS (Flexbox, Grid, responsive design)
  - JavaScript (closures, prototypes, ES6+, async programming)
- **React.js Implementation**:
  - Context API, Hooks (useState, useEffect, useReducer)
  - Component lifecycle and best practices
  - State management
- **State Management**:
  - Redux architecture
  - Redux Saga for side effects
- **Real-Time Collaboration Features**:
  - Document editing with multiple users
  - WebSocket communication
  - User authentication and document sharing
