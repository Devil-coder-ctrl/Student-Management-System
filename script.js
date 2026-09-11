let students = JSON.parse(localStorage.getItem("students")) || [];
let editingIndex = -1;

const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("searchInput");

function displayStudents(studentList = students) {
  tableBody.innerHTML = "";

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

    tableBody.appendChild(row);
  });

  updateDashboard();
}

function updateDashboard() {
  document.getElementById("totalStudents").textContent = students.length;

  if (students.length === 0) {
    document.getElementById("averageCGPA").textContent = "0.00";
  } else {
    const totalCGPA = students.reduce(
      (sum, student) => sum + Number(student.cgpa),
      0,
    );

    const average = totalCGPA / students.length;

    document.getElementById("averageCGPA").textContent = average.toFixed(2);
  }

  const departments = new Set(
    students.map((student) => student.department.toLowerCase()),
  );

  document.getElementById("totalDepartments").textContent = departments.size;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const student = {
    studentId: document.getElementById("studentId").value.trim(),
    name: document.getElementById("name").value.trim(),
    department: document.getElementById("department").value.trim(),
    semester: document.getElementById("semester").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    cgpa: document.getElementById("cgpa").value,
  };

  if (editingIndex === -1) {
    students.push(student);
  } else {
    students[editingIndex] = student;
    editingIndex = -1;
  }

  localStorage.setItem("students", JSON.stringify(students));

  form.reset();
  displayStudents();
});

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
  }
}

function editStudent(index) {
  const student = students[index];

  document.getElementById("studentId").value = student.studentId;
  document.getElementById("name").value = student.name;
  document.getElementById("department").value = student.department;
  document.getElementById("semester").value = student.semester;
  document.getElementById("phone").value = student.phone;
  document.getElementById("email").value = student.email;
  document.getElementById("cgpa").value = student.cgpa;

  editingIndex = index;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase();

  const filteredStudents = students.filter((student) =>
    Object.values(student).some((value) =>
      String(value).toLowerCase().includes(searchText),
    ),
  );

  displayStudents(filteredStudents);
});

displayStudents();
