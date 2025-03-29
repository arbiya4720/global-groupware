## global-groupware  EmployWise Assignment
## Overview
This project is a React application that integrates with the Reqres API to perform basic user management functions. It includes authentication, user listing with pagination, and CRUD operations (Edit & Delete).

## Lecvel 1
Tech Stack
Frontend: React.js+typescript , Axios
State Management: React Hooks
HTTP Requests: Axios
Routing: React Router DOM
UI Frameworks: Bootstrap, React Bootstrap
Validation: Yup with React Hook Form
Alerts & Notifications: SweetAlert
Email: eve.holt@reqres.in
Password: cityslicka
On successful login, the token is stored and the user is redirected to the Users List page.

## Level 2
Fetches and displays a paginated list of users. API Endpoint
GET: /api/users?page=1 Displays user’s first name, last name, and avatar Supports pagination using API requests.

## Level 3: Edit, Delete, and Update Users
Edit User: Clicking Edit opens a pre-filled form allowing the update of: First name Last name Email
API Endpoint: PUT /api/users/{id}

Delete User: Clicking Delete removes the user from the list.
API Endpoint: DELETE /api/users/{id} Proper success/error messages are displayed for all operations.

## Installation & Setup
git clone https://github.com/arbiya4720/global-groupware/ 
cd employwise-assignment 
npm install

## Running the Project
npm run dev
