document.getElementById("add-course").addEventListener("click", function () {
    const courseRow = document.createElement("div");
    courseRow.classList.add("input-row", "row", "special-input");
    courseRow.innerHTML = `
        <input
          class="col-4 course-name"
          type="text"
          placeholder="E.g English"
        />
        <input
          class="col-4 obtained-marks"
          type="number"
          placeholder="E.g 70"
          min="0"
        />
        <input
          class="col-3 credit-hours"
          type="number"
          placeholder="E.g 3"
          min="1"
        />
      `;
    document.getElementById("courses").appendChild(courseRow);
  });
  
  document.getElementById("clear-fields").addEventListener("click", function () {
    const coursesContainer = document.getElementById("courses");
  
    // Clear all dynamically added rows
    coursesContainer.innerHTML = ` <div class="row input-row">
                <label class="col-4" for="course-name">Course</label>
                <label class="col-4" for="obtained-marks">Marks</label>
                <label class="col-3" for="credit-hours">Credit</label>
              </div>
              `; // Remove all rows
  
    // Add back the initial three rows
    for (let i = 0; i < 3; i++) {
      const courseRow = document.createElement("div");
      courseRow.classList.add("input-row", "row", "special-input");
      courseRow.innerHTML = `
      <input
          class="col-4 course-name"
          type="text"
          placeholder="E.g English"
        />
        <input
          class="col-4 obtained-marks"
          type="number"
          placeholder="E.g 70"
          min="0"
        />
        <input
          class="col-3 credit-hours"
          type="number"
          placeholder="E.g 3"
          min="1"
        />
      `;
      coursesContainer.appendChild(courseRow);
    }
  
    // Reset the GPA result box
    document.getElementById("gpa-result").innerHTML =
      "Your Overall GPA is: 0.00";
  });
  
  document.getElementById("calculate-gpa").addEventListener("click", function () {
    const obtainedMarks = document.querySelectorAll(".obtained-marks");
    const creditHours = document.querySelectorAll(".credit-hours");
  
    let totalCreditHours = 0;
    let totalWeightedGPA = 0;
    let errors = [];
  
    obtainedMarks.forEach((markInput, index) => {
      const obtained = parseFloat(markInput.value);
      const credits = parseInt(creditHours[index].value);
  
      if (!markInput.value || !creditHours[index].value) {
        errors.push(`Row ${index + 1}: Fields cannot be empty.`);
        return;
      }
  
      if (isNaN(obtained) || isNaN(credits) || credits < 1 || obtained < 0) {
        errors.push(`Row ${index + 1}: Invalid marks or credit hours.`);
        return;
      }
  
      const totalMarks = credits * 20; // Calculate total marks based on credit hours
  
      if (obtained > totalMarks) {
        errors.push(
          `Row ${index + 1}: Marks (${obtained}) exceed the maximum allowed (${totalMarks}) for ${credits} credit hour(s).`
        );
        return;
      }
  
      const percentage = Math.ceil((obtained / totalMarks) * 100);
      const gpa = percentageToGPA(percentage);
      const qualityPoints = gpa * credits;
  
      totalCreditHours += credits;
      totalWeightedGPA += qualityPoints;
    });
  
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }
  
    const overallGPA = totalCreditHours
      ? (totalWeightedGPA / totalCreditHours).toFixed(2)
      : 0;
    document.getElementById(
      "gpa-result"
    ).innerHTML = `Your Overall GPA is: ${overallGPA}`;
  });
  
  function percentageToGPA(percentage) {
    if (percentage >= 85) return 4.0;
    if (percentage >= 80) return 3.75 + (percentage - 80) * 0.05;
    if (percentage >= 70) return 3.25 + (percentage - 70) * 0.05;
    if (percentage >= 65) return 3.0 + (percentage - 65) * 0.05;
    if (percentage >= 60) return 2.7 + (percentage - 60) * 0.06;
    if (percentage >= 50) return 2.0 + (percentage - 50) * 0.07;
    return 1.0 + (percentage - 40) * 0.1;
  }
  