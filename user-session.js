require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

console.log("Firebase initialized");

// Initialize Firebase Auth and Firestore
const auth = firebase.auth();
const db = firebase.firestore();
const database = firebase.database();

window.onload = function() {
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in
            console.log("User is signed in:", user);
            fetchUserName(user.uid);
            checkIfUserVoted(user.uid);
        } else {
            console.log("No user is signed in, redirecting to login page.");
            window.location.href = 'sign-up.html';
        }
    });
};

function fetchUserName(userId) {
    const userRef = db.collection('users').doc(userId);
    userRef.get().then((doc) => {
        if (doc.exists) {
            const userName = doc.data().name || "User"; 
            document.getElementById('welcome-message').textContent = `Hi ${userName}! Welcome back`;
        } else {
            console.log("No such document!");
            document.getElementById('welcome-message').textContent = `Hi User! Welcome back`;
        }
    }).catch((error) => {
        console.error("Error getting document:", error);
        document.getElementById('welcome-message').textContent = `Hi User! Welcome back`;
    });
}

function checkIfUserVoted(userId) {
    const voteRef = database.ref('votes/' + userId);
    voteRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const voteData = snapshot.val();
            const party = atob(voteData.party); // Decrypt the vote
            alert(`You have already voted for ${party}. You cannot vote again.`);
            disableVoteButtons(); 
        }
    }).catch((error) => {
        console.error("Error checking vote status:", error);
    });
}

function handleVote(party) {
    const userConfirmed = confirm(`Are you sure you want to vote for ${party}?`);
    
    if (userConfirmed) {
        // Encrypt the vote (for simplicity, using Base64 encoding)
        const encryptedVote = btoa(party);
        
        // Get the current user
        const user = firebase.auth().currentUser;

        if (user) {
            const userId = user.uid;
            const voteRef = database.ref('votes/' + userId);
            
            voteRef.set({
                party: encryptedVote,
                timestamp: Date.now()
            }, (error) => {
                if (error) {
                    console.error('Error saving vote:', error);
                    alert('There was an error saving your vote. Please try again.');
                } else {
                    alert('Your vote has been successfully submitted!');
                    disableVoteButtons(); 
                }
            });
        } else {
            alert('You must be logged in to vote.');
        }
    }
}

function handleLogout() {
    auth.signOut().then(() => {
        console.log('User signed out successfully.');
        window.location.href = 'sign-up.html';
    }).catch((error) => {
        console.error('Error signing out:', error);
        alert('There was an error signing out. Please try again.');
    });
}

function disableVoteButtons() {
    const voteButtons = document.querySelectorAll('.vote-btn');
    voteButtons.forEach(button => {
        button.disabled = true;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const voteButtons = document.querySelectorAll('.vote-btn');
    voteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const party = button.getAttribute('data-party');
            handleVote(party);
        });
    });

    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});
