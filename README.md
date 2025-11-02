# Term assignment: Product management front-end web application for the Bluevelvet Music Store
A product management front-end web application made using Vanilla HTML, CSS, and JavaScript.   

This application must be developed as term assignment for the first part (frontend development) of Web Programming course, taught by Rodrigo Martins Pagliares and Fellipe Guilherme Rey de Souza at the undergraduate Computer Science course at UNIFAL-MG - Brazil.

You can try the the web application without a backend application and a database server. The frontend in this term assignment is self-contained and can be used to perform simple CRUD operations on products table upon logging in. The data is stored and retrieved from LocalStorage. New users can register themselves.

## What the students neeed to do and solution to this assignment

- Use vanilla CSS (no library of framework allowed) to style all the HTML pages created for the user stories described in the sequence of this README file.
- Use the JavaScript LocalStorage API to simulate back-end persistence in the frontend.
- In addition to the details provided in this README.md file, the student must take a look at all the files located in the frontend/begin directory of this repository looking for comments with addiional tips and instructions for this assignment.
- The frontend/end folder contains my solution. Only check it after you've tried implementing your own solution. 🚫 No cheating!

## Technologies Used (frontend)

- HTML
- Vanilla CSS (without CSS libraries such as BootStrap pr TailWind)
- JavaScript (without libraries\frameworks such as vue or React)
  
## User stories to be implemented in this assignment

| # | ID | DESCRIPTION |
|----------|----------|----------|
| 01    | US-1232   | Login      |
| 02    | US-1603   | Register new users     |
| 03    | US-2032   | Access the Product Management Dashboard     |
| 04    | US-105    | Create product     |
| 05    | US-1452   | Edit product information     |
| 06    | US-1045   | View product details for administrators     |
| 07    | US-1627   | Delete product    |

## Definition of DONE (Scrum)

For the sake of this assignment, only the views (Web User Interfaces) for the user stories the user stories must be implemented. Backend persistence must be simulated with JavaScript LocalStorage API). 

The user stories are considered completed if:
- They meet the acceptance criteria;
- They are decoupled from backend 
- The view layer must fully responsive (responsive layout).
- It must be possible to navigate throughout the views.

## Requirements (Written as user stories)

 ### US-1232: Login

"As an Administrator I want to login in the BlueVelvet Music Store application with my registered account in order to manage all products sold by the company."

Acceptance criteria:

- A login has an e-mail address and a password.
- there must be an explicit option tor remember the administrator credentials
- An incorrect login message must be shown for incorrect email and/or password. Suggestion: "Incorrect email or password. Please try again"
- The password must be at least 8 characters long
- There must be an option allowing new administrators to create an account. Suggestion: "Don't have an account? Register"

![US-1232: Login](frontend/images/user_stories/us-1232/begin/us-1232-begin.png)
**Figure 1:** US-1232 - Login Screen (provided as starting point for the assignment)

![US-1232: Login](frontend/images/user_stories/us-1232/end/us-1232-end.png)
**Figure 2:** US-1232 - Login Screen (possible solution for the assignment after improving the CSS style)

 ### US-1603: Register new users

"As an administrator I want to register new users in BlueVelvet Music Store application to allow multiple people to work collaboratively and perform their responsibilities in the company"

Acceptance criteria:

- Only administrators can register new users.
- A user must have a role.
- 5 User (admin) roles: Administrator, Sales Manager, Editor,, Assistant, Shipping Manager
- A user has an e-mail address and a password.
- A message "Already have an account? Login" must be presented to allow returnin to the login page.

![US-1232: Register](frontend/images/user_stories/us-1603/begin/us-1603-begin.png)
**Figure 3:** US-1603 - Register new users (provided as starting point for the assignment)

![US-1232: Register](frontend/images/user_stories/us-1603/end/us-1603-end.png)
**Figure 4:** US-1603 - Register new users (possible solution for the assignment after improving the CSS style)

### US-2032: Access the Product Management Dashboard 

"As an Administrator I want to access the Product Management Dashboard to manage all products, including listing all of products in order to have a global view of all products sold on Blue Velvet Music store."

Acceptance criteria:

- Only authenticated users in the role orf admin, salesperson or shipper can access the dashboard.
- The dashboard, among other things, contains  a  list products.
- A message showing the logged-in user should be presented: "Welcome,{username} (role)
- if a user tries to access the dashboard page without logging in then an error page is displayed.
- An option to logout of this page must be presented for security reasons. After clicking logout, the login form must be presented (See US 1351 and 1358)
- The list of products may be too long. Provide a way for navigation (e.g. pagination for the products list)
- By default, it must be possible to see 10 products per page (pagination)
- Pagination is based on product names 
- Pagination should work well with sorting 
- Sort by product name, ID, brand, and category
- Default sorting by name, ascending order
- Filter: search by product name, short description, full description, brand name, and category name
- The fields main image, product name, brand, and category must be shown
- To see product details, see US-1045
- From the dashboard it must be possible to add, view deails, delete, and edit product information.
- There must be an option to reset the product list to it's initial state (to facilitate testing, there will be 10 products initially created when first running the application of after selecting the option reset the product list.

![US-1232: Register](frontend/images/user_stories/us-2032/begin/us-2032-begin.png)
**Figure 5:** US-2032 - Access the Product Management Dashboard (provided as starting point for the assignment)

![US-1232: Register](frontend/images/user_stories/us-2032/end/us-2032-end.png)
**Figure 6:** US-2032 - Access the Product Management Dashboard (possible solution for the assignment after improving the CSS style)

### US-1050: Create product

