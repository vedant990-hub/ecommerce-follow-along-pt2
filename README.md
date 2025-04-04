# E--commerce-website

****
## Milestone 1: Project Overview-

In this milestone, we demonstrated the working of MERN Stack. And by using the MERN stack we are going to bulid an e-commerce website

Which is,

**M - MongoDB** - Used to handle databases

**E - Express.js** -  Used to easily handle severs

**R - React.js** - Used for frontedend

**N - Node.js** - Used with express.js for server handling

### **Project Features :- **

#### **Pages**
1. **Authentication**
   - Login / Signup functionality.
   - User validation and session management.

2. **Product Page**
   - Displays all available products.
   - Allows users to view product details.

3. **Orders Page**
   - Lists all orders made by the user.
   - Displays order history and details.

4. **Payment Gateway**
   - Integrates a secure payment system.
   - Handles transactions seamlessly.
****



## Milestone 2: Project Overview - 

In this milestone we learned how to setup a development enviroment for a backend project and also started with making Basic UI for Login page.-

Key Learnings - 

- Learned tailwind css for login page UI
- Learned to setup basic tools used in backend like -
  -  express
  -  mongoose
  -  dotenv
  -  nodemon
  -  cookie-parser
  -  nodemailer etc...
- And learned Basic react Routing.

****


## Milestone 3: Project Overview - 

In this milestone we have learned how to setup basic backend configurations - 

Key learnings -

- Learned how to use express js.
- Learned how to use the mongodb database and connect it with our server code.
- Learned to use jsonWebTokens for authentications.
- And finally learned to effectively handle the errors.


## Milestone 4: Project Overview -

In this milestone we learned the following things -

Key learnings - 

- We learned how to use mongoose schema
- We learned how to install and use multer
- We learned password hashing using bcrypt
- And lastly we learned about usage of jsonWebTokens for authentication.

## Milestone 5: Project Overview - 

In this milestone we focused on creating a signup page for new users visiting the website,

Key Learnings - 

- We Learned how to create the UI for the Signup page using React and Tailwind CSS.
- We also learned how to use RegEx (Regular expressions) for the validation of the inputs on the signup page.


## Milestone 6: Project Overview -

Key Learnings -

- We learned how to encrytp the password and store it in the database (Hashing) , Using the Bcrypt package.
- We also learned how to store data of new users inside the database.


## Milestone 7: Project Overview - 

In this milestone we simply implemented the logic for login and signup , that is if the user already exists in the database then only he/she will be able to login.


## Milestone 8: Project Overview - 

In this milestone we simply created the frontend part for the HomePage of our Website , And also learned how to route it.

## Milestone 9: Project Overview - 

In this milestone we simply created the frontend part for the createproductpage of our Website , And also learned how to create products.

In this milestone we simply created the frontend part for the createproductpage of our Website , And also learned how to create products.

