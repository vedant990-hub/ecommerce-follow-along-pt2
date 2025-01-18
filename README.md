# Ecommerce-Follow-Along Project

## Project Overview

Welcome to the Ecommerce-Follow-Along project! This is an exciting, mentor-guided journey to build a complete e-commerce platform using the MERN stack. We will develop scalable APIs, secure authentication systems, robust database schemas, and set up the backend in Node.js with Express.

---

## Why the MERN Stack?
The MERN stack is widely used in modern web development for the following reasons:

- *JavaScript Throughout*: Both the frontend and backend use JavaScript, making it beginner-friendly.
- *Lightweight yet Powerful*: Each component is highly efficient and helps in building scalable web applications.

*Components of the MERN stack*:
- *MongoDB*: A NoSQL database to store application data.
- *Express*: A framework for building backend logic.
- *React*: A library for building user interfaces.
- *Node.js*: A runtime environment for executing JavaScript on the server.

---

## What This Project Builds

### REST API Structure and Endpoints
We will create APIs for:

1. *User Authentication*: Secure user login and registration.
2. *Product Management*: Adding, updating, and retrieving product details.
3. *Order Handling*: Managing customer orders.

The APIs will connect to MongoDB, allowing easy data retrieval and providing data formatted in JSON for better accessibility and testing.

### Database Schema Design
We will define MongoDB collections for:
- *Users*
- *Products*
- *Orders*

These collections will also feature relationships, like tracking user orders and managing product categories.

### Role of Authentication
Authentication ensures the security of sensitive user data. We’ll implement secure login and registration mechanisms, protecting user information from unauthorized access.

---

## Milestones Completed

### Milestone 2: Project Setup and Login Page

*Key Features*:
- *State Management*: Managed user credentials (email and password) using useState.
- *Dynamic Input Handling*: Updated the state dynamically as the user typed into form fields.
- *Form Submission*: Handled form submission with a placeholder function (API integration to follow).
- *Responsive Design*: Designed the page with Tailwind CSS for a modern and responsive layout.

*Challenges Faced*:
- *Tailwind CSS Setup*: Configured Tailwind CSS correctly in the project.
- *Backend API Integration*: Postponed the Axios integration for later development.

*Next Steps*:
- Integrate the backend API for user authentication.
- Implement proper error handling and form validation.
- Enhance UI/UX by showing success or error messages after login attempts.

---

### Milestone 3: Backend Setup

*Backend Structure*:
- Created a clean folder hierarchy for the backend project (routes, controllers, models, middleware).
- Set up a *Node.js server* with *Express* to handle API requests.

*MongoDB Integration*:
- Integrated MongoDB to store data efficiently, and tested the connection for CRUD operations.

*Error Handling*:
- Implemented basic error handling for better debugging and user feedback.

---

### Milestone 5: React Signup Page

*Features*:
- *User Input Fields*: Captured user data such as Full Name, Email, and Password.
- *Password Visibility Toggle*: Provided users with an option to toggle password visibility.
- *Avatar Upload*: Enabled users to upload an avatar image.
- *Form Submission*: Form handles multipart/form-data for file uploads and integrates with the backend (via Axios).

*Tech Stack*:
- React
- React Icons
- Axios for API requests
- Tailwind CSS for styling

*Setup*:
1. Install the necessary dependencies:
    bash
    npm install react-icons axios
    

---

### Milestone 6: Password Encryption

*Why Encrypting Passwords?*
- *Protect User Data*: Password encryption prevents exposure in case of a security breach.
- *Privacy*: Ensures passwords are not visible to unauthorized individuals.
- *Compliance*: Meets security standards like GDPR and PCI-DSS.
- *Stops Password Theft*: Encrypted passwords are harder to steal or guess.

*Tasks Completed*:
1. *Password Encryption*:
   - Implemented *bcrypt* to hash passwords during signup.
   - Ensured hashed passwords are stored in the database instead of plain text.
  
2. *Storing Complete User Data*:
   - Saved user information, including name, email, and other details, while keeping the password secure.