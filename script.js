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
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const validAadhaars = ["123456789012", "987654321098"]; // Add more Aadhaar numbers as needed
const validVoterIds = ["ABC1234567", "XYZ9876543"]; // Add more Voter IDs as needed

function hashData(data) {
  return CryptoJS.SHA256(data).toString();
}

function validateAadhaar(aadhaar) {
  return validAadhaars.includes(aadhaar);
}

function validateVoterId(voterId) {
  return validVoterIds.includes(voterId);
}

// Handle navigation between forms
document.getElementById('nextBtn1').addEventListener('click', () => {
  if (validatePhase1()) {
    document.getElementById('phase1Form').classList.remove('active');
    document.getElementById('phase2Form').classList.add('active');
    document.getElementById('progressBar').style.width = '66%';
  }
});

document.getElementById('nextBtn2').addEventListener('click', async () => {
  const isUnique = await validateEmailUniqueness();
  if (isUnique && validatePhase2()) {
    document.getElementById('phase2Form').classList.remove('active');
    document.getElementById('phase3Form').classList.add('active');
    document.getElementById('progressBar').style.width = '100%';
  }
});

document.getElementById('phase3Form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (validatePhase3()) {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const aadhaar = document.getElementById('aadhaar').value;
    const voterId = document.getElementById('voterId').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;

    const aadhaarHash = hashData(aadhaar);
    const voterIdHash = hashData(voterId);

    auth.createUserWithEmailAndPassword(email, 'defaultPassword')
      .then((userCredential) => {
        const user = userCredential.user;
        return db.collection('users').doc(user.uid).set({
          email: user.email,
          phone: phone,
          aadhaarHash: aadhaarHash,
          voterIdHash: voterIdHash,
          name: name,
          age: age,
          sex: sex,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      })
      .then(() => {
        return storage.ref('ids/' + auth.currentUser.uid).putString(`Aadhaar: ${aadhaarHash}, VoterID: ${voterIdHash}`);
      })
      .then(() => {
        document.getElementById('phase3Form').classList.remove('active');
        document.getElementById('successMessage').classList.add('active');
        setTimeout(() => {
          window.location.href = 'user-session.html';
        }, 2000);
      })
      .catch((error) => {
        console.error('Error signing up:', error.message);
        displayError('emailFeedback', error.message);
      });
  }
});

async function validateEmailUniqueness() {
  const email = document.getElementById('email').value;
  try {
    const querySnapshot = await db.collection('users').where('email', '==', email).get();
    if (!querySnapshot.empty) {
      displayError('emailFeedback', 'Email already in use');
      return false;
    } else {
      displaySuccess('emailFeedback', 'Valid email');
      return true;
    }
  } catch (error) {
    console.error('Error checking email:', error);
    return false;
  }
}

function validatePhase1() {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const sex = document.getElementById('sex').value;
  let valid = true;

  if (name.trim().length > 0) {
    displaySuccess('nameFeedback', 'Valid name');
  } else {
    displayError('nameFeedback', 'Name is required');
    valid = false;
  }

  if (age >= 18) {
    displaySuccess('ageFeedback', 'Valid age');
  } else {
    displayError('ageFeedback', 'Must be at least 18 years old');
    valid = false;
  }

  if (sex) {
    displaySuccess('sexFeedback', 'Sex selected');
  } else {
    displayError('sexFeedback', 'Sex is required');
    valid = false;
  }

  return valid;
}

function validatePhase2() {
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  let valid = true;

  if (email.includes('@')) {
    displaySuccess('emailFeedback', 'Valid email');
  } else {
    displayError('emailFeedback', 'Invalid email');
    valid = false;
  }

  if (phone.match(/^\d{10}$/)) {
    displaySuccess('phoneFeedback', 'Valid phone number');
  } else {
    displayError('phoneFeedback', 'Invalid phone number');
    valid = false;
  }

  return valid;
}

function validatePhase3() {
  const aadhaar = document.getElementById('aadhaar').value;
  const voterId = document.getElementById('voterId').value;
  let valid = true;

  if (validateAadhaar(aadhaar)) {
    displaySuccess('aadhaarFeedback', 'Valid Aadhaar number');
  } else {
    displayError('aadhaarFeedback', 'Invalid Aadhaar number');
    valid = false;
  }

  if (validateVoterId(voterId)) {
    displaySuccess('voterIdFeedback', 'Valid Voter ID');
  } else {
    displayError('voterIdFeedback', 'Invalid Voter ID');
    valid = false;
  }

  return valid;
}

function displayError(elementId, message) {
  const element = document.getElementById(elementId);
  element.textContent = message;
  element.classList.remove('valid-feedback');
  element.classList.add('invalid-feedback');
}

function displaySuccess(elementId, message) {
  const element = document.getElementById(elementId);
  element.textContent = message;
  element.classList.remove('invalid-feedback');
  element.classList.add('valid-feedback');
}
