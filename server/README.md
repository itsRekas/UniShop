<!-- The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines. -->


# UniShop

## Overview

 So, as an international student, you know the stress and sadness that comes with having to dispose of items when moving from country to country. That’s why I present to you UniShop. It’s an e-commerce app designed to solve this problem for you. You can browse items available in the market and buy or sell them. The vision is to reach a point where it effectively replaces Facebook Marketplace. If you want to sell, simply create an account, add your items, and hopefully, someone will be interested in buying them. If this reaches a business stage, we would arrange for people to pick up your items, and when a buyer is found, you would receive a cut of the sale.


## Data Model

The application will store Users, Items, Shopping bag, Selling bag, Store

* Users will have a Selling bag and Selling bag (by embedding)
* Shopping bag can have multiple Items (via references)
* Selling bag can have multiple Items (via references)
* Store will have all Items (embedded)


An Example User:

```javascript
{
  username: "Reginald",
  password: "*******",//hashed password
  email: "example@nyu.edu",
  location: "New York",
  school:"NYU",
  bags:[
    {shopping bag: ["referenced items"]},
    {selling  bag: ["referenced items"]},
  ],
}
```

An Example Item:

```javascript
{
  name: "Rice Cooker",
  price : 30.00, 
  imgs:["https://img1","https://img2"],
  description: "Perfect as New" 
  owner:"reference to user ID",
}
``` 


## [Link to Commented First Draft Schema](db.mjs) 


## Wireframes

/register - Join as a new user

![register](documentation/wireframe1.jpg)

/Shop - page for showing all Items

![Shop](documentation/wireframe2.jpg)

/Profile

![Profile](documentation/wireframe3.jpg)

## Site map

Here's an [initial workflow](documentation/sitemap.jpg), but I will update it with time.

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can add items to my selling bag
4. as a user, I can view all items in store
5. as a user, I can add items to my shopping bag

## Research Topics

* (5 points) Integrate user authentication
    * I'm going to be using student email for user authentication to make sure that students are the ones in this store to build a trusted community
* (5 points) React
    * I am going to use React as the frontend framework; It is challenging but the component based structure will help me so I will have to learn ahead
  (5 points) Img Cloud saving
    * I am going to look into how to save my images on cloud without spening too much money

10 points total out of 8 required points


## [Link to Initial Main Project File](app.mjs) 


## Annotations / References Used


1. [School Authentication](https://support.librarypass.com/portal/en/kb/articles/school-authentication-options)
2. [React](https://react.dev/) 

