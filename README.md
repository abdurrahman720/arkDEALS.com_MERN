# arkDEALS.com
****Explore and share thousands of delicious recipes with our foodie community! Discover and review the best dishes from around the globe!****
Visit Now: [arkDEALS.com](https://ark-foodies.web.app/).

## App Features and Functionality

This is one of my Full Stack Web Application , build using MERN STACK Technology.

 ****MERN STACK Technology for Fronted and Backend Development****
1. Used ReactJs for Fronted Development
2. User Authentication with FireBase and **Authorisation with JWT Token**
3. Database Management with MongoDB CRUD operations 
4. Backend Server Management with NodeJs with ExpressJS framework
5. Used React-Router for Single Page Application
6. Buyer, Seller and Admin Role
7. A FullStack working website for Laptop Resale Company 
8. Minimalistic Responsive Design with Tailwind CSS 

### `General Features`
1. Seperate Login and Registration page for Seller account.
2. Seller and Admin can not buy products.
3. **Product is not removed from database** even after it is sold untill the seller removes it from his product dashboard
4. Only **UnSold** products are shown in the browse page. 
5. The Advertisement section is invisible on the homepage when there is no product on Advertisement. 
6. After a product is sold, it is removed from the Advertisement section.
7. A verified badge is shown with the verified seller name.
8. **Dashboard: Profile Overview** : The name, email and role of the user and verification status of seller are shown here. 

## `Buyer Role -Features`
1. Buyer can book order by providing phone number and location with a confirmation modal
2. After a meeting with seller, buyer can able to pay for the order.
3. Buyer can report products with a message to admin.

### `Dashboard: My Orders`
1. All the booking orders of the buyer is placed here and there will be a **meeting pending** badge untill seller approves to pay after meeting with buyer
2. After getting approval from seller, buyer can pay for the order.
3. Buyer will have the order saved with a status of **paid**
4. If other buyer pays before, the order will be deleted from the list **since it is a reselling website, product is available only for one quantity.

### `Dashboard: My Reported Items`
1. All the items reported by the buyer is shown here.
2. Buyers can remove the item if they think it was a mistake


## `Seller Role -Features`
1. Seller can add and delete own products.
2. Seller can approve buyers for payment after a meeting 
3. Seller can advertise own products
4. Sellers can keep track of all of thier products even it is sold. 
5. Seller can be verified by Admin and a verified badge will be shown after seller name everywhere.

### `Dashboard: My Buyers`
1. All the orders of the seller are shown here with buyer details and his location.
2. After meeting with the buyer, seller can approve the buyer for payment by clicking **meet** button. The Status then will change into **pending payment** . Another button will be visible **cancel meeting**
3. After buyer succesful payment, The order status will be changed into sold. 
4. Rest of the orders with same product will be removed from the list.

### `Dashboard: My Products`
1. All the products posted by the seller are shown here with **sold** or **unsold** status
2. Seller can advertise any product from this list. 
3. Seller can view details with **view details** button 
4. Sellers can delete any of thier products with **delete** button

### `Dashboard: Add Products`
1. Seller can post new product for sale from here with image uploading

## `Admin Role -Features`
1. Admin can delete users (seller, buyer) and verify seller 
2. Admin can review reported products from buyer.

### `Dashboard: All Sellers`
1. All the Sellers are listed here with their details
2. Admin can verify the seller with **verify** button and also can remove verified satatus if needed.
3. Admin can delete any seller and all the products,orders, advertisements associated with the seller will be deleted as well.

### `Dashboard: All Buyers`
1. All the Buyers are listed here with their details
2. Admin can **delete** any buyer and all the orders associated with the buyer will be deleted as well.

### `Dashboard: Reported Products`
1. All the reported items will be listed here with a **message** from the buyer
2. Reporter(buyer) Details and Seller details of the product will be shown here.
3. With **View Item* button, Admin can view the item 
4. Admin can mark the item as safe with **Mark as safe** button 
5. If Admin can Delete the product with **Delete** button




**The project is at very intial level. Several Bugs maybe found**


### `Upcoming Feature`

1. Seller will able to edit their product details
2. Admin will able to delete any product, whenever it is needed.
3. Both Buyer and Seller will be able to delete their orders after those are fullfilled.
4. Profile Overview Page where users can update their name and photo
5. UI Design and Animations...