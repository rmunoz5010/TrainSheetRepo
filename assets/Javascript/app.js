$(document).ready(function(){
    console.log("test");

    // initialize firebase

    var config = {
        apiKey: "AIzaSyD3KssKMtMzUSaUbiY2_Uu5IvSvJPt1mB4",
        authDomain: "whenisthenexttrain.firebaseapp.com",
        databaseURL: "https://whenisthenexttrain.firebaseio.com",
        projectId: "whenisthenexttrain",
        storageBucket: "",
        messagingSenderId: "997756607175"
    };
    firebase.initializeApp(config);

    // declare database var
    database = firebase.database();

    var name = "";
    var destination = "";
    var time = "";
    var rate = "";

    $("#submitbtn").on('click', function(event){
        // prevents overwriting 
        event.preventDefault();

        // add values to the HTML elements
        name = $("#name").val().trim();
        destination = $("#destination").val().trim();
        time = $("#time").val().trim();
        rate = $("#rate").val().trim();

        

        database.ref().push({
            name: name,
            destination: destination,
            time: time,
            rate: rate,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });


        database.ref().on('child_added', function(childSnapshot){
            //Log info coming out of snapshot
            // console.log(childSnapshot.val().name);
            // console.log(childSnapshot.val().destination);
            // console.log(childSnapshot.val().time);
            // console.log(childSnapshot.val().rate);

            // this was all gotten from the moment js website
            // Assign tFrequency to the snapshot value of frequency
            var tFrequency = childSnapshot.val().rate;

            // Assign firstTime to the snapshot value of time
            var firstTime = childSnapshot.val().time;

            // First Time (pushed back 1 year to make sure it comes before current time)
            var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
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


            // This acts as a for loop, so for each 'childSnapshot', we're gonna add the info below in a new table row, or <td> 
            $("#table").append("<tr>" + "<td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().destination + "</td>" + "<td>" + childSnapshot.val().rate + "<td>" + moment(nextTrain).format("hh:mm") + "</td>" + "<td>" + tMinutesTillTrain + "</td>"  + "</tr>");
        }, function(errorObject){
            console.log("Errors handled: " + errorObject.code);
        })
});
