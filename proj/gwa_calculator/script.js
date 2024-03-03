// Getting Average

let grade_list = [];
let units_list = [];


function get_gwa() {
  let total_units = 0;
  let total_grade = 0;
  
  if (grade_list.length == 1) {
    return grade_list[0] * units_list[0] / units_list[0];
  }

  for (let i = 0; i < grade_list.length; i++) {
    total_grade += grade_list[i] * units_list[i];
    total_units += units_list[i];
  }

  return total_units > 0 ? total_grade / total_units : 0;
}

// Get Elements
const info_table = document.getElementById("info_table");
const calc_table = document.getElementById("calc_table");
const add_btn = document.getElementById("addBtn");
const ave_label = document.getElementById("ave_label");
const reset_btn = document.getElementById("resetBtn")
const clear_btn = document.getElementById("clearBtn")

// Inputs 

const input_sub = document.getElementById("subjectInput");
const input_units = document.getElementById("unitInput");
const input_grade = document.getElementById("gradeInput");


// Add buttons at runtime
function createDeleteButton() {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  // Optionally add styling:
  deleteButton.classList.add("delete-button");
  return deleteButton;
}


// ADD SUBJECT BTN
const errorMessage_sub = document.getElementById("sub-error")
const errorMessage_units = document.getElementById("units-error");
const errorMessage_grade = document.getElementById("grade-error");

function default_input_error_message() {
  errorMessage_sub.display= "none";
  errorMessage_grade.display= "none";
  errorMessage_units.display= "none";

  input_sub.classList.remove("error-input"); // Remove error class from input fields
  input_grade.classList.remove("error-input");
  input_units.classList.remove("error-input");

  errorMessage_sub.textContent = "";
  errorMessage_grade.textContent = "";
  errorMessage_units.textContent = "";
  
}

add_btn.onclick = function () {

  // console.log(`fuckk`)
  // Validate inputs
  let isValid = true;
  if (input_sub.value.trim() == "") {
    isValid = false;
    errorMessage_sub.textContent = "Please enter subject name";
    errorMessage_sub.style.display = "block";
    input_sub.classList.add("error-input");
  } 
  if (input_grade.value.trim() == "") {
    isValid = false;
    errorMessage_grade.textContent = "Please enter grade";
    errorMessage_grade.style.display = "block";
    input_grade.classList.add("error-input");
  } 
  if (input_units.value.trim() == "") {
    isValid = false;
    errorMessage_units.textContent = "Please enter units";
    errorMessage_units.style.display = "block";
    input_units.classList.add("error-input");
  }

  if (isValid) {
    // Submit the form or process data here
    
    default_input_error_message();
    // Create a new row (<tr>) element
    const newRow = info_table.insertRow();

    // Create cells (<td>) for the new row
    const subject = newRow.insertCell();
    const units = newRow.insertCell(); 
    const grade = newRow.insertCell();
    const action = newRow.insertCell();

    let grade_ = input_grade.value;
    let unit_ = input_units.value;

    newRow.dataset.grade = grade_;
    newRow.dataset.units = unit_;

    grade_list.push(Number(grade_))
    units_list.push(Number(unit_))

    // Set the content of the cells
    subject.innerHTML = input_sub.value;
    units.innerHTML = unit_;
    grade.innerHTML = grade_;

    const deleteButton = createDeleteButton();
    action.appendChild(deleteButton);

    // console.log(g)
    // Display Average
    let average = get_gwa()
    ave_label.textContent = "Average: " + average.toFixed(2) + "%";

    clear_btn.style.visibility = "visible";
  }

};

// Event delegation for row deletion:
info_table.addEventListener("click", function(event) {
  if (event.target.classList.contains("delete-button")) {
    const rowToDelete = event.target.parentNode.parentNode; // Get the <tr> element
    const grade = rowToDelete.dataset.grade;
    const units = rowToDelete.dataset.units;

    const gradeIndex = grade_list.indexOf(Number(grade));
    const unitsIndex = units_list.indexOf(Number(units));
    // console.log(gradeIndex);
    grade_list.splice(gradeIndex, 1);
    units_list.splice(unitsIndex, 1);

    // Recalculate and update average
    const newGwa = get_gwa();

    ave_label.textContent = "Average: " + newGwa.toFixed(2) + "%";
    
    rowToDelete.parentNode.removeChild(rowToDelete);

    if (grade_list.length === 0) {
      clear_btn.style.visibility = "hidden";
    }
  }
});



// RESET BTN

reset_btn.onclick = function () {
  input_sub.value = "";
  input_units.value = "";
  input_grade.value = "";
}

// Clear Table Btn

clear_btn.onclick = function () {
  const tBody = document.getElementById("info_table").tBodies[0];
  
  // Loop through the rows and remove them:
  while (tBody.rows.length - 1 > 0) {
    tBody.deleteRow(1);
  }

  ave_label.textContent = "Average: 0.00%";
  grade_list.splice(0, grade_list.length);
  units_list.splice(0, units_list.length);

  clear_btn.style.visibility = "hidden";

}



calc_table.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission

  let isValid = true;

  // Validate name input
  if (nameInput.value.trim() === "") {
    isValid = false;
    errorMessage.textContent = "Please enter your name";
    nameInput.classList.add("error-input");
  } else {
    // Additional validation for other fields (if applicable)
  }

  if (isValid) {
    // Submit the form or process data here
  }
});