## Milestone 10: Product Schema and Endpoint Creation
🎯 Goals
Define a Mongoose schema for storing product data.
Implement API endpoint for adding products to MongoDB.
Ensure data validation and error handling for integrity.
Why Create a Product Schema and API?
Structured Data Storage: Organize product details in MongoDB.
Validation & Security: Prevent invalid data entries.
Scalability: Enable future expansions like categories and stock tracking.
Steps
1. Define Mongoose Schema
Create a schema with necessary fields:
name (String, required)
description (String, optional)
price (Number, required, positive values only)
imageUrl (String, optional, URL format validation)
Use Mongoose models to interact with MongoDB.
2. Build API Endpoint
Create a POST endpoint (/api/products) to store product data.
Implement request validation before database storage.
Use express-validator for additional validation.
3. Handle Errors & Maintain Data Integrity
Validate incoming requests and return meaningful errors.
Ensure only properly formatted data is stored.
📝 Next Steps:
Implement role-based access control (RBAC) for product uploads.
Expand schema to include categories, stock status, and user-specific listings.
Submission Details
Code pushed to GitHub repository.
Repository is publicly accessible.
## Milestone 11: Dynamic Home Page with Product Data
🎯 Goals
Implement a dynamic home page displaying all products from MongoDB.
Develop a backend API endpoint to fetch product data.
Render products dynamically on the frontend using a reusable component.
Why Implement a Dynamic Home Page?
Real-Time Updates: Ensures users see the latest products.
Reusability: Uses a common product card component.
Seamless Data Flow: Fetches and displays data efficiently.
Steps
1. Backend API Development
Created an API endpoint to retrieve product data from MongoDB.
Ensured data is formatted and sent as a JSON response.
2. Frontend Data Fetching & Rendering
Implemented a function to fetch product data from the backend.
Passed the received data to the product card component.
Integrated product listing into the home page.
📝 Submission Details:
Code pushed to GitHub repository.
Repository is publicly accessible.
## Milestone 12: "My Products" Page Implementation
🎯 Goals
Develop a "My Products" page for users to view their added products.
Create an API endpoint to fetch user-specific products.
Dynamically render products using a reusable component.
Why Implement a "My Products" Page?
Personalized Experience: Displays user-specific products.
Improved Accessibility: Users can manage their product listings easily.
Optimized API Calls: Fetches only relevant data based on the user's email.
Steps
1. Backend API Development
Created an API endpoint to retrieve products based on the user's email.
Ensured efficient querying of the products collection.
2. Frontend Data Fetching & Display
Implemented a function to fetch user-specific products from the backend.
Updated state to reflect retrieved products dynamically.
Used the existing product card component for consistent UI.
📝 Submission Details:
Code pushed to GitHub repository.
Repository is publicly accessible.
This milestone enhances the application by providing users with a personalized view of their added products. 🚀

Here’s your text converted to the same structured style:

## Milestone 13: Edit Uploaded Products 🌟
🎯 Learning Goals
By the end of this milestone, you will learn:

How to write an endpoint to update existing data in MongoDB.
How to auto-fill a form with previous product data for editing.
Features Added
✅ Edit Button – Added to each product card, allowing users to modify product details.
✅ Auto-fill Form – Populates with current product data for easy editing.
✅ Update Endpoint – Created a backend route to update product details in MongoDB.

Steps for Implementation 📝
1️⃣ Backend: Update Endpoint
Developed an API endpoint to receive and process updated product data.
Used Mongoose to locate and modify the corresponding product in the database.
2️⃣ Frontend: Edit Form Integration
Added an edit button to each product card.
Implemented a pre-filled form that opens when the edit button is clicked.
Integrated a save button to submit changes and trigger the update request.
How to Use
1️⃣ Navigate to the product list.
2️⃣ Click the edit button on the product you wish to update.
3️⃣ Modify the details in the auto-filled form.
4️⃣ Click save to update the product information.

## Milestone 14: Delete Functionality Implementation 🗑️
🎯 Learning Outcomes
Developed a DELETE API endpoint to remove products by ID.
Integrated a delete button into the frontend for easy removal.
Ensured smooth user feedback with error handling.
Implementation Details
1️⃣ Backend: Delete Endpoint
Created a DELETE route (/api/products/:id).
Used Mongoose to find and delete products by ID.
2️⃣ Frontend: Delete Button
Added a delete button to each product card.
Configured it to send a DELETE request to the backend.
3️⃣ Error Handling & UX Improvements
Managed errors for invalid or non-existent product IDs.
Planned confirmation dialogs to prevent accidental deletions.
Introduced role-based access control for delete permissions.
📝 Next Steps
🚀 Implement confirmation dialogs before deletion.
📢 Add notifications to inform users about deletion status.
🔐 Enhance role-based access control for security.

Milestone 15: Navbar Component 🚀
🎯 Key Learning Outcomes
✅ Created a reusable Navbar component.
✅ Integrated navigation across multiple pages:

