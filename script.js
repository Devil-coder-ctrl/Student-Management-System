script.js;
// Student data
let students = JSON.parse(localStorage.getItem("students")) || [];

// Form and table elements
const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("searchInput");

// Display students
function displayStudents(studentList = students) {
  studentTableBody.innerHTML = "";

  if (studentList.length === 0) {
    studentTableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center;">
                    No students found
                </td>
            </tr>
        `;
    return;
  }

  studentList.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${student.studentId}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.semester}</td>
            <td>${student.phone}</td>
            <td>${student.email}</td>
            <td>${student.cgpa}</td>

            <td>
                <button class="edit-btn" onclick="editStudent(${index})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        `;

    studentTableBody.appendChild(row);
  });
}

// Add Student
studentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const student = {
    studentId: document.getElementById("studentId").value,
    name: document.getElementById("name").value,
    department: document.getElementById("department").value,
    semester: document.getElementById("semester").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    cgpa: document.getElementById("cgpa").value,
  };

  students.push(student);

  saveStudents();

  displayStudents();

  studentForm.reset();

  alert("Student added successfully!");
});

// Save students
function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Delete Student
function deleteStudent(index) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this student?",
  );

  if (confirmDelete) {
    students.splice(index, 1);

    saveStudents();

    displayStudents();

    alert("Student deleted successfully!");
  }
}

// Edit Student
function editStudent(index) {
  const student = students[index];

  document.getElementById("studentId").value = student.studentId;
  document.getElementById("name").value = student.name;
  document.getElementById("department").value = student.department;
  document.getElementById("semester").value = student.semester;
  document.getElementById("phone").value = student.phone;
  document.getElementById("email").value = student.email;
  document.getElementById("cgpa").value = student.cgpa;

  students.splice(index, 1);

  saveStudents();

  displayStudents();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Search Student
searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase();

  const filteredStudents = students.filter((student) => {
    return (
      student.studentId.toLowerCase().includes(searchText) ||
      student.name.toLowerCase().includes(searchText) ||
      student.department.toLowerCase().includes(searchText) ||
      student.semester.toLowerCase().includes(searchText) ||
      student.phone.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.cgpa.toLowerCase().includes(searchText)
    );
  });

  displayStudents(filteredStudents);
});

// Display students when page loads
displayStudents();
