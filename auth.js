// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDerlqtYFRzbF178SiJ-rogesSvZaUX2zY",
  authDomain: "eagle-airways.firebaseapp.com",
  projectId: "eagle-airways",
  storageBucket: "eagle-airways.appspot.com",
  messagingSenderId: "599319887318",
  appId: "1:599319887318:web:77a1a5f1c4d8db851af877",
  databaseURL: "https://eagle-airways-default-rtdb.firebaseio.com/",
  measurementId: "G-Z81YYS1ZSW",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var auth = firebase.auth();
var db = firebase.firestore();
var database = firebase.database();
var functions = firebase.functions();

// Global variable for users uid
var user_uid = "";
var email = "";
var password = "";

// setting the uid of the current user
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    user_uid = user.uid;
    console.log(user_uid);
  }
});

// Data extraction stuff
var user_flight_info = "";
var user_departure = "";
var user_destination = "";
var user_departure_date = "";
var user_return_date = "";
var user_no_of_adults = "";

var user_adult_salutation = "";
var user_adult_first_name = "";
var user_adult_last_name = "";
var user_adult_code = "";
var user_adult_number = "";
var user_adult_email = "";
var user_children_first_name = "";
var user_children_last_name = "";
var user_children_date = "";
function calcValue2() {
  user_adult_salutation = document.getElementById("user-adult-salutation")
    .value;
  user_adult_first_name = document.getElementById("user-adult-first-name")
    .value;
  user_adult_last_name = document.getElementById("user-adult-last-name").value;
  user_adult_code = document.getElementById("user-adult-code").value;
  user_adult_number = document.getElementById("user-adult-number").value;
  user_adult_email = document.getElementById("user-adult-email").value;
  user_children_first_name = document.getElementById("user-children-first-name")
    .value;
  user_children_last_name = document.getElementById("user-children-last-name")
    .value;
  user_children_date = document.getElementById("user-children-date").value;

  writeUserData2();
}

// sending data to firebase with UID as the key
function writeUserData2() {
  firebase.database().ref(user_uid).update({
    user_adult_salutation: user_adult_salutation,
    user_adult_first_name: user_adult_first_name,
    user_adult_last_name: user_adult_last_name,
    user_adult_code: user_adult_code,
    user_adult_number: user_adult_number,
    user_adult_email: user_adult_email,
    user_children_first_name: user_children_first_name,
    user_children_last_name: user_children_last_name,
    user_children_date: user_children_date,
  });
}

// Code to get data back and display it on the flight details screen
function accessData() {
  var databaseRef = database.ref(user_uid);

  // Gets the data as an object back
  databaseRef.on(
    "value",
    function (snapshot) {
      data = snapshot.val();
      var first_name = data.user_adult_first_name;
      var flight_info = data.user_flight_info;
      var departure = data.user_departure;
      var destination = data.user_destination;
      var departure_date = data.user_departure_date;

      var content = "";
      content += "<td>" + first_name + "</td>";
      content += "<td>" + flight_info + "</td>";
      content += "<td>" + 4091 + "</td>";
      content += "<td>" + departure + "</td>";
      content += "<td>" + destination + "</td>";
      content += "<td>" + departure_date + "</td>";
      console.log(snapshot.val());
      $("#user-table-departure").append(content);
    },
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
}

// Sending booking.html data to firebase
function writeUserData() {
  console.log(user_uid);
  firebase.database().ref(user_uid).set({
    user_flight_info: user_flight_info,
    user_departure: user_departure,
    user_destination: user_destination,
    user_departure_date: user_departure_date,
    user_return_date: user_return_date,
    user_no_of_adults: user_no_of_adults,
  });
}
function redirectBooking2() {
  window.location.href = "http://127.0.0.1:5500/booking2.html";
}
// Accessing data
function calcValue() {
  user_flight_info = document.getElementById("user-flight-info").value;
  user_departure = document.getElementById("user-departure").value;
  user_destination = document.getElementById("user-destination").value;
  user_departure_date = document.getElementById("user-departure-date").value;
  user_return_date = document.getElementById("user-return-date").value;
  user_no_of_adults = document.getElementById("user-no-of-adults").value;

  var user_details = [
    user_flight_info,
    user_departure,
    user_destination,
    user_departure_date,
    user_return_date,
    user_no_of_adults,
  ];
  console.log(user_details);

  // Displaying the data collected from the top
  // document.getElementById("user_display").innerHTML = user_details;
  writeUserData();
}
// Button to send data - booking.html
const booking1Btn = document.querySelector("#booking1-button");
booking1Btn.addEventListener("click", (e) => {
  e.preventDefault();

  console.log(user_uid);
  calcValue();

  // needed the timeout function because otherwise the redirection was happening way before data was getting sent
  setTimeout(function () {
    location.href = "http://127.0.0.1:5500/booking2.html";
  }, 2000);
});

// Creating a user
const signUpBtn = document.querySelector("#signup-btn");
signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();

  email = document.getElementById("user-email-signup").value;
  password = document.getElementById("user-password-signup").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
  console.log("User created!");
});

// Logging out the user
function logoutUser() {
  auth.signOut();
  console.log("User logged out!");
}

// Logging in the user
const loginBtn = document.querySelector("#login-btn");
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  email = document.getElementById("user-email-login").value;
  password = document.getElementById("user-password-login").value;
  console.log(email, password);
  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log("User logged in!");
    })
    .catch((error) => {
      console.log(error.message);
    });
});
