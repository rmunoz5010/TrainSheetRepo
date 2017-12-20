$(document).ready(function(){
    console.log("test");

    // initialize firebase
    var config = {
        apiKey: "AIzaSyBWAD8y60ZAaDsuwEt-SEa9Jap6kMLS-NU",
        authDomain: "coder-bay-b12e4.firebaseapp.com",
        databaseURL: "https://coder-bay-b12e4.firebaseio.com",
        projectId: "coder-bay-b12e4",
        storageBucket: "coder-bay-b12e4.appspot.com",
        messagingSenderId: "1029478646953"
      };

    firebase.initializeApp(config);

    // declare database var
    database = firebase.database();

    var name = "";
    var destination = "";
    var time = "";
    var rate = "";

    $("#submitbtn").on('click', function(){
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
            // console.log(childSnapshot.val().role);
            // console.log(childSnapshot.val().date);
            // console.log(childSnapshot.val().rate);

            // this was all gotten from the moment js website
            var a = moment(); // this stores the current time in a variable
            var b = moment(childSnapshot.val().date); // this stores the date from childSnapshot to a variable
            var months = a.diff(b, 'months'); // subtracts childSnapshot from a, and calculates it in months. 
            console.log(months);


            // This acts as a for loop, so for each 'childSnapshot', we're gonna add the info below in a new table row, or <td> 
            $("#table").append("<tr>" + "<td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().role + "</td>" + "<td>" + childSnapshot.val().date + "<td>" + months + " months" + "</td>" + "<td>" + childSnapshot.val().rate + "</td>" + "<td>" + months * childSnapshot.val().rate + "</td>" + "</tr>");
        }, function(errorObject){
            console.log("Errors handled: " + errorObject.code);
        })
});