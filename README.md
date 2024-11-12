App
A simple Todo Application built with React for the frontend and Node.js for the backend. This app allows users to create, view, update, and delete todos.

Features

# Add Todo: Add a new task to the list.

# Edit Todo: Update the details of an existing task.
# Delete Todo: Remove a task from the list.
# Mark as Complete/Incomplete: Toggle the completion status of a task.

Persistent Storage: Data is stored and managed in a backend server using a database.

Tech Stack
Frontend: React, Fetch, TailwindCSS
Backend: Node.js, Express, MongoDB , Mongoose
Database: MongoDB

Prerequisites
Node.js
MongoDB
npm (comes with Node.js) or yarn
1. Clone the Repository

bash
Copy code
git clone https://github.com/yourusername/todo-app.git
cd todo-app

2. Backend Setup
Navigate to the backend folder:

bash
Copy code
cd backend
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the backend directory and add the following:

env
Copy code
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
Start the backend server:

bash
Copy code
npm start
The server should be running on http://localhost:5000.

3. Frontend Setup
Navigate to the frontend folder:

bash
Copy code
cd ../frontend
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the frontend directory and add:

env
Copy code
REACT_APP_API_URL=http://localhost:5000/api
Start the frontend server:

bash
Copy code
npm start
The frontend should be running on http://localhost:3000.

Project Structure
plaintext
Copy code
todo-app/
├── backend/
│   ├── config/             # Database configuration
│   ├── controllers/        # Controllers for handling requests
│   ├── models/             # Database models (e.g., Todo)
│   ├── routes/             # API routes (e.g., /api/todos)
│   ├── .env                # Backend environment variables
│   ├── server.js           # Express app initialization
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components (e.g., TodoList, TodoItem)
│   │   ├── services/       # API calls (using Axios)
│   │   ├── App.js          # Main React component
│   │   └── index.js        # Entry point
│   ├── public/
│   ├── .env                # Frontend environment variables
│   └── package.json
└── README.md

API Endpoints

Todo Endpoints

GET /api/todos - Get all todos

POST /api/todos - Add a new todo

PUT /api/todos/:id - Update an existing todo

DELETE /api/todos/:id - Delete a todo Usage

Open http://localhost:3000 in your browser.

Use the interface to add, edit, and delete tasks.

Troubleshooting

Ensure MongoDB is running and the connection URI is correct in the .env file.

Verify that both the frontend and backend servers are running on their respective ports.
