// Homework Due 6.17.19

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBOW6-gxboisYBZ1aUhZIaUGiwMfdKT94Q",
  authDomain: "my-project-f54cd.firebaseapp.com",
  databaseURL: "https://my-project-f54cd.firebaseio.com",
  projectId: "my-project-f54cd",
  storageBucket: "my-project-f54cd.appspot.com",
  messagingSenderId: "530708653171",
  appId: "1:530708653171:web:4611dc1358a8538d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Captures submit button click
$("#submit-button").on("click", function(event) {
    event.preventDefault();
    
    // Get the input values
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#train-time").val().trim();
    var frequency = $("#frequency").val().trim();     
  
    // Save in Firebase
    database.ref().push({
      Name: trainName,
      Destination: destination,
      TrainTime: trainTime,
      Frequency: frequency
    });

    // Log the new info
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);
    
    alert("New Train Time Added");

    //clear the form after submitting info
    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
})

// Firebase event for adding info to the database and html
database.ref().on("child_added", function(childSnapshot) {
  console.log("This is childSnapshot:" + childSnapshot.val().Destination);

  // Store everything into a variable
  var trainName = childSnapshot.val().Name;
  var destination = childSnapshot.val().Destination;
  var trainTime = childSnapshot.val().TrainTime;
  var frequency = childSnapshot.val().Frequency; 

  // Logging train info
  console.log("BLA" + trainName);
  console.log("BLA" + destination);
  console.log("BLA" + trainTime);
  console.log("BLA" + frequency);

  //Where calculations go...
  var tFrequency = frequency;             
  var tFirstTime = trainTime; 
  
  console.log("This is trainTime:" + trainTime);
  
  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(tFirstTime, "HH:mm").subtract(1, "years");
  console.log("This is firstTimeConverted:" + firstTimeConverted);
  
  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
  
  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  
  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log("This is the time remaining:" + tRemainder);
  
  // Minute Until Train
  var tMinutesAway = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesAway);
  
  // Next Train
  var nextArrival = moment().add(tMinutesAway, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextArrival).format("HH:mm"));

  //create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(tMinutesAway)
  );

  //append new row to table
  $(".table > thead").append(newRow);

  // Handle the errors (call back)
}), function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
};









