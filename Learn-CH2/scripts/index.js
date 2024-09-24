//import json data from data/student.json
import studentsData from "../scripts/data/students.json" with {type : "json"};

//with commonjs
//const studentsData = requirel("../data/student.json")

const studentContent = document.getElementById ("student-content");

//helper variable
let studentContentHTML = "";
studentsData.map((student) => {
    //variable that will be show in student-content
    const studentContent = `
        <div class="col-md-3">
            <div class="card" style="width: 18rem">
              <div class="card-body">
                <h5 class="card-title">${student.name}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">
                  ${student.education.bachelor}
                </h6>
                <p class="card-text">
                  My name is ${student.name}, used to called ${student.nickName}. I am from ${student.address.city}, ${student.address.province}. And I am student of ${student.education.bachelor}.
                </p>
              </div>
            </div>
          </div>
          `;
          studentContentHTML += studentContent;
          console.log(studentContentHTML);
});

studentContent.innerHTML = "<h1>Loading...</h1>";

// Edit the html content in student-content
setTimeout(() => {
    // Ini akan dieksekusi setelah 3 detik
    studentContent.innerHTML = studentContentHTML;
  }, 3000);
  // End to show all students
  
  // Start to search the students
  const search = document.getElementById("search");
  
  search.addEventListener("change", (e) => {
    // Jika pencarian berubah, fungsi ini akan berjalan
    console.log(e.target.value);
    // TODO: search student by input
  });
  // End to search the students