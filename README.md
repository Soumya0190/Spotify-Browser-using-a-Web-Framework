# Spotify-Browser-using-a-Web-Framework
https://canvas.eee.uci.edu/courses/30017/assignments/599589

---

The STAR method (Situation, Task, Action, Result) is a structured approach to explaining a project or accomplishment. Here's how you can explain the **Spotify Browser using a Web Framework** project using the STAR method:

### **Situation:**
I was tasked with developing a **Spotify browser** using a web framework as part of my assignment. The goal was to build a web application that allows users to interact with Spotify's API, displaying information such as artists, albums, and tracks in a structured, user-friendly format. Additionally, the project required implementing features such as search components, artist/album/track pages, and the possibility of playing music directly from the browser using Spotify's Web Playback SDK.

### **Task:**
My primary objective was to design and implement a **web application** that communicates with Spotify's API to:
- Populate user information such as playlists and recommendations.
- Implement a search functionality for browsing artists, albums, and tracks.
- Create dedicated pages for artists, albums, and tracks displaying relevant data such as songs, album covers, and artist details.
- Set up a web server using Express to serve the application and integrate the **Spotify Web Playback SDK** to enable music playback.

### **Action:**
To achieve the objectives, I took the following steps:
1. **Web Framework Setup**: 
   I chose **Express** to set up a Node.js web server to handle communication between the browser and the Spotify API. I ensured that the server was properly configured to handle incoming requests, including using session middleware to manage user tokens and authenticate their Spotify accounts.
   
2. **User Information**:
   I implemented functionality to **populate user information** such as their playlists and music preferences by integrating Spotify's Web API and authenticating users through OAuth. This allowed me to fetch personalized data from Spotify based on the user’s account.

3. **Search Component**:
   I created a **search component** that allows users to search for artists, albums, and tracks. The search function queries the Spotify API and displays the results dynamically, making it easy for users to discover music.

4. **Artist, Album, and Track Pages**:
   I developed dedicated pages for artists, albums, and tracks. These pages display relevant data such as:
   - **Artist page**: Name, bio, top tracks, and albums.
   - **Album page**: Album cover, tracklist, and release details.
   - **Track page**: Track title, album, and play options.
   
   Each page was dynamically populated based on the user’s search or navigation.

5. **Spotify Web Playback SDK**:
   I integrated the **Spotify Web Playback SDK** to allow users to play music directly in the browser. This involved handling playback controls (play, pause, next, previous) and ensuring smooth integration with the Spotify Web API to control the music.

6. **Hosting**:
   As a bonus feature, I deployed the web application to a **publicly visible URL** so that others could access it without needing to run the application locally. I also improved token storage management to handle multiple users simultaneously.

### **Result:**
The project was successfully completed, meeting all the required learning outcomes:
- The **web server** was able to communicate with Spotify’s API to retrieve and display user data, artists, albums, and tracks.
- The **search functionality** worked seamlessly, allowing users to find artists, albums, and tracks efficiently.
- The **Spotify browser artist, album, and track pages** were fully functional and displayed all relevant information, providing an engaging user experience.
- The **Spotify Web Playback SDK** was successfully integrated, enabling users to play music directly in the browser.
- The application was deployed to a **publicly accessible URL**, making it available to anyone with an internet connection.
- The session management and token storage were improved to allow multiple users to authenticate and interact with the app simultaneously.

The project was well-received, demonstrating proficiency in web development, API integration, and working with external libraries like the Spotify Web Playback SDK.

---

This project appears to be a **Spotify Browser** with a backend built using **Express.js**, interacting with the **Spotify Web API** to provide a web interface for users to explore Spotify's catalog of artists, albums, and tracks.

### Folder Structure
The project has two main directories:
- **client**: This likely contains the front-end of the application, which is responsible for rendering the Spotify data in a user-friendly interface.
- **webserver**: This folder contains the backend, including Express.js routes and logic for interacting with the Spotify Web API and handling authentication.

Here’s an overview of the files you've provided:

---

### **app.js (webserver)**

This file sets up the Express.js application that serves the backend of the Spotify Browser. Key components:
- **Middleware Setup**: 
  - `cors('http://localhost:4200')`: Enables Cross-Origin Resource Sharing, allowing the client (running on `localhost:4200`) to communicate with the server.
  - `logger('dev')`: Logs HTTP requests.
  - `express.json()` and `express.urlencoded()`: Parses incoming request bodies as JSON and URL-encoded data.
  - `cookieParser()`: Used to parse cookies.
  