🏠 Home
📦 My Products
➕ Add Product
🛒 Cart
✅ Ensured responsive design for all screen sizes.
This milestone enhances user experience by providing seamless navigation. 🎯

## Milestone 16: Product Info Page 📄
🎯 Learning Goals
✅ Developed a product information page for detailed product views.
✅ Implemented a quantity selector for user purchases.
✅ Added an "Add to Cart" button to enable shopping.

This milestone allows users to view product details and add items to their cart seamlessly.

## Milestone 17: Add to Cart Functionality 🛒
🎯 Key Updates
✅ Updated User Schema to store cart products.
✅ Created a Cart Schema to manage cart items.
✅ Developed an API Endpoint to receive and store products in the cart.

This milestone improves cart functionality and strengthens database integration for e-commerce applications.

## **Milestone 18: Fetch Cart Items 🛍️**  

### 🎯 **Key Updates**  
✅ Created an **API Endpoint** to handle cart item requests.  
✅ Implemented functionality to **fetch products using the user’s email**.  
✅ Enhanced **cart functionality** by allowing users to **view selected products**.  

With this update, users can now see their **selected products** in their cart, improving the shopping experience. 🚀  

---



## Milestone 19: Cart Functionality
Overview
In this milestone, we implemented the cart functionality by creating a frontend UI for the cart page and developing backend endpoints to manage product quantities within the cart.

Learning Goals 🎯
By completing this milestone, we:

Created a cart page to display products inside the cart using the endpoint built in Milestone 18.
Implemented an option to increase and decrease the quantity of each product using + and - buttons.
Developed backend endpoints to handle quantity adjustments for products in the cart.
Implementation Details
Frontend:
Created a dedicated Cart Page to display all products added to the cart.
Implemented dynamic UI components to show product details, prices, and quantity controls.
Added + and - buttons to allow users to adjust the quantity of each product.
Integrated API calls to fetch and update cart data dynamically.
Backend:
Created API endpoints to increase and decrease the quantity of a product in the cart.
Updated the database to reflect changes in product quantities.
Implemented validation checks to prevent negative quantities.
How to Test
Navigate to the cart page and verify that products appear correctly.
Use the + and - buttons to adjust the quantity and observe real-time updates.
Check the API responses to ensure correct updates to the database.
Ensure the UI reflects changes made to the cart without requiring a page refresh.
Conclusion
With this milestone, we have successfully implemented a dynamic shopping cart system that allows users to manage product quantities seamlessly. This enhances user experience and lays the foundation for further enhancements like checkout functionality.

## 🎉 Milestone 19 Completed! 🚀

 ## Milestone 20: Profile Page & User Data Endpoint
Overview
In this milestone, we implemented a profile page frontend and created a backend endpoint to retrieve user data.

Key Features
Backend Endpoint: Sends user data via email.
Profile Page Frontend: Displays user details including profile photo, name, and email.
Address Section:
Shows user addresses.
Displays "No address found" if no addresses exist.
Includes an "Add Address" button for adding new addresses.
This milestone enhances user profile management by integrating backend data retrieval and frontend rendering. 🚀

## Milestone 21: Address Input Form
Overview
In this milestone, we created a frontend page for address input that allows users to enter and store their address details. The form includes fields for country, city, address lines, zip code, and address type.

Learning Goals 🎯
By completing this milestone, you have:

Created a frontend form to collect address details.
Implemented state management to store the input address.
Set up navigation from the profile page to the address form page.
Gained a deeper understanding of handling user inputs in forms.
Features
User Input Fields:
Country
City
Address Line 1
Address Line 2
Zip Code
Address Type (Home/Work/Other)
State Management:
The form data is stored in a state to handle user input dynamically.
Navigation:
Clicking "Add Address" on the profile page navigates to the address form page.
Validation:
Ensures required fields are filled before submission.
Conclusion
This milestone helped in understanding how to create a structured address input form, manage state effectively, and enable seamless navigation within a React application.

