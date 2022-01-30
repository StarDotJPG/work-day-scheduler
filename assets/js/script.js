
/*
displayTheDay {

    create timeblocks for 8AM - 5PM
    
    get current time using Moment

    if time block is in the past, change styling of row 
    if time block is in the present, change styling of row
    if time block is in the future, chang estyling of row

    get from local storage
 }
 
jquery listener for clicking description {
    
    change p to textarea

}

jquery listener for clicking save button {
    get value of closest text area
    swap the textarea elemeent for a p
    call save to local storage method
}

save to local storage {

}

get from local storage {

}

*/

var displayDay = function () {

    var hourToDisplay = moment("8AM", "ha");
    var thisHour = moment().startOf('hour');

    // this creates the initial day schedule
    for (var i = 0; i < 10; i++) {
        // dynamically create each timeblock row
        var timeblock = $("<div>").addClass("row");
        var hour = $("<div>").addClass("col-1 hour").html(hourToDisplay.format("ha"));
        var task = $("<div>").addClass("col description");
        var save = $("<div>").addClass("col-1 saveBtn").append($("<i>").addClass("fas fa-lock"));

        // add styling for past/present/future
        if (hourToDisplay.isBefore(thisHour)) {
            task.addClass("past")
        } else if (hourToDisplay.isSame(thisHour)) {
            task.addClass("present");
        } else {
            task.addClass("future")
        }

        // append these elements together
        timeblock.append(hour, task, save);

        // add these elemets to the page
        $(".container").append(timeblock);

        // add another hour to the hourToDisplay
        hourToDisplay.add(1, 'hours');
    }

}