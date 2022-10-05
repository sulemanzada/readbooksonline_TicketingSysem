# Before starting

You would need mongodb Atlas account and a config.env file inside server folder with the following variables:

PORT = 8000
DATABASE = mongodb+srv://yourmongoDBKey@cluster0.hg0sdgn.mongodb.net/?retryWrites=true&w=majority
SECRET_KEY = YOUR_SECRET_KEY
ADMIN_EMAIL=admin@gmail.com

# Notes to keep track of changes made

Here are some notes to keep track of the changes I made, So that I can keep a track of every feature.

Added custom hooks to have resuable componenets for Sending Http request to backend, Another hook for form Validation. (The target is reusability and avoiding repeation)

Custom button and Custom input added.

Added different signup and login. Not connected with Backend yet.

Signup and login connected with backend.

A combined Auth-context is added/modified which stores User ID, token (JWT token), IslogedIn state to indicate if the user is loged in, and role to store the role of the user.

User managment interface is modfied. To delete a user the admin just need to use delete button. When a user is deleted the corresponding book tickets also gets deleted, no matter if the ticket was approved. (this behaviour can be modified depending on the preferences) And To change Role of a user the admin need to use a button which opens a Modal inside the modal a dropdown menu appears to choose/select the role. To implement Modal, Portals are used.

User profile page updated logic.
Manage Order (tickets) page updated with the logic that the user (admin/employee or the user who submitted the ticket) should only be able to change the status of the ticket if it is in pending status.

# Next Up

Cleaning code, deleting unnecessary comments and the code which is no longer in use. Deleting old files which are not needed anymore.

Improving CSS styles.

Improving nav-bar style for mobile view.

Improving a few components so that they can be reused and avoid repeation.

# The project in Parts

The project is divided into two parts

1. Client (or front End)
2. Server (or Back End)

## Client (or front End)

Go to the project directory then go to "client" directory
In the in client directory, you can run:
`npm start`
and your frontend will start.

## Server (or Back End)`

Go to the project directory then go to "server" directory
In the in server directory, you can run:
nodemon app.js

~~Currently the frontend and backend both uses port 3000 so you can not run both at the same time. I will update this soon.~~

### Start your local mongoDB create a database

start your local mongoDB. you can use your terminal or MongoDB compass to start your DB.

create a database named as
`readbooksonline`
you do not need any collection for it. just creating database will work fine.

## Development

Created Navbar, for that I used bootstrap5.
Created pages for signin, signup, about us and home. The pages load without refreshing (page routing) to achieve this I used react router dom.
in the blog https://theknowledgeburrow.com/what-is-the-difference-between-navlink-and-link/
the author said that "React router can be an overkill for certain projects where all you need is basic navigation and routing functionalities. In that context, React Router is not necessary at all."
For a simple project like RBO, React router is an indeed overkill but I used it anyway.

Creating Sigup/ login and connection of backend with frontend.
To connect backend with frondend I used `Proxying API Requests in Development`
documentation here https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually

It saves us from CORS policy Error.
Go to the signup page and fill the form. It will give error if the email is already registered.

At the moment there is no validation on frontend. So if you do not fill any field it will/might not through any error on the page/front end but it will not create any account inside database.

The front end validation and role defining is the next stage.
"# readbooksonline"
