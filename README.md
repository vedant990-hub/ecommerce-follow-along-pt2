Ecommerce-Follow-Along

#### **Description and Summary**

Welcome to the **Ecommerce-Follow-Along** project! It's an exciting, mentor-guided journey in which we build a complete e-commerce platform with the MERN stack. Through this process, we will engage in creating scalable APIs, securing authentication, creating database schemas, and setting up the backend in Node.js using Express.

---
##  **Milestone 1: Project Overview**
### Why the MERN Stack?   The MERN stack is one of the most popularly used full stacks in web development for the following reasons:
- It is built using **JavaScript** throughout (frontend + backend), making it beginner-friendly.
- Every component is powerful yet lightweight, letting us build modern, scalable web applications.

Here's what MERN contains:
- **MongoDB**: A NoSQL database to store our application data.
- **Express**: A framework for building the backend logic.
- **React**: A library for building our user interface.
- **Node.js**: A runtime environment for executing JavaScript on the server.

---

### **What This Project Builds**

#### **REST API Structure and Endpoints**
APIs (Application Programming Interfaces) let the frontend and backend communicate. We’ll build a REST API that supports:
1. **User Authentication**: Allowing users to register and log in securely.
2. **Product Management**: Adding, updating, and retrieving product details.
3. Order Handling:  Seamless handling of customer orders.

The APIs would connect to our MongoDB database and get data back out, returning data formatted in JSON-JSON makes them more accessible and thus easier to be tested.

#### Database Schema Design
The databases are an absolute necessity to having everything go properly. For this MongoDB project:
- Define all your collections: examples include products, users, or orders.
  Structure relationships that have to do with features like: user orders as well as products categories.

#### **Role of Authentication**
Authentication is all about verifying who the user is. It’s what keeps an e-commerce site safe and ensures users can make purchases, view orders, or access personal data securely. We’ll implement secure login and registration features that protect sensitive information.

---

### **What I Learned**
This project will help you:
- Design scalable APIs for real-world applications.
- Build a strong backend using Node.js and Express.
- Design structured databases with MongoDB.
- Implement secure authentication mechanisms.
- Use React to build a modern, user-friendly interface.

---

---

### **Milestone 2: Project Setup and Login Page**

Day 2: Login Page Implementation
What I Did Today
On Day 2 of the follow-along project, I worked on implementing a LoginPage component using React. Below are the details of what was accomplished:

Key Features
State Management:

Utilized the useState hook to manage user credentials (email and password).
Dynamic Input Handling:

Added a handleChange function to dynamically update the state as the user types in the form fields.
Form Submission:

Created a handleClickLogin function to handle form submission. (Currently, API integration is commented out for future implementation.)
Responsive Design:

Designed the login page using Tailwind CSS for a modern and responsive layout.

```const [credentials, setCreds] = useState({
  email: "",
  password: ""
});

const handleChange = (event) => {
  const { name, value } = event.target;
  setCreds({
    ...credentials,
    [name]: value
  });
};

const handleClickLogin = (event) => {
  event.preventDefault();
  console.log("Submitted Credentials:", credentials);
};
```

User Interface
The login page includes:
Email Input Field: For users to enter their email address.
Password Input Field: For users to enter their password.
Submit Button: To initiate the login process.
Challenges Faced
Tailwind CSS Setup:

Ensured the Tailwind setup was correctly configured in tailwind.config.js.
Imported required Tailwind directives in the project’s main CSS file.
Backend API Integration:

While initially planning to use Axios, API integration is postponed, and the Axios import is commented out for now.
Next Steps
Integrate backend API for user authentication.
Implement proper error handling and form validation.
Enhance UI/UX by displaying success or error messages after login attempts.

### Milestone 3 Overview
In this milestone, I have successfully implemented the following key features for the backend project:

Backend Folder Structure
I have meticulously organized the backend project files by creating a well-defined hierarchy. This includes separating essential components such as routes, controllers, models, and middleware. This structure not only ensures a clean and manageable codebase but also lays the foundation for scaling the application as new features are added. Additionally, I have started understanding terms like utils and middlewares, which play an integral role in backend development.

Node.js Server Setup
To handle API requests efficiently, I set up a Node.js server using Express. The server has been configured to listen on a designated port, ensuring smooth communication between the client and server. This setup serves as the backbone for managing backend processes and acts as a gateway for future API integrations.

MongoDB Integration
I successfully integrated MongoDB into the project, enabling efficient and reliable data storage. The integration process included setting up a connection between the server and the database, which has been thoroughly tested and confirmed. This step ensures that the application can handle data management seamlessly, paving the way for robust CRUD operations.

Error Handling Implementation
Recognizing the importance of a resilient application, I implemented basic error-handling mechanisms. These include providing clear error messages that enhance the debugging process and offer better user feedback. The error handling setup not only improves the reliability of the application but also makes it more developer-friendly for future troubleshooting and enhancements.

Additional Notes
Throughout this milestone, I have followed best practices to ensure that the backend code remains modular and maintainable. By adhering to a structured approach, I have set a solid groundwork that will support the development of more advanced features in subsequent milestones. This milestone also served as an opportunity to enhance my understanding of backend architecture and the integration of modern tools like MongoDB.

With these achievements, the foundation for a robust and scalable backend system is firmly in place. Moving forward, I am well-prepared to tackle more complex functionalities, optimize the existing codebase, and ensure the backend system aligns seamlessly with the project’s overall goals.

---

# Milstone 5

# React Signup Page

This is a simple React-based signup page that allows users to register with their full name, email, password, and avatar image. The component also includes a password visibility toggle and validates the form before submission.

## Features
- User input fields for Full Name, Email, and Password.
- Password visibility toggle for easy password entry.
- Avatar upload functionality.
- Form submission with `multipart/form-data` for file upload.
- A link to redirect users to the login page if they already have an account.

## Tech Stack
- React
- React Icons (`react-icons`)
- Axios for API requests
- Tailwind CSS for styling

## File Structure
- `SignupPage.js`: Main component for the signup form.
- `style.js`: Custom styling for the page (ensure it is properly linked).

## Setup

1. **Install Dependencies**:
   Ensure you have `react-icons` and `axios` installed in your project. If not, you can install them using npm:

   ```bash
   npm install react-icons axios