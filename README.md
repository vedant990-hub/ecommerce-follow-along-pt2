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





