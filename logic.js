

    var firebaseConfig = {
        apiKey: "AIzaSyBhnCezVbIc6-60245aLSivUB6qE35Wlak",
    authDomain: "train-times-425c3.firebaseapp.com",
    databaseURL: "https://train-times-425c3.firebaseio.com",
    projectId: "train-times-425c3",
    storageBucket: "",
    messagingSenderId: "925068728161",
    appId: "1:925068728161:web:e00ac9ffb7115663"
};

firebase.initializeApp(firebaseConfig);




let trainData = firebase.database();



$("#add-train-btn").on("click", function (event) {
    event.preventDefault();


    let trainName = $("#train-name-input")
        .val()
        .trim()

    let firstTrain = $("#first-train-input")
        .val()
        .trim()

    let frequency = $("#frequency-input")
        .val()
        .trim()

    let destination = $("#destination-input")
        .val()
        .trim();

    let addTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    alert("Train added");

    console.log(addTrain.trainName);
    console.log(addTrain.destination);
    console.log(addTrain.firstTrain);
    console.log(addTrain.frequency);

    //puts data up to firebase
    trainData.ref().push(addTrain);

    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#train-name-input").val("");
    $("#frequency-input").val("");
    trainData.ref().on("child_added", function (childSnapshot, prevChildKey) {
    });




    console.log(childSnapshot.val());


    let tName = childSnapshot.val().name;
    let tDestination = childSnapshot.val().destination;
    let tFrequency = childSnapshot.val().frequency;
    let tFirstTrain = childSnapshot.val().firstTrain;

    let timeArr = tFirstTrain.split(":");
    let trainTime = moment()
        .hours(timeArr[0])
        .minutes(timeArr[1]);
    let maxMoment = moment.max(moment(), trainTime);
    let tMinutes;
    let tArrival;


    if (maxMoment === trainTime) {
        tArrival = trainTime.format("hh:mm A");
        tMinutes = trainTime.diff(moment(), "minutes");
    } else {

        let differenceTimes = moment().diff(trainTime, "minutes");
        let tRemainder = differenceTimes % tFrequency;
        tMinutes = tFrequency - tRemainder;
        // To calculate the arrival time, add the tMinutes to the current time
        tArrival = moment()
            .add(tMinutes, "m")
            .format("hh:mm A");
    }


    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);


})
