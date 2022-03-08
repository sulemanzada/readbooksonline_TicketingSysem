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
you can go to the server directory and run:
`npm start`
or 

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

3/3/2022: Created Navbar, for that I used bootstrap5.
            Created pages for signin, signup, about us and home. The pages load without refreshing (page routing) to achieve this I used react router dom.
            in the blog https://theknowledgeburrow.com/what-is-the-difference-between-navlink-and-link/
            the author said that "React router can be an overkill for certain projects where all you need is basic navigation and routing functionalities. In that context, React Router is not necessary at all."
            For a simple project like RBO, React router is an indeed overkill but I used it anyway.

8/3/2022: Creating Sigup/ login and connection of backend with frontend.
To connect backend with frondend I used `Proxying API Requests in Development`
documentation here https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually

It saves us from CORS policy Error.
Go to the signup page and fill the form. It will give error if the email is already registered.

At the moment there is no validation on frontend. So if you do not fill any field it will/might not through any error on the page/front end but it will not create any account inside database.

The front end validation and role defining is the next stage.
"# readbooksonline" 
