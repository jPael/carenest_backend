# Project Setup Guide

This guide will walk you through setting up Google Firebase, registering a web application, and configuring the `.env` file for your project.

## Step 1: Set Up Google Firebase

### Create a Firebase Project:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click on **"Add Project"**.
3. Enter a project name (e.g., `YourProjectName`) and follow the prompts to create the project.

### Register a Web Application:

1. In your Firebase project dashboard, click on the **Web icon (</>)** to register a web app.
2. Enter a name for your app (e.g., `YourWebApp`).
3. Click **Register App**.

### Copy Firebase Configuration:

After registering the app, Firebase will provide a configuration object. Copy the following details:

-  `apiKey`
-  `authDomain`
-  `projectId`
-  `storageBucket`
-  `messagingSenderId`
-  `appId`

## Step 2: Configure the `.env` File

### Rename `.env.example` to `.env`

1. Locate the `.env.example` file in your project root directory.
2. Rename it to `.env`.

### Update the `.env` File

Open the `.env` file and replace the placeholders with the Firebase configuration and PostgreSQL database details. Your `.env` file should look like this:

```
# Example PostgreSQL connection string (replace with your actual credentials)
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"

# Direct connection to the database. Used for migrations.
DIRECT_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE"

# Firebase Configuration (replace with your actual Firebase credentials)
FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
FIREBASE_AUTH_DOMAIN="YOUR_FIREBASE_AUTH_DOMAIN"
FIREBASE_PROJECT_ID="YOUR_FIREBASE_PROJECT_ID"
FIREBASE_STORAGE_BUCKET="YOUR_FIREBASE_STORAGE_BUCKET"
FIREBASE_MESSAGING_SENDER_ID="YOUR_FIREBASE_MESSAGING_SENDER_ID"
FIREBASE_APP_ID="YOUR_FIREBASE_APP_ID"
```

> **Note:** Replace the placeholders (`USERNAME`, `PASSWORD`, `HOST`, `PORT`, `DATABASE`, `SCHEMA`, and Firebase credentials) with your actual values. Do not share sensitive information publicly.

## Step 3: Run the Application

### Install Dependencies:

Run the following command to install all required dependencies:

```bash
npm install
```

### Start the Development Server:

Run the application using the following command:

```bash
npm run dev
```

### Verify the Application:

1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) (or the port specified in your configuration).
2. Ensure the application is running without errors.

## Troubleshooting

-  **Firebase Errors:** Double-check that the Firebase configuration values in the `.env` file are correct.
-  **Database Connection Issues:** Verify that the `DATABASE_URL` and `DIRECT_URL` are correct and that the database is accessible.
-  **Environment Variables:** Ensure the `.env` file is correctly named and located in the root directory of your project.

## Additional Resources

-  [Firebase Documentation](https://firebase.google.com/docs)
-  [Prisma Documentation](https://www.prisma.io/docs)
-  [Supabase Documentation](https://supabase.com/docs)

---

This guide provides a step-by-step approach to setting up your project correctly. If you encounter any issues, refer to the troubleshooting section or check the official documentation.
