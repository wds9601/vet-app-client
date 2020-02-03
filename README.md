## PetRex
https://pet-rex.herokuapp.com/
Pet health management has never been easier with PetRex™! No more scrounging through old drawers to dig up ancient files, now you can keep a portable copy of all your companion's health records in your pocket. PetRex™ is a full-stack application enabling busy owner's to keep their animals' information up-to-date and easily accessible. PetRex™ even provides nearby veterinarian contact information!
## Requirements
* Site is functional    
* Multiple Models   
* API or sufficiently difficult other thing 
* JWT Token Log in works    
* Sign up automatically logs me in  
* Sensible error messages for bad login info or errors  
* Routes that should be protected are   
* React Router Used for 3+ Pages    
* Appropriate Use of Github 
* Readme is included    
* .gitignore is set up, No .env in prod 
* Appropriate use of React  
* Visually appealing; Effort with Design    
* Backend GET and POST Routes   
* Backend PUT or DELETE route   
* Group work appropriately split up 
* Display of Effective Teamwork     
## Technologies used
* MongoDB/Mongoose ODM
* Express/NodeJS
    * CORS - Enables secure cross-domain resource sharing
    * Cloudinary - Provides cloud-based media management services
    * Bcrypt - User authentication via password hashing
    * JWT - JSON Web Token securing user interaction throughout the app with SSO
* React
    * React-router-dom
    * Reactstrap/Bootstrap
## Routes/Models
 * Routes
    * Auth
     - `POST /auth/signup` - Creates a user and generates a token
     - `POST /auth/login` - Verifies user credentials and signs them in
    * Pets
     - `GET /pets` - Finds all pets registered to the signed in user and displays a link to each pet's personal page
     - `POST /pets` - Creates a pet object with relevant data in MongoDB
     - `GET /pets/:petId` - Renders a page with that pets personal data
     - `PUT /pets/:petId` - Updates the pet's show page with new data submitted via form
     - `DELETE /pets/:petId` - Removes a pet and their data from the database and the user's profile
     - `GET /pets/:petId/medical` - Renders the pet's medical summary
     - `PUT /pets/:petId/medical` - Updates the pet's medical summary with information submitted via form
     - `GET /pets/:petId/treatment` - Renders the pet's treatment history
     - `POST /pets/:petId/treatment` - Creates a treatment object associated with the selected pet, submitted via form
 * Models
    - Medical Summary
     rabiesShot, microchip
    - Treatment
     treatment, treatmentDate
    - Pet
     owner, name, typeOfAnimal, breed, age, sex, petImage, summary, treatment
    - User
     firstname, lastname, email, password, profileUrl
    
## Use cases
The target user for this app is any pet owner that wants to digitalize their pet's health records, saving time and effort while still maintaining up to date information that is easily presentable to health professionals.
- As a user, I can:
   - Register all my pets with their relevant information, including medical summary and a description of various treatments and dates
   - Update data as the pet's status changes
   - Remove pets from my profile (upon adoption)
   - Visit each pet's personal page to display any information the user deem's relevant in a simple interface
   - Find nearby veterinarians and their address/phone number 
## Development process
   - January 24-26 2020
    Brainstorm ideas for potential features and methods to achieve functionality
   - January 27 2020
    Developed wireframes depicting planned pages, data flow and desired user experience
    Data schema/models in MongoDB
    Basic route implementation to transfer data
   - January 28 2020
    Completed back-end routing for data accessibility 
    Began front-end React development, expanded wireframing models with updated implementation plans
   - January 29 2020
    Reconfigured back-end routing and database modelling for optimization
    Developed React component schema and basic functionality, including pages with React-router-dom
   - January 30 2020
    Implemented Cloudinary functionality to enable media upload/presentation
    Began data fetching from back-end API to display pet information in React components
   - January 31 2020
    Optimized data fetching on client to respective routes available on server
    Explored design and branding options
    Incorporated Yelp API to locate nearby veterinarians
   - February 1 2020
    Implemented Reactstrap
    Styled user interfaces
## Setup Guide
To run this application on your own local server:
* Fork and clone this repository
* Run `npm install` to install node module dependancies
* Run nodemon in the server directory
* Run npm start in the client directory
* Create .env file with JWT_SECRET for token usage
Collapse
