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

// Initial Values
var trainName = "";
var destination = "";
var trainTime = 0;
var frequency = 0;

//establishing the date and format of "date"
var randomDate = "";
var dateFormat = "MM/DD/YYYY";
var randomMoment = moment(randomDate, dateFormat);


//captures submit button click
$("#submit-button").on("click", function(event) {
    event.preventDefault();
    
    //Get the input values
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = parseInt($("#train-time").val().trim());
    var frequency = parseInt($("#frequency").val().trim());
  
    // Save in Firebase
    database.ref().set({
      bName: trainName,
      bDestination: destination,
      bTrainTime: trainTime,
      bMonRate: frequency
    });

    // Log the new High Price
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);
    
    createRow();
  })

// Firebase watcher + initial loader                                                               
database.ref().on("value", function(snapshot) {  

  // Log everything that's coming out of snapshot
  console.log(snapshot.val().trainName);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().trainTime);
  console.log(snapshot.val().frequency);
  
  // Change the HTML to reflect
  $("#name-display").text(snapshot.val().trainName);
  $("#email-display").text(snapshot.val().destination);
  $("#age-display").text(snapshot.val().trainTime);
  $("#comment-display").text(snapshot.val().frequency);
  
  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


//NEEDED??????????????????????????????????????


var tFrequency = 3;               // Assumptions

var firstTime = "03:30";          // Time is 3:30 AM

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



//function to create rows
function creatRow() {
    
    var tRow = $("<tr>");                                 // Create a new table row element

    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    var nameTd = $("<td>").text();
    var destinationTd = $("<td>").text();
    var trainTimeTd = $("<td>").text();
    var frequencyTd = $("<td>").text();

         
    // Append the newly created table data to the table row
    tRow.append(nameTd, destinationTd, trainTimeTd, frequencyTd);
    // Append the table row to the table body
    $("tbody").append(tRow);
};