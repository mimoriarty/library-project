# Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts
 
In the project directory, you can run:

### `npm start`  

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run fake-server`

Deploys json-server mock.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.
Use /users, /library or /returnRequests endpoint to view data persisted in your browser.\
You may also see any lint errors in the console.  

##Login with:

    member:
    user - moyra
    password - bxt
      
    librarian:
    user - kerberos
    password - k35

##Development

Trello board: https://trello.com/b/kFggqeBc/library-app

I've spent more than the 2 days that Vidhya expected it would take, so I guess I should have missed the point by far.

Anyways, I've three main routes */home*, */users* and */books*. Those routes behave differently for members than for librarians and serve to the main requirements: books CRUD, managing roles, borrows, penalties, filtering and searching for books, etc. Members have limited access and this is clearly visible in */users* route where they can only edit their own info and logout.

You can navigate from the collapsible top menu.

Login and signin is accesible from any of the routes.

Loggin is required to display most of the routes information and it will be notified when accessing those routes.

/home:
- members and librarians can log out from home easily
- librarians are provided with a list of books requested to return so they can focus on following that task
- member are provided with borrowed books list and borrow history, list give access to book additional detail

/users:
- member can edit or logout
- librarians can change user typology easily with a quick action button, tags provide additional information about user status, the other button provides edit, delete, request returns or place penalties through a dropdown menu.

/books: 
- list items have an unique cta button that would allow librarians to edit book info, member would use it to borrow return books
- add and filter features aren't supported for members
- list item click event renders a detail modal with additional book info

I've been taught to put forms on modals, so more of the edditing, adding forms are rendered into modals easily accesible through 'edit/add buttons' and dropdowns.

Besides those routes there're a few other required to signup users and showing book information.

**App design is MOBILE only**. Not a fan of desktop apps here, design would not break if you use a desktop view but more of the content has not been designed with that purpose and it would look horrible. I've favoured putting time on make something that not looks like the standard CRUD, explode general reusability.

App uses bulma.io instead of bootstrap to expand knowledge of other styles libraries. Additional tunning has been made with sass.

ContextApi and reducers manage state, for asyncronous features I've rely in state management, persisting and reloading state asyncronuosly only when its critical.

It has been fun and very instructive.

Many thanks to all the SuperCharge Team. Best Regards!
