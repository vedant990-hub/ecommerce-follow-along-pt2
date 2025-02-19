Ecommerce-Follow-Along

#### *Description and Summary*

Welcome to the *Ecommerce-Follow-Along* project! It's an exciting, mentor-guided journey in which we build a complete e-commerce platform with the MERN stack. Through this process, we will engage in creating scalable APIs, securing authentication, creating database schemas, and setting up the backend in Node.js using Express.

---
##  *Milestone 1: Project Overview*
### Why the MERN Stack?   The MERN stack is one of the most popularly used full stacks in web development for the following reasons:
- It is built using *JavaScript* throughout (frontend + backend), making it beginner-friendly.  
- Every component is powerful yet lightweight, letting us build modern, scalable web applications.
 
Here's what MERN contains:  
- *MongoDB*: A NoSQL database to store our application data.  
- *Express*: A framework for building the backend logic.  
- *React*: A library for building our user interface.
- *Node.js*: A runtime environment for executing JavaScript on the server.  

---

### *What This Project Builds*  

#### *REST API Structure and Endpoints*  
APIs (Application Programming Interfaces) let the frontend and backend communicate. We’ll build a REST API that supports:  
1. *User Authentication*: Allowing users to register and log in securely.  
2. *Product Management*: Adding, updating, and retrieving product details.
3. Order Handling:  Seamless handling of customer orders.

The APIs would connect to our MongoDB database and get data back out, returning data formatted in JSON-JSON makes them more accessible and thus easier to be tested.

#### Database Schema Design
The databases are an absolute necessity to having everything go properly. For this MongoDB project:  
- Define all your collections: examples include products, users, or orders.
 Structure relationships that have to do with features like: user orders as well as products categories.

#### *Role of Authentication*  
Authentication is all about verifying who the user is. It’s what keeps an e-commerce site safe and ensures users can make purchases, view orders, or access personal data securely. We’ll implement secure login and registration features that protect sensitive information.

---

### *What I Learned*  
This project will help you:
- Design scalable APIs for real-world applications.
- Build a strong backend using Node.js and Express.
- Design structured databases with MongoDB. 
- Implement secure authentication mechanisms. 
- Use React to build a modern, user-friendly interface. 

---

---

### *Milestone 2: Project Setup and Login Page* 

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

const [credentials, setCreds] = useState({
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
# Milestone 4: Livebooks Backend Web Development

by the end of this milestone:

- *Create a User Model*: Think of it as the blueprint for storing user data like name, email, and password in the database.
- *Create a User Controller*: This will help you manage user-related actions like adding new users and fetching their details.
- *Enable and Configure Multer*: Want users to upload profile pictures? Multer’s got your back!
- *Update the README File*: Don’t forget to document your progress here.

---

## What’s the Plan?

### 1. What’s a Model?
A model is like a blueprint. It defines how data is structured in your database. Imagine designing a house—you need a plan first, right?

In MongoDB, we use schemas to define models. For example:

javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);


### 2. What’s a Controller?
Think of a controller as the manager of your app. It decides how to handle incoming requests and what responses to send back.

For example, here’s a simple controller to create a new user:

javascript
const createUser = (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });

  newUser.save()
    .then(() => res.status(201).send('User created successfully!'))
    .catch(err => res.status(500).send(err));
};

module.exports = { createUser };


### 3. File Uploads with Multer
Multer is a game-changer for handling file uploads. It lets users upload files, like profile pictures, to your server.

Here’s how you set it up:

javascript
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });
module.exports = upload;


---

## Steps to Rock Milestone 4 📝

Here’s the plan:

1. *User Model*: Build and implement the user schema with Mongoose.
2. *User Controller*: Write functions to handle user operations (like creating and retrieving users).
3. *Multer Magic*: Enable file uploads and set up storage for user files.
4. *Document It*: Update this README to reflect your progress.

---



# Milstone 5

# React Signup Page

This is a simple React-based signup page that allows users to register with their full name, email, password, and avatar image. The component also includes a password visibility toggle and validates the form before submission.

## Features
- User input fields for Full Name, Email, and Password.
- Password visibility toggle for easy password entry.
- Avatar upload functionality.
- Form submission with multipart/form-data for file upload.
- A link to redirect users to the login page if they already have an account.

## Tech Stack
- React
- React Icons (react-icons)
- Axios for API requests
- Tailwind CSS for styling

## File Structure
- SignupPage.js: Main component for the signup form.
- style.js: Custom styling for the page (ensure it is properly linked).

## Setup

