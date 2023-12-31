# TourExplore

Ever came back from a tour and found out that you missed some small but really interesting things?  
Ever discovered an interesting place in a popular tourist destination which no one knew about?  
TourExplore is for travel enthusiasts to share information about places they discovered with the world.  
Never miss anything fun on your next trip!

A live deployment of the website can be found [here](https://tour-explore.onrender.com/)

### Features and Tech Stack

-   Developed and tested on **Node v20.10.0**
-   **Express** is used to develop the backend
-   **React** used for frontend
-   **Passport.js** used for implementing authentication (using JWT access and refresh tokens)
-   Users can upload images which are stored on the cloud using **Cloudinary** (Using **multer** for image upload)
-   All data stored in **MongoDB**

### Running the application

Scripts have been provided in the **package.json** file in the root directory. You can have a look at it to know about all the different scripts available.

You need to create the following environment variables before running:

```env
MONGODB_URL=<YOUR MONGO URL>
ACCESS_TOKEN_SECRET=<GENERATE A SECRET>
REFRESH_TOKEN_SECRET=<GENERATE A DIFFERENT SECRET>

CLOUDINARY_CLOUD_NAME=<CLOUD NAME>
CLOUDINARY_API_KEY=<API KEY>
CLOUDINARY_API_SECRET=<API SECRET>

PORT=<OPTIONAL: SPECIFY PORT FOR SERVER (DEFAULT IS 3000)>

VITE_API_BASE_URL=http://localhost:<SERVER PORT>/api/
VITE_BING_API_KEY=<ENTER BING API KEY AGAIN>
```

You can add a **.env** file in the root directory with the above configuration.

You can generate the secrets using the following command on **node**:

```js
console.log(require('crypto').randomBytes(32).toString('hex'));
```

#### Development Mode

1. Install nodemon using:
    ```bash
    npm install nodemon -g
    ```
2. Run the following command:
    ```bash
    npm run dev
    ```

The client runs on port 5713 by default and the server on 3000 (unless a port is specified in the environment variables)

#### Production Mode

1. Install pm2 using:
    ```bash
    npm install pm2 -g
    ```
2. Run the following command to build the client:
    ```bash
    npm run build
    ```
3. Now, for running the app:
    ```bash
    npm run prod
    ```

You can access the web-app on port 3000 by default (unless a port is specified in the environment variables)

_**Note:** Reading environment variables by the server is disabled in production mode, to enable it you can remove the condition from the following piece of code in the **index.js** file_

```js
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './.env' });
}
```

To stop the web-app, run:

```bash
npm run stop
```

### Seeding the Database

The **seeder.js** provided in the **seed** directory can be used for seeding the database.  
_**Note:** You need to first run `npm install` in the root directory before running the seeder_
