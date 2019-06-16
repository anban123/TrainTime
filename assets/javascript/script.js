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

// var tFrequency = 0;             
// var firstTime = "00:00";         

// // First Time (pushed back 1 year to make sure it comes before current time)
// var firstTimeConverted = moment(firstTime, "HH:MM").subtract(1, "years");
// console.log(firstTimeConverted);

// // Current Time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("HH:MM"));

// // Difference between the times
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// // Time apart (remainder)
// var tRemainder = diffTime % tFrequency;
// console.log(tRemainder);

// // Minute Until Train
// var tMinutesTillTrain = tFrequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// // Next Train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:MM"));

// Captures submit button click
$("#submit-button").on("click", function(event) {
    event.preventDefault();
    
    // Get the input values
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = parseInt($("#train-time").val().trim());
    var frequency = parseInt($("#frequency").val().trim());
  
    // Save in Firebase
    database.ref().set({
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

    //$(".form-control").val("")            ??
  })

  // Firebase event for adding info to the database and html
  database.ref().on("child_added"), function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable
    var trainName = childSnapshot.val().Name;
    var destination = childSnapshot.val().Destination;
    var trainTime = childSnapshot.val().TrainTime;
    var frequency = childSnapshot.val().Frequency; 

    // Logging train info
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    //create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(trainTime),
      $("<td>").text(frequency)
    );

    //append new row to table
    $(".table > thead").append(newRow);

    // Handle the errors
  };
  // function(errorObject) {
  //   console.log("Errors handled: " + errorObject.code);
  // };