- **Routing**: The application uses an `indexRouter`, which defines various routes for handling user authentication, search functionality, and requests to retrieve information about Spotify artists, albums, and tracks.
  
- **Error Handling**: Standard error handling for 404 errors and other issues.

---

### **index.js (webserver)**

This file defines the **Express.js routes** for the application and handles interactions with the Spotify API. It uses **node-fetch** to make HTTP requests to Spotify’s API endpoints and manages authentication using **OAuth 2.0**.

Key sections:
1. **Authentication Logic**:
   - `router.get('/login')`: Redirects the user to Spotify’s OAuth authorization page to authenticate.
   - `router.get('/callback')`: Handles the OAuth callback, retrieves the authorization code, and exchanges it for an **access token** and **refresh token**.

2. **API Request Logic**:
   - `makeAPIRequest(url, res)`: A helper function that makes GET requests to the Spotify API using the `access_token`. It handles token expiration and refreshes the token when needed.
   - Several routes that make requests to the Spotify API, including:
     - `/me`: Fetches the authenticated user’s details.
     - `/search/:category/:resource`: Allows searching for artists, albums, or tracks.
     - `/artist/:id`, `/album/:id`, `/track/:id`: Fetches details about a specific artist, album, or track by their ID.
     - Routes for fetching related artists, top tracks, album tracks, and audio features.

3. **Token Management**:
   - The access and refresh tokens are stored in `tokens.json`. This file is read and written to during the OAuth process and token refresh process.

4. **Error Handling**:
   - If an API request fails (e.g., token expired), the `refresh` function is called to refresh the token and retry the request.

5. **Redirect URI**: 
   - The project uses `http://localhost:8888/callback` as the redirect URI for Spotify’s OAuth flow.

---

### **How the App Works:**
- **Step 1**: When the user navigates to `/login`, they are redirected to Spotify’s OAuth page for authentication.
- **Step 2**: After successful authentication, Spotify redirects the user to `/callback`, where the server exchanges the authorization code for access and refresh tokens. These tokens are saved in `tokens.json`.
- **Step 3**: Once authenticated, the server uses the access token to fetch data from Spotify's API. For example, when a user searches for an artist, the server will make an API request to `/v1/search` and return the data to the client.
- **Step 4**: If the access token expires, the server automatically refreshes the token using the stored refresh token and retries the request.

---

### **Key Routes in `index.js`:**

- **/login**: Initiates Spotify OAuth authentication.
- **/callback**: Handles the callback after Spotify authentication and exchanges the code for an access token and refresh token.
- **/me**: Returns the authenticated user’s profile data.
- **/search/:category/:resource**: Searches for a category (artist, album, track) using the provided resource (e.g., name).
- **/artist/:id**: Fetches details about an artist.
- **/album/:id**: Fetches details about an album.
- **/track/:id**: Fetches details about a track.
- **/track-audio-features/:id**: Fetches audio features for a specific track.

---

### **To Run the Project:**
1. **Install Dependencies**:
   Make sure you have Node.js installed. In the project root folder, run the following to install the required dependencies:
   ```bash
   npm install
   ```

2. **Set Up Spotify Developer Application**:
   - Create a Spotify Developer account (if you don’t have one) and create a new application on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
   - Obtain your `client_id` and `client_secret` from the application and save them in `client_secret.json` in the project root.

3. **Start the Web Server**:
   Run the server using:
   ```bash
   node webserver/app.js
   ```

4. **Client-side**:
   The project expects the **client** side of the application to run on **http://localhost:4200**, which is typically where an Angular app would be served. Ensure that the front-end is running and making requests to the backend.

5. **Visit the App**:
   - Go to `http://localhost:8888` to start the authentication flow, which will redirect you to Spotify to log in.
   - After successful login, the server will handle Spotify data retrieval and provide it to the client.

---

### **Additional Notes:**
- **Session Management**: The backend uses session-based management (access and refresh tokens) to maintain the user's Spotify session and ensure that their data is always up to date.
- **File Storage**: Tokens are stored in local files (`tokens.json`), which can be updated during the authentication and token refresh process.
- **API Endpoints**: Multiple Spotify API endpoints are used to fetch data about artists, albums, tracks, and more, providing users with rich functionality and data exploration.