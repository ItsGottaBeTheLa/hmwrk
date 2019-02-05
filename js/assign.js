// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".delassignment").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/assignment/" + id, {
      type: "DELETE"
    }).then(function() {
      console.log("deleted id ", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newAssignment = {
      assignmentName: $("#name").val(),
      type: $("#type").val(),
      completed: $("#completed").val(),
      assignmentDetails: $("#details").val(),
      dueDate: $("#due").val(),
      isRequired: $("#required").val()
    };

    // Send the POST request.
<<<<<<< HEAD
    $.ajax("/api/assignments", {
=======
    $.ajax("/api/assignment", {
>>>>>>> 0b90fd05aed13961fa8022eb60a5cfcd34a7ff34
      type: "POST",
      data: newAssignment
    }).then(function() {
      console.log("created new assignment");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".update-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var updatedAssignment = {
      assignmentName: $("#name").val(),
      type: $("#type").val(),
      completed: $("#completed").val(),
      assignmentDetails: $("#details").val(),
      dueDate: $("#due").val(),
      isRequired: $("#required").val()
    };

    var id = $(this).data("id");

    // Send the POST request.
<<<<<<< HEAD
    $.ajax("/api/assignments/" + id, {
=======
    $.ajax("/api/assignment/" + id, {
>>>>>>> 0b90fd05aed13961fa8022eb60a5cfcd34a7ff34
      type: "PUT",
      data: updatedAssignment
    }).then(function() {
      console.log("updated assignment");
      // Reload the page to get the updated list
      location.assign("/");
    });
  });
});
