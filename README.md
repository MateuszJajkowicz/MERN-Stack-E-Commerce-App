# MERN-Stack-E-Commerce-App

<h3>You can check it online at https://mj-e-commerce.onrender.com </br>
You can login as:
  <ul>
     <li>
        admin@example.com (Admin) </br>
        123456
     </li>
     <li>
        john@example.com (Customer) </br>
        123456
     </li>
     <li>
        Or just use your google account
     </li>
  </ul>

There is a long first startup, because I use free services, which "goes to sleep" after 15 minutes of inactivity.</h3>

> eCommerce platform built with the MERN Stack & Redux.

![screenshot](https://github.com/MateuszJajkowicz/MERN-Stack-E-Commerce-App/blob/master/screenshots/screenshot_1.png)
![screenshot](https://github.com/MateuszJajkowicz/MERN-Stack-E-Commerce-App/blob/master/screenshots/screenshot_2.png)

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)
- Items per page dropdown
- Cart dropdown if any items in cart
- Google OAuth2 using the new Google Identity Services SDK for React @react-oauth/google

## Usage

### ES Modules in Node

I use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

Create a .env file in root folder and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = your jwt secret
PAYPAL_CLIENT_ID = your paypal client id
```

Create a .env file in frontend folder and add the following

```
REACT_APP_ENV = development
REACT_APP_IP = http://localhost:5000
REACT_APP_PAYPAL_CLIENT_ID = your paypal client id
REACT_APP_GOOGLE_OAUTH_CLIENT_ID= your google oauth client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
123456

john@example.com (Customer)
123456

jane@example.com (Customer)
123456
```
