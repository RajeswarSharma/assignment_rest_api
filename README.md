# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 14.17.6


# Getting started
- Install dependencies
```
cd <project_name>
npm install
```
- Build and run the project
```
npm start
```
***
<b>
Note: Database credentials are temporary, I will revoke the access once assigenment evaluation is completed
</b>


#### Tasks:
1. Create a login api with auth. 

2. Create a registration api (first name, last name, email, password, mobile no, address) 

    (Please use hash and salt for password)  

 3. List api for all users with token and pagination  

 4. Update user details api with token  

 5. Search api on (first name, last name, email, mobile no) single key with token and pagination

## -APIs
***
### Public
***
#### 1. User registration
#### Endpoint: http://localhost:3000/api/signup
#### Method: POST
#### Request Body(sample):
```json
{
    "firstname":"Rajeswar",
    "lastname":"Sharma",
    "email":"rajeswar.sh47@gmail.com",
    "phone":"7002709179",
    "password1":"123",
    "password2":"123",
    "addressline1":"Delhi",
    "addressline2":"Delhi",
    "state":"Delhi",
    "postal_code":"110001"
}
```
#### *Required Fields:
```
firstname, lastname, email, phone, password1, password2, addressline1, state, postal_code
```
***
#### 2. User login
#### Endpoint: http://localhost:3000/api/login
#### Method: POST
#### Request Body(sample):
```json
{
    "email":"rohit@gmail.com",
    "password":"123"
}
```
*Required fields: All

<b>*Note: On successful login this API returns a jwt token, which is required in the header inorder access the athenticated routes and APIs. </b>

***
### Authenticated 
#### (Make sure to provide the auth token into headers under the key "token")
***
#### 1. Get all users
#### Endpoint: http://localhost:3000/api/get-all-users/:page
#### Method: GET
#### Description: Returns the list of all registered users, 
#### Required: Authentication token in header
***

#### 2. Update user details
#### Endpoint: http://localhost:3000/api/update-details
#### Method: PUT
#### Request Body(sample):
```json
{
    "email":"mohit12@gmail.com",
    "phone":"6111111112",
    "firstname":"Vishal",
    "lastname":"Kumar",
    "addressline1":"address",
    "addressline2":"Noida",
    "state":"UP",
    "postal_code":"123456"
}
```
#### Required: Authentication token in header
*Note: This API updates the user details according to the authentication token

***
#### 3. Search via [firstname, lastname, email, mobile]
#### Endpoint: http://localhost:3000/api/search?
#### Query params: 
    1. key: email / firstname / lastname / phone
    2. page: An integer value to navigate through pages

#### Sample query:  http://localhost:3000/api/search?page=0&key=rjqwer47@gmail.com
#### Sample response:
```json 
{
    "status": true,
    "requested_page": "1 / 1",
    "max_pages": 1,
    "payload": [
        {
            "_id": "6266de2f0b6f0ba496868e0d",
            "firstname": "Rajeswar",
            "lastname": "Sharma",
            "email": "rjqwer47@gmail.com",
            "phone": "1234567890"
        }
    ]
}
```
***
##### Developed by: Rajeswar Sharma