"As an Administrator I want to create a product to increase the the variaty of music products sold by BlueVelvet Music Store"

Acceptance criteria:

- Only authenticated users in the role of admin or editor can manage products.
- A product has a name, short description, full description, brand, category, main image, featured images, list price, discount percent, enabled, in stock, creation time and update time, length, witdh, height, weight, cost, product details
- Name: Name of the product (must be unique)
- Short description: Short description
- Full description: Detailed description
- Brand: Brand of the product
- Category: Category to which the product belongs
- Main image: Primary product image - used in listing pages
- Featured images: Other images describing the product
- List price: Sell price
- Discount: Discount applied to the Sell price
- Enabled: Whether the product is displayed or not for shopping
- In Stock: Whether the product is available or not in stock
- Creation time: Time the product was first created
- Update time: Time the product was last updated
- Length, witdh, height, weight: Dimensions (used for shipping cost calculation). Units used: inch and pound. The dimensions is for the box that is used to package the product - not the product's dimension.
- Cost: Used for revenue report
- Produt details: Name/value pairs with details for the product. 
      - e.g Track 1 - Karma Police
            Track2 - Airbag
- Note: Reuse a rich text editor component to ease including the short and full descriptions or use a simple textarea components?
https://www.jqueryscript.net/text/Rich-Text-Editor-jQuery-RichText.html
- Automate the creation of some sample products to ease testing (SQL script, programmatically?), including some sample product images
- Test: Create 3 products
- TODO: Implement I18N? Use cm, m, g, and kg?
- It must be implemented a mechanism to upload the main and featured images. It must be accepted png images.
- Possible directory structure for product images (possible backend solution):
    product-images/
          ----- 1/
                                        ........... main-image.png
           ----- extra-images/
                                      ........ extra-image-1.png
                                      ......... extra-image-2.png 
           ----- 2/
                                        ........... main-image.png
           ----- extra-images/
                                      ........ extra-image-1.png

![US-1050: Create product](frontend/images/user_stories/us-1050/begin/us-1050-begin.png)
**Figure 7:** US-1050 - Create product (provided as starting point for the assignment)

![US-1050: Create product](frontend/images/user_stories/us-1050/end/us-1050-end.png)
**Figure 8:** US-1050 - Create product (possible solution for the assignment after improving the CSS style)

### US-1452: Edit product information

"As an Administrator I want to edit the data of an exiting product to improve/fix the information of the products sold by Blue Velvet Music Store."

Acceptance criteria:

- Only authenticated users in the role of admin or editor can edit the data of products. A user playing the role of salesperson can update the price of a procuct, but not other product details.
- All fields of a product may be updated.  
- See US-1050 for the product fields.
- Test Get a product
- Test Updating Extra Images:
   - Change an existing extra image
   - Remove an existing one
   - Add a new product detail
- Test Updating Details:
- Change an existing product detail 
- Remove an existing product detail
- Test Updating Price -  Remaining information should remain unchanged.
- Test Updating Overview, Main image, Description & Shipping
- A form is displayed with the products data already filled in.

![US-1452: Edit product information](frontend/images/user_stories/us-1452/begin/us-1452-begin-part1.png)
**Figure 9:** US-1452 - Edit product information (provided as starting point for the assignment)

![US-1452: Edit product information](frontend/images/user_stories/us-1452/begin/us-1452-begin-part2.png)
**Figure 10:** US-1452 - Edit product information (provided as starting point for the assignment)

![US-1452: Edit product information](frontend/images/user_stories/us-1452/end/us-1452-end-part1.png)
**Figure 11:** US-1452 - Edit product information (possible solution for the assignment after improving the CSS style - part 1/2)

![US-1452: Edit product information](frontend/images/user_stories/us-1452/end/us-1452-end-part2.png)
**Figure 12:** US-1452 - Edit product information (possible solution for the assignment after improving the CSS style - part 2/2)

### US-1045: View product details

"As an Administrator I want to view product details in order verify if all relevant product information is available."

Acceptance criteria:

- Different of US-2032 where it is possible to see some product fields, this US allows the Administrator to visualize all product details (fields) for a specific product.
- The product details must be shown in the same screens created in the US-1050 - Create Product
 
![US-1045: Create product](frontend/images/user_stories/us-1045/begin/us-1045-begin.png)
**Figure 13:** US-1045 - View product details (provided as starting point for the assignment)

![US-1050: Create product](frontend/images/user_stories/us-1045/end/us-1045-end.png)
**Figure 14:** US-1045 - View product details (possible solution for the assignment after improving the CSS style)

 ### US-1627: Delete product

 "As an Administrator I want to delete a product in order to have only products that are sold by Blue Velvet Music Store."

Acceptance criteria:

- Only authenticated users in the role orf admin or editor can delete products.
- Also delete the product images in procucts-image directory
- Test Delete a product
- A message must be displayed asking you whether you want to delete this product or not.

![US-1045: Create product](frontend/images/user_stories/us-1627/begin/us-1627-begin.png)
**Figure 15:** US-1627: Delete product (provided as starting point for the assignment)

![US-1050: Create product](frontend/images/user_stories/us-1627/end/us-1627-end.png)
**Figure 16:** US-1627: Delete product (possible solution for the assignment after improving the CSS style)


# Tips

This assignment complements the one used in the Web Programming course. Check its <a href="https://github.com/pagliares/product-management-bluevelvet-music-store" target="_blank"> repository</a> to get some ideas for this assignment. Note that the Web Programming repository includes a frontend example that simulates CRUD operations on products of the BlueVelvet Music Store without a backend implementation, using the JavaScript LocalStorage API to simulate persistence.