## Milestone 22: Address Storage Endpoint
Overview
In this milestone, we created a backend endpoint that receives the address details from the frontend and stores them inside the user's profile in the database.

Learning Goals 🎯
By completing this milestone, you have:

Created a backend endpoint to handle address data.
Implemented logic to add the address to the address array inside the user collection.
Understood how to handle API requests and database updates.
Features
Endpoint Creation:
Receives address data from the frontend form.
Validates the address input before storing it.
Database Integration:
Adds the address to the address array in the user collection.
Ensures the user profile is updated correctly.
Error Handling:
Returns appropriate responses for success or failure cases.
Conclusion
This milestone helped in understanding how to create and integrate a backend API that stores user addresses in the database. The knowledge gained will be useful for handling user profiles dynamically in future projects.

# Milestone 23: Place Order & Select Address
Learning Goals 🎯
By the end of this milestone, you will:

Add a "Place Order" button inside the cart.
Create a "Select Address" page displaying all available addresses for selection.
Implement a Mongoose schema for storing order details.
Develop a backend endpoint to fetch all user addresses.
Implementation Steps 📝
Frontend:
Add "Place Order" Button:

Implement a button inside the cart page that redirects users to the "Select Address" page.
Create "Select Address" Page:

Display all saved addresses of the user.
Provide an option to select one address for delivery.
Backend:
Create an Endpoint to Fetch User Addresses:

Implement a route that retrieves all stored addresses for a user.
Write Mongoose Order Schema:

Store essential order details, including selected address, products, total price, and user ID.
Expected Outcome 📌
Users can navigate from the cart to the "Select Address" page.
Users can choose an address before placing an order.
The backend successfully retrieves stored addresses and saves order details.
This milestone enhances the e-commerce experience by allowing users to finalize their delivery details efficiently.

## Milestone 24: Order Confirmation Page
Welcome to Milestone 24! 🌟
In this milestone, we created an order confirmation page in the frontend where we display the ordered products, selected address, and total price details.

Learning Goals 🎯
By the end of this milestone, we have:

Created an order confirmation page.
Displayed ordered products dynamically.
Implemented address selection and display.
Calculated and showed the total cart value.
Implemented a "Place Order" button to complete the order process.
Steps for Milestone 24 📝
Displayed all the products the user is ordering.
Showed the selected delivery address.
Displayed the total value of the cart.
Added a "Place Order" button at the bottom to confirm the order.
Completion Note:
The order confirmation page has been successfully implemented, providing users with a clear overview of their order details before placing it.

## Milestone 25: Place Order Endpoint
🚀 Introduction
Welcome to Milestone 25! In this milestone, we have implemented a backend endpoint that allows users to place orders. This functionality ensures that each product in the order is processed separately while sharing the same address details.

🎯 Learning Goals
By completing this milestone, you will:

Develop a backend endpoint for placing an order.
Retrieve user details using their email.
Store order details in the MongoDB orders collection using the predefined schema.
📝 Implementation Steps
Create the Order Endpoint: Develop an API endpoint that accepts user details, address, and product information.
Retrieve User ID: Extract the user's email from the request and use it to find the corresponding _id from the users collection.
Process Each Product Separately: For every product in the request, create a separate order while maintaining the same address.
Store Orders in MongoDB: Use the existing Order schema to save order details in the orders collection.
Here’s an improved version of your README update with better clarity and grammar:

🏆 Milestone 26: Create Backend Endpoint for Placing Orders
Hey Kalvians! 👋

## Welcome to Milestone 26! 🌟

🎯 Learning Goals
By the end of this milestone, you will:

✅ Create a backend endpoint to retrieve all orders of a user.

📝 Steps for Milestone 26
Create an endpoint that receives the user's email.
Use the email to retrieve the _id of the user from the database.
Fetch all orders associated with that _id.
Send the retrieved orders as a response.
This lesson will help you understand how to fetch all orders for a specific user in your backend.

