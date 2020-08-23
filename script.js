// Display the current day using Moment JS
// Determine what standard work hours are
// Standard work hours are 9:00 AM - 5:00 pm
// Create rows for each hour
// Use JSON to store each work hour row
// JSON storage should have 9 spots for standard work hours(Index 0-8)
// Will user be able to go to previous and next day (only current day required)
// Use moment js to determine if current hour block in past, current, present
// CSS provided to use color for past, current, present
// Information entered by user is saved to local storage when 'Save Button' is clicked
// Will 'Save Button' act like a submit? Does default action need to be surpressed to prevent page reload and allow save to local storage? 
// Use local storage instead of session storage


// Classes/IDs/Tags Used in HTML/CSS
// * #currentDay
// * body
// * #header
// * textarea
// * .jumbotron
// * .description
// * time-block
// * .row
// * .hour
// * .past
// * .present
// * .future
// * .saveBtn
// * .saveBtn i:hover
// * .input
// * input=text
// * input=submit
// * .display
// * .name
// * .desc
// * .temp
// * .lead
// * .container (used for timeblocks)



// Date function using Moment JS
function date() {
    var dateHeader = moment().format('MMMM Do, YYYY');
    $('#currentDay').text(dateHeader);
}

// Date function called
date();

// JSON Array to referece work hour row
var dailyDesc = [
    // 9:00 AM
    {
        id: "0", hour: "09:00 ", militaryTime: "09", pastNoon: "am", memo: ""
    },
    // 10:00 AM
    {
        id: "1", hour: "10:00 ", militaryTime: "10", pastNoon: "am", memo: ""
    },
    // 11:00 AM
    {
        id: "2", hour: "11:00 ", militaryTime: "11", pastNoon: "am", memo: ""
    },
    // 12:00 PM
    {
        id: "3", hour: "12:00 ", militaryTime: "12", pastNoon: "pm", memo: ""
    },
    // 1:00 PM (13:00)
    {
        id: "4", hour: "01:00 ", militaryTime: "13", pastNoon: "pm", memo: ""
    },
    // 2:00 PM (14:00)
    {
        id: "5", hour: "02:00 ", militaryTime: "14", pastNoon: "pm", memo: ""
    },
    // 3:00 PM (15:00)
    {
        id: "6", hour: "03:00 ", militaryTime: "15", pastNoon: "pm", memo: ""
    },
    // 4:00 PM (16:00)
    {
        id: "7", hour: "04:00 ", militaryTime: "16", pastNoon: "pm", memo: ""
    },
    // 5:00 PM (17:00)
    {
        id: "8", hour: "05:00 ", militaryTime: "17", pastNoon: "pm", memo: ""
    },

]
// console.log(date());





console.log(dailyDesc)
// Create row data for hour, description, and the save button
dailyDesc.forEach(function(thisHour) {
    var hrRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hrRow);
    
    // Hour using 3-column grid
    var hrField = $("<div>")
        .text(`${thisHour.hour}${thisHour.pastNoon}`)
        .attr({
            "class": "col-md-3 hour"
    });

    // Description of daily activity using 8-column grid    
    var hrDirection = $("<div>").attr({
            "class": "col-md-8 description p-0"
        });

    
    // Current hour and scheduler verified  if in the past, present, future
    var planData = $("<textarea>");
    hrDirection.append(planData);
    planData.attr("id", thisHour.id);

    if (thisHour.militaryTime < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.militaryTime === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.militaryTime > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    // Save button icon loaded from fontawesome using 1-column
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>").attr({"class": "col-md-1 saveBtn"});
    savePlan.append(saveButton);
    hrRow.append(hrField, hrDirection, savePlan);
})



// Function to stringify description of daily activity to save to JSON Array & local storage (DO NOT USE Session Storage)
function descSave() {
    localStorage.setItem("dailyDesc", JSON.stringify(dailyDesc));
}

// Function to displays description of daily activity
function dispDesc() {
    dailyDesc.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.memo);
    })
}

// Function for description of daily activity if available in local storage (DO NOT USE Session Storage)
function stored() {
    var storedDay = JSON.parse(localStorage.getItem("dailyDesc"));

    if (storedDay) {
        dailyDesc = storedDay;
    }

    descSave();
    dispDesc();
}
// Function called to check for items in local storage
stored();

// Click listener for Save Button, runs function to Stringify & display description of daily activity
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    dailyDesc[saveIndex].memo = $(this).siblings(".description").children(".future").val();
    descSave();
    dispDesc();
})

// Weather variables
var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');

// Weather link test
// let weather = 'https://api.openweathermap.org/data/2.5/weather?zip=84412,us&appid=d3dee878f6d8c661981e257c21fdc6b5'
// console.log(weather);

// Click listener to fetch weather from API
button.addEventListener('click', function () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=d3dee878f6d8c661981e257c21fdc6b5')
    .then(response => response.json())
    .then(data => {
        var nameValue = data['name'];
        var tempValue = data['main']['temp'];
        // Temperature converted from Kelvin to Farenheit
        var tempValue = Math.round(tempValue * 1.8 - 459.67);
        var descValue = data['weather'][0]['description'];
        
        name.innerHTML = nameValue;
        // &#176; produces degree sign
        temp.innerHTML = tempValue + "&#176;";
        desc.innerHTML = descValue;
        console.log(nameValue);
        console.log(tempValue);
        console.log(descValue);
    })
    
    // In case of misspelled city name an alert occurs
    .catch(err => alert('Wrong city name!'))
})