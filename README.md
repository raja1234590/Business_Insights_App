# Business Insights Mobile App

A full-stack mobile application simulating a Business Insights Dashboard, similar to Google Business Profile.

## Tech Stack
- **Frontend**: React Native (Expo)
- **Backend**: Node.js & Express
- **Database**: MongoDB (Mongoose)

## Architecture
- `frontend/`: The Expo React Native application containing screens for Login, Dashboard, Business Profile, and Reviews.
- `backend/`: The Express server connecting to MongoDB to serve APIs for the frontend.

---

## Local Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize the Dummy Data (Make sure MongoDB is running locally, or configure MONGODB_URI in `backend/.env` with your Atlas connection string):
   ```bash
   npm run seed
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Connect to Backend:
   By default, the app looks for `http://10.0.2.2:5000` on Android emulator and `http://localhost:5000` on iOS simulator/web.
   If running on a physical device, find your PC's IP address (e.g. `192.168.1.100`) and start Expo with the environment variable:
   ```bash
   EXPO_PUBLIC_API_URL=http://<YOUR_IP>:5000 npx expo start
   ```
   Or without env variable (if using emulator):
   ```bash
   npx expo start
   ```
4. Log into the app:
   - Email: `admin@abcsalon.com`
   - Password: `password123`

---

## Deployment Guide

### Database (MongoDB Atlas)
1. Create a free cluster on [MongoDB Atlas](https://mongodb.com).
2. Create a database user and generate a connection string.
3. Use this connection string for your backend environment variables.

### Backend (Render)
1. Push this repository to GitHub.
2. Log into [Render](https://render.com), click "New Web Service", and connect your repository.
3. Set the Root Directory to `backend`.
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. In Environment Variables, add `MONGODB_URI` mapping to your Atlas Database URL.
7. Once deployed, Render will provide a Live URL (e.g., `https://my-backend.onrender.com`).

### Frontend (Generating an APK)
1. You can build an APK through Expo Application Services (EAS).
2. Inside the `frontend` folder, log into Expo: `npx expo login`
3. Configure EAS: `eas build:configure`
4. Run the Android build command: `eas build -p android --profile preview`
5. Expo will generate an installable `app.apk` upon completion.

---

## API Documentation
Testing via Postman is available. Import the `postman_collection.json` file into Postman to run predefined requests against the backend.
