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

var createRow = function() {
    // Create a new table row element
    var tRow = $("<tr>");

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


// Whenever a user clicks the submit-bid button
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
})