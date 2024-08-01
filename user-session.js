// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAnenmOuraTsXxgRczYqOq7rwOeAKHTC1w",
    authDomain: "online-voting-5e6d4.firebaseapp.com",
    projectId: "online-voting-5e6d4",
    storageBucket: "online-voting-5e6d4.appspot.com",
    messagingSenderId: "389538297568",
    appId: "1:389538297568:web:0d3a66a9ef09942b50c285",
    measurementId: "G-DTLH3MC89E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("Firebase initialized");

// Initialize Firebase Auth and Firestore
const auth = firebase.auth();
const db = firebase.firestore();
const database = firebase.database();

// On window load, check user authentication status
window.onload = function() {
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in
            console.log("User is signed in:", user);
            fetchUserName(user.uid);
            checkIfUserVoted(user.uid);
        } else {
            // No user is signed in, redirect to login page
            console.log("No user is signed in, redirecting to login page.");
            window.location.href = 'sign-up.html';
        }
    });
};

// Function to fetch and display the user name from Firestore
function fetchUserName(userId) {
    const userRef = db.collection('users').doc(userId);
    userRef.get().then((doc) => {
        if (doc.exists) {
            const userName = doc.data().name || "User"; // Fallback to "User" if name is not set
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

// Function to check if the user has already voted
function checkIfUserVoted(userId) {
    const voteRef = database.ref('votes/' + userId);
    voteRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const voteData = snapshot.val();
            const party = atob(voteData.party); // Decrypt the vote
            alert(`You have already voted for ${party}. You cannot vote again.`);
            disableVoteButtons(); // Disable voting buttons if user has already voted
        }
    }).catch((error) => {
        console.error("Error checking vote status:", error);
    });
}

// Function to handle vote submission
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
            
            // Save the encrypted vote to the Realtime Database
            voteRef.set({
                party: encryptedVote,
                timestamp: Date.now()
            }, (error) => {
                if (error) {
                    console.error('Error saving vote:', error);
                    alert('There was an error saving your vote. Please try again.');
                } else {
                    alert('Your vote has been successfully submitted!');
                    disableVoteButtons(); // Disable voting buttons after successful vote
                }
            });
        } else {
            alert('You must be logged in to vote.');
        }
    }
}

// Function to handle user logout
function handleLogout() {
    auth.signOut().then(() => {
        console.log('User signed out successfully.');
        window.location.href = 'sign-up.html'; // Redirect to login page
    }).catch((error) => {
        console.error('Error signing out:', error);
        alert('There was an error signing out. Please try again.');
    });
}

// Function to disable all vote buttons
function disableVoteButtons() {
    const voteButtons = document.querySelectorAll('.vote-btn');
    voteButtons.forEach(button => {
        button.disabled = true;
    });
}

// Add event listeners to vote buttons
document.addEventListener('DOMContentLoaded', () => {
    const voteButtons = document.querySelectorAll('.vote-btn');
    voteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const party = button.getAttribute('data-party');
            handleVote(party);
        });
    });

    // Add event listener to logout button
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});
