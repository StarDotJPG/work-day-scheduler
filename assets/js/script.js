var tasks = [];

var displayDay = function () {

    // set the current day at the top of the page
    var currentDay = moment().format("dddd MMMM D, YYYY");
    $("#currentDay").html(currentDay);

    var hourToDisplay = moment("8AM", "ha");
    var thisHour = moment().startOf('hour');

    // this creates the day schedule
    for (var i = 0; i < 10; i++) {
        // dynamically create each timeblock row
        var timeblock = $("<div>").addClass("row");
        // below line adds the hour of the time block to the html text as well as the class name, so we can find it easier later
        var hour = $("<div>").addClass("col-1 hour " + hourToDisplay.format("ha")).html(hourToDisplay.format("ha"));
        var task = $("<div>").addClass("col description").append($("<p>"));
        // below line uses font awesome lock icon and bootstrap to center it in the div
        var save = $("<div>").addClass("col-1 saveBtn d-flex align-items-center justify-content-center").append($("<i>").addClass("fas fa-lock"));

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

    // load any tasks saved in local storage
    loadTasks();
}

var loadTasks = function () {
    // get local storage and put it into the tasks array
    tasks = JSON.parse(localStorage.getItem("tasks"));

    // if nothing in localStorage, create a new object to track all task status arrays
    if (!tasks) {
        tasks = [];
        // since there's nothing in local storage and the array is empty, 
        // just return now and don't try to update the page elements
        return; 
    }

    // this loops through each item in the tasks array
    // then finds the class that matches the value of the timeblock property
    // then looks for the corresponding description p and sets it to the value of the description property
    for (var i = 0; i < tasks.length; i++) {
        $("." + tasks[i].timeblock).parent().children(".description").children("p").text(tasks[i].description);
    };
};

var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// description was clicked
$(".container").on("click", ".description", function () {
    // get current text of p element
    var text = $(this)
        .text()
        .trim();

    // replace p element with a new textarea
    var textInput = $("<textarea>").val(text);
    $(this).children("p").replaceWith(textInput);

    // auto focus new element
    textInput.trigger("focus");
});

// save button was clicked
$(".container").on("click", ".saveBtn", function () {
    // we need to traverse the DOM to get the value of textarea and the time value
    var text = $(this).parent().children(".description").children("textarea").val();
    var time = $(this).parent().children(".hour").text();

    // recreate p element
    var descriptionP = $("<p>")
        .text(text);

    // replace textarea with new content
    $(this).parent().children(".description").children("textarea").replaceWith(descriptionP);

    // save in tasks array
    tasks.push({
        timeblock: time,
        description: text,
    });

    // save tasks to local storage
    saveTasks();
});

displayDay();