1. *Install Dependencies*:
   Ensure you have react-icons and axios installed in your project. If not, you can install them using npm:

   ```bash
   npm install react-icons axios

---

# Milestone 6: Secure User Signup - Livebooks Project
Overview
Features Implemented
Password Encryption

Implemented bcrypt to hash user passwords during the signup process.
Stored the hashed passwords in the database to ensure security and prevent unauthorized access.
Secure User Data Storage

Collected and securely saved the following user data:
Name
Email
Encrypted Password
Ensured compliance with industry standards for secure data handling.
Learning Goals Achieved
Password Encryption:
Learned how to securely hash passwords using bcrypt and the importance of encryption in protecting user data.

Data Security:
Gained experience in securely storing user information while adhering to privacy regulations.

Why Password Encryption is Important
User Protection:
Protects sensitive data in case of a database breach.

Privacy:
Prevents passwords from being exposed to unauthorized individuals.

Compliance:
Ensures adherence to security laws and regulations, such as GDPR and PCI-DSS.

Prevention of Password Theft:
Makes it significantly harder for attackers to crack passwords.

Steps Taken
Password Hashing:

Used bcrypt.hash() to encrypt passwords before saving them to the database.
Data Storage:

Stored user details (name, email, and hashed password) securely in the MongoDB database.
Testing:

Verified the functionality by creating test users and checking the stored hashed passwords in the database.


---

## Milestone 6: Backend Web Development [V2] - Deploying Your API (Local and Production)

### Overview
This milestone focuses on creating a secure backend endpoint for the Signup page. The primary goals were to securely store user data, including encrypting passwords, and to ensure compliance with modern security standards.

### Learning Goals 🎯
By the end of this milestone, I achieved the following:
- *Password Encryption:* Learned how to encrypt passwords using bcrypt before saving them.
- *Secure Data Storage:* Successfully stored user data securely in the database.
- *Understanding Security Best Practices:*
  - Protecting user data from unauthorized access.
  - Ensuring compliance with regulations like GDPR and PCI-DSS.
  - Mitigating password theft risks through encryption.

### Why Encrypt Passwords?
- *Protect User Data:* Encrypting ensures that even if the database is compromised, passwords remain safe.
- *Privacy:* Prevents visibility of user passwords to anyone, including developers.
- *Compliance:* Adheres to security laws and regulations.
- *Mitigation Against Theft:* Makes it significantly harder for attackers to steal or guess passwords.

### Steps Completed in Milestone 6 📝
1. *Encrypt the Password:*
   - Implemented password hashing using bcrypt during the signup process.
   - Stored hashed passwords in the database instead of plain text for enhanced security.

2. *Store Complete User Data:*
   - Ensured secure storage of user details such as name, email, and password.
   - Maintained encrypted password storage to protect sensitive information.

---

## *Milestone 7!* 🌟  

Today, we’re diving into one of the most important parts of any backend system: user login. The goal here is to validate user credentials and securely verify passwords stored in your database. Let’s make it happen! 🚀  

---

## What I Learned? 🎯

By the end of this milestone, you’ll:  
- Understand how to validate user credentials during login.  
- Learn how to compare encrypted passwords with user inputs securely.

---

## Why Do We Encrypt Passwords? 🛡

Here’s why password encryption is such a big deal:  
1. *Protect User Data:* Even if the database is compromised, passwords remain safe.  
2. *Privacy:* Passwords won’t be stored in plain text (a major security no-no).  
3. *Compliance:* Meets standards like GDPR and PCI-DSS.  
4. *Prevents Password Theft:* Hashed passwords are tough to crack, which keeps things secure.

---

## How Does Login Authentication Work? 🔑

Here’s a quick breakdown of the login process:

1. *User Enters Their Credentials:*  
   - On the login page, users type their email/username and password.

2. *Fetch User Data from the Database:*  
   - The backend checks for the user in the database using the provided email/username.  
   - If no user is found, the system responds: "User does not exist."

3. *Compare Encrypted Passwords:*  
   - The system processes the entered password using the same hashing algorithm (like bcrypt).  
   - The hashed password is then compared with the one stored in the database.  
   - If the hashes match, login succeeds. If not, the user gets an error.  

*Fun fact:* Passwords are not "decrypted" because hashing is a one-way process. Instead, hashes are matched!

---

## Steps for Milestone 7 📝

1. *Build the Login Endpoint:*  
   - Accept user credentials (email/username and password).  
   - Retrieve the user’s data from the database.  

2. *Validate the Password:*  
   - Use bcrypt (or a similar library) to hash the input password.  
   - Compare the hashed password to the stored one.  
   - Authenticate the user if they match.  

---

## * Milestone 8 *
In *Milestone 8, we’ll build a **reusable card component* and design a *homepage* to display product cards.

---

## 🎯 Goals
- Create reusable *card components*.
- Dynamically display cards on the homepage.

---

## Why Card Components?
- *Show Products Clearly*: Neat and appealing display.  
- *Reusable Design*: Use across pages.  
- *Better UX*: Simplifies browsing.  
- *Organized Layout*: Clean homepage structure.

---

## Steps

### 1. Build the Card Component
- Add props for product *name, **image, and **price*.

### 2. Design Homepage Layout
- Use *grid* or *flexbox* for a neat arrangement of cards.

---


## **Milestone 9: Product Form Creation**  

---  

## 🎯 **Goals**  
- Create a **frontend form** for taking product input.  
- Add functionality to upload **multiple images** for a product.  

---  

## **Why Create a Product Form?**  
- **Collect Product Details**: Capture all necessary product information like name, price, and description.  
- **Database Storage**: These details will be stored in the database.  
- **Product Display**: Data will be displayed on the product homepage created in the previous milestone.  

---  

## **Steps**  

### 1. **Create the Form for Products**  
- Design a form to collect:  
  - Product Name  
  - Description  
  - Price  
  - Images  

### 2. **Handle Multiple Images**  
- Add functionality to allow uploading multiple product images.  
- Use `<input type="file" multiple>` for this purpose.  

---  

### 📝 **Note:**  
Feel free to experiment with features like:  
- Adding **admin access** to restrict product uploads.  
- Allowing only users with a **shop profile** to upload products.  

## **Milestone 10: Product Schema and Endpoint Creation**  

---  

## 🎯 **Goals**  
- Define a **Mongoose schema** for storing product data.  
- Implement **API endpoint** for adding products to MongoDB.  
- Ensure **data validation** and **error handling** for integrity.  

---  

## **Why Create a Product Schema and API?**  
- **Structured Data Storage**: Organize product details in MongoDB.  
- **Validation & Security**: Prevent invalid data entries.  
- **Scalability**: Enable future expansions like categories and stock tracking.  

---  

## **Steps**  

### 1. **Define Mongoose Schema**  
- Create a schema with necessary fields:  
  - **name** (*String, required*)  
  - **description** (*String, optional*)  
  - **price** (*Number, required, positive values only*)  
  - **imageUrl** (*String, optional, URL format validation*)  
- Use **Mongoose models** to interact with MongoDB.  

### 2. **Build API Endpoint**  
- Create a **POST** endpoint (`/api/products`) to store product data.  
- Implement **request validation** before database storage.  
- Use `express-validator` for additional validation.  

### 3. **Handle Errors & Maintain Data Integrity**  
- Validate incoming requests and return meaningful errors.  
- Ensure only **properly formatted data** is stored.  

---  

### 📝 **Next Steps:**  
- Implement **role-based access control (RBAC)** for product uploads.  
- Expand schema to include **categories, stock status, and user-specific listings**.  

---  

## **Submission Details**  
- Code **pushed to GitHub repository**.  
- Repository is **publicly accessible**.  

## **Milestone 11: Dynamic Home Page with Product Data**  

---  

## 🎯 **Goals**  
- Implement a **dynamic home page** displaying all products from MongoDB.  
- Develop a **backend API endpoint** to fetch product data.  
- Render products **dynamically** on the frontend using a reusable component.  

---  

## **Why Implement a Dynamic Home Page?**  
- **Real-Time Updates**: Ensures users see the latest products.  
- **Reusability**: Uses a common product card component.  
- **Seamless Data Flow**: Fetches and displays data efficiently.  

---  

## **Steps**  

### 1. **Backend API Development**  
- Created an **API endpoint** to retrieve product data from MongoDB.  
- Ensured data is **formatted and sent** as a JSON response.  

### 2. **Frontend Data Fetching & Rendering**  
- Implemented a function to **fetch product data** from the backend.  
- Passed the received data to the **product card component**.  
- Integrated product listing into the **home page**.  

---  

### 📝 **Submission Details:**  
- Code **pushed to GitHub repository**.  
- Repository is **publicly accessible**.  

---  

## **Milestone 12: "My Products" Page Implementation**  

## 🎯 **Goals**  
- Develop a **"My Products" page** for users to view their added products.  
- Create an API endpoint to **fetch user-specific products**.  
- Dynamically render products using a **reusable component**.  

---  

## **Why Implement a "My Products" Page?**  
- **Personalized Experience**: Displays user-specific products.  
- **Improved Accessibility**: Users can manage their product listings easily.  
- **Optimized API Calls**: Fetches only relevant data based on the user's email.  

---  

## **Steps**  

### 1. **Backend API Development**  
- Created an API endpoint to **retrieve products based on the user's email**.  
- Ensured efficient **querying of the products collection**.  

### 2. **Frontend Data Fetching & Display**  
- Implemented a function to **fetch user-specific products** from the backend.  
- Updated state to reflect **retrieved products dynamically**.  
- Used the **existing product card component** for consistent UI.  

---  

### 📝 **Submission Details:**  
- Code **pushed to GitHub repository**.  
- Repository is **publicly accessible**.  

This milestone enhances the application by providing users with a **personalized view** of their added products. 🚀


Here’s your text converted to the same structured style:  

---

## **Milestone 13: Edit Uploaded Products 🌟**  

## 🎯 **Learning Goals**  
By the end of this milestone, you will learn:  
- How to write an **endpoint to update existing data** in MongoDB.  
- How to **auto-fill a form** with previous product data for editing.  

---  

## **Features Added**  
✅ **Edit Button** – Added to each product card, allowing users to modify product details.  
✅ **Auto-fill Form** – Populates with current product data for easy editing.  
✅ **Update Endpoint** – Created a backend route to update product details in MongoDB.  

---  

## **Steps for Implementation 📝**  

### 1️⃣ **Backend: Update Endpoint**  
- Developed an **API endpoint** to receive and process updated product data.  
- Used **Mongoose** to locate and modify the corresponding product in the database.  

### 2️⃣ **Frontend: Edit Form Integration**  
- Added an **edit button** to each product card.  
- Implemented a **pre-filled form** that opens when the edit button is clicked.  
- Integrated a **save button** to submit changes and trigger the update request.  

---  

## **How to Use**  
1️⃣ Navigate to the **product list**.  
2️⃣ Click the **edit button** on the product you wish to update.  
3️⃣ Modify the details in the **auto-filled form**.  
4️⃣ Click **save** to update the product information.  

---  

## **Milestone 14: Delete Functionality Implementation 🗑️**  

## 🎯 **Learning Outcomes**  
- Developed a **DELETE API endpoint** to remove products by ID.  
- Integrated a **delete button** into the frontend for easy removal.  
- Ensured **smooth user feedback** with error handling.  

---  

## **Implementation Details**  

### 1️⃣ **Backend: Delete Endpoint**  
- Created a **DELETE route (`/api/products/:id`)**.  
- Used **Mongoose** to find and delete products by ID.  

### 2️⃣ **Frontend: Delete Button**  
- Added a **delete button** to each product card.  
- Configured it to send a **DELETE request** to the backend.  

### 3️⃣ **Error Handling & UX Improvements**  
- Managed errors for **invalid or non-existent product IDs**.  
- Planned **confirmation dialogs** to prevent accidental deletions.  
- Introduced **role-based access control** for delete permissions.  

---  

### 📝 **Next Steps**  
🚀 **Implement confirmation dialogs** before deletion.  
📢 **Add notifications** to inform users about deletion status.  
🔐 **Enhance role-based access control** for security.  

---  

## **Milestone 15: Navbar Component 🚀**  

### 🎯 **Key Learning Outcomes**  
✅ Created a **reusable Navbar component**.  
✅ Integrated navigation across multiple pages:  
   - 🏠 **Home**  
   - 📦 **My Products**  
   - ➕ **Add Product**  
   - 🛒 **Cart**  
✅ Ensured **responsive design** for all screen sizes.  

This milestone enhances **user experience** by providing seamless navigation. 🎯  

---  

## **Milestone 16: Product Info Page 📄**  

### 🎯 **Learning Goals**  
✅ Developed a **product information page** for detailed product views.  
✅ Implemented a **quantity selector** for user purchases.  
✅ Added an **"Add to Cart" button** to enable shopping.  

This milestone allows users to view product details and add items to their cart seamlessly.  

---  

## **Milestone 17: Add to Cart Functionality 🛒**  

### 🎯 **Key Updates**  
✅ Updated **User Schema** to store cart products.  
✅ Created a **Cart Schema** to manage cart items.  
✅ Developed an **API Endpoint** to receive and store products in the cart.  

This milestone improves **cart functionality** and strengthens **database integration** for e-commerce applications.  

---  

## **Milestone 18: Fetch Cart Items 🛍️**  

### 🎯 **Key Updates**  
✅ Created an **API Endpoint** to handle cart item requests.  
✅ Implemented functionality to **fetch products using the user’s email**.  
✅ Enhanced **cart functionality** by allowing users to **view selected products**.  

With this update, users can now see their **selected products** in their cart, improving the shopping experience. 🚀  

---





