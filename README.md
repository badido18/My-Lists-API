# My Lists API

a RESTfull API of Todo lists made with Express and MangoDB

**Packages** used in this repository : *@hapi/joi* and *@jsonwebtoken* and *@bcrypt*.
> build for To do list applications (Mobile Web or Destkop)

# Introduction

This API provides :

* **User authentification** and **registration** with hached **passswords**

* **Multilist** creation for each user

* **items** with custom patterns

* **Secure Requests** with token verification

# Getting started

Here you will find how to **Configure**,**Use** and **Customize** it before start using it:

### Configuration 

Start by configuring this !

#### Environment variables

* Create **.env** file on the **server.js** path and add this variable on it

```json
DB_CONNECT = "Here" // Here put your Mongo DB connection URL
PAYLOAD = "Here" // here put the payload your may use for encrypting your users password
```  

#### Repository init

* tape on terminal this **bellow** to install all the required packages in **package.json**

```Terminal
npm init
```

### Usage

#### Start using the API

**Change directory** to the API files *path* Tape in the terminal  

```Terminal
npm start
```

> **important** this server Runs on **localHost:3000**

##### Important Note

* Deletion is **logical** and keeps backup

* All the requested are **Tested** and we provide a **Postman pkg** containing a requests' sample

#### Usage purpuses

This API is for ToDo lists applications you can use it for :

* Learning how to use Api in your application

* Built back-end for front-end developpment  

* Guide for new Api programmers

* and more stuff for the community

### Customization

This repository is Classified as a **Github Template**
In the code you can find some guiding **comments** for eventual request modifications

#### Repository structure

* Main file *server.js*

* Mango **schema** models in *models/* directory

* Routes are in the *routes/* directory

# Documentation

Comming soon !

# License

**MIT Licence** (Full OpenSource)

# Author

*Mohamed Abdelmadjid Boudis* **@badido18**