## Milestone 27: Implementing the My Orders Page for Seamless Order Tracking
📦 My Orders Page

🌟 Overview

The My Orders page allows users to view all their past and ongoing orders in one place. This page fetches order details from the backend and displays them in an organized manner.

✨ Features

🔄 Fetch and display all user orders by making a GET request to the /my-orders endpoint.

📧 Orders are retrieved based on the user's email.

📋 Orders are presented in a user-friendly format.

🏠 Integrated into the navigation bar for easy access.

📝 Implementation Steps

🖥 Create the My Orders Page

Develop a React component to display user orders.

📡 Fetch User Orders

Send a GET request to the /my-orders endpoint.

Pass the user’s email to retrieve their orders.

📑 Display Orders

Format and show the fetched data in a structured layout.

🔗 Add Page to Navbar

Ensure smooth navigation by linking the My Orders page in the navbar.

## Milestone 28: ❌ Cancel Order Feature
🌟 Overview
The Cancel Order feature allows users to cancel their placed orders. This involves updating both the frontend and backend to support order cancellation.

✨ Features
🛑 Add a Cancel Order button next to each active order on the My Orders page.
🚫 The cancel button will be hidden for orders that are already canceled.
🔄 Create a backend endpoint to handle order cancellation.
✅ Update the order status to "Canceled" in the database.
📝 Implementation Steps
🖥 Update My Orders Page
Add a Cancel Order button next to each order.
Hide the button for orders that are already canceled.
🔧 Create Cancel Order Endpoint
Develop a new POST endpoint: /cancel-order.
Receive orderId in the request payload.
Fetch the order using this ID, update its status to "Canceled," and save it.
🔄 Integrate API with Frontend
On clicking the Cancel Order button, send a request to the backend.
Update the UI to reflect the canceled order status.
🎯 Conclusion
This milestone enhances the My Orders page by allowing users to cancel their orders when needed. It helps in understanding how to modify order statuses and manage data updates dynamically.

### **Milestone 29: 💰 PayPal Integration for Online Payments**  

#### **🌟 Overview**  
The PayPal integration allows users to make online payments securely. This milestone involves setting up PayPal for test transactions and integrating it into the order confirmation page.  

#### **✨ Features**  
💳 Add PayPal as a payment option on the Order Confirmation page.  
💵 Provide users with two payment methods:  
   - **Cash on Delivery (COD)**  
   - **Online Payment using PayPal**  
🛠️ Dynamically display PayPal payment buttons when Online Payment is selected.  

#### **📝 Implementation Steps**  

### **🔧 Set Up PayPal Developer Account**  
1️⃣ **Create a PayPal Developer Account**  
   - Go to the [PayPal Developer Dashboard](https://developer.paypal.com/).  
   - Sign up or log in to access developer tools.  

2️⃣ **Set Up a Sandbox Account**  
   - Navigate to the **Sandbox Accounts** section.  
   - Use the provided test account for development purposes.  
   - Copy the **User ID** of the sandbox account for later use.  
   - Locate and copy the **Client ID** from the sandbox account details.  

### **🖥️ Update Order Confirmation Page**  
📌 **Add Payment Options**  
   - Add **radio buttons** to let users choose between **COD** and **PayPal Payment**.  
   - If **Online Payment** is selected, dynamically show the **PayPal buttons**.  

### **🔄 Integrate PayPal with Backend**  
🛠 **Create Payment Endpoint**  
   - Develop a new **POST** endpoint: `/process-payment`.  
   - Receive transaction details and verify payment with PayPal API.  
   - Update the order status to **"Paid"** upon successful payment.  

### **✅ Handle Payment Response**  
🔗 **Integrate PayPal SDK**  
   - Use the PayPal SDK to handle transactions securely.  
   - Display payment confirmation on successful transactions.  

### **🎯 Conclusion**  
This milestone enhances the order process by enabling **secure online payments** via PayPal. It also provides flexibility by offering both **COD** and **online payment options**, improving user experience. 🚀