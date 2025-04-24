# Firebase Setup Guide for Greenify

This guide will help you set up Firebase for your Greenify project.

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Enable Google Analytics if desired (recommended)

## Step 2: Register Your Web App

1. From the Firebase project dashboard, click the web icon (</>) to add a web app
2. Register your app with a nickname (e.g., "Greenify Web")
3. You'll receive a configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

4. Copy these values to your `.env` file

## Step 3: Enable Authentication

1. In the Firebase Console, go to "Authentication" > "Sign-in method"
2. Enable "Email/Password" authentication
3. Optionally, enable other authentication methods as needed (Google, Facebook, etc.)

## Step 4: Set Up Firestore Database

1. Go to "Firestore Database" in the Firebase Console
2. Click "Create database"
3. Start in production mode (or test mode if you're just experimenting)
4. Choose a location close to your users

## Step 5: Set Up Security Rules

Create basic security rules for your Firestore database:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles
    match /users/{userId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && request.auth.uid == userId;
    }
    
    // Orders
    match /orders/{orderId} {
      allow read: if request.auth != null && 
                   (resource.data.userId == request.auth.uid || 
                    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "ADMIN");
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null && 
                     (resource.data.userId == request.auth.uid || 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "ADMIN");
      allow delete: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "ADMIN";
    }
    
    // Payments
    match /payments/{paymentId} {
      allow read: if request.auth != null && 
                   (resource.data.userId == request.auth.uid || 
                    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "ADMIN");
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null && 
                     (resource.data.userId == request.auth.uid || 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "ADMIN");
      allow delete: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "ADMIN";
    }
  }
}
```

## Step 6: Update Dependencies

Ensure you have the Firebase SDK installed:

```bash
npm install firebase
```

## Step 7: Initialize Firebase in Your App

The Firebase configuration has been set up in `/src/lib/firebase.ts`. Make sure to update your `.env` file with the values from Step 2.

## Step 8: Migrating Data (Optional)

If you need to migrate existing data from Supabase to Firebase:

1. Export your data from Supabase
2. Transform the data to match the Firestore structure
3. Import the data using the Firebase Admin SDK or Firestore batch operations

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
