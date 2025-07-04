const admin = require('firebase-admin');
const serviceAccount = require('../adminkey.json'); // <-- UPDATE THIS PATH!

// Replace with the email address of the user you want to make admin
const targetEmail = 'jeneib13@gmail.com'; // <-- UPDATE THIS EMAIL!

// Initialize the Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // You might need the databaseURL if you use Realtime Database,
  // but for Auth it's often not strictly necessary here.
  // databaseURL: "https://YOUR-DATABASE-NAME.firebaseio.com"
});

console.log(
  `Attempting to make ${targetEmail} an application administrator...`
);

async function setAdminClaim(email: string) {
  try {
    // 1. Get the user's UID by their email address
    const user = await admin.auth().getUserByEmail(email);
    const uid = user.uid;

    console.log(`Found user with UID: ${uid}`);

    // 2. Set the custom user claim 'admin' to true
    await admin.auth().setCustomUserClaims(uid, { admin: true });

    console.log(
      `Successfully set custom claim { admin: true } for user ${uid}`
    );

    // 3. Optional: Revoke refresh tokens for the target user
    // This forces the user to get a new ID token on their next request,
    // which will include the new claim. This will effectively sign them
    // out on any active sessions where the old token is used.
    await admin.auth().revokeRefreshTokens(uid);
    console.log(
      `Revoked refresh tokens for user ${uid}. They will get new claims upon next auth action.`
    );

    console.log(`${email} is now an application administrator.`);
  } catch (error) {
    console.error('Error setting admin claim:', error);
    process.exit(1); // Exit with an error code
  }
}

// Run the function
setAdminClaim(targetEmail)
  .then(() => {
    console.log('Script finished.');
    process.exit(0); // Exit successfully
  })
  .catch(() => {
    process.exit(1); // Ensure process exits on error
  });
