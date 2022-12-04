if (!localStorage.getItem('logged-in')) {
  window.location.href = '/index.html'
}

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const localData = JSON.parse(localStorage.getItem('user') || '[]')

// Dark Mode
const toggle = document.getElementById("toggleDark");
const body = $("body");

toggle.addEventListener("click", function () {
  this.classList.toggle("bi-moon");
  if (this.classList.toggle("bi-brightness-high-fill")) {
    body.style.backgroundColor = "#fff";
    body.style.color = "#000";
    body.style.transition = "2s";
  } else {
    body.style.backgroundColor = "#000";
    body.style.color = "#fff";
    body.style.transition = "2s";
  }
});

function logout() {
  localStorage.removeItem('logged-in')
  window.location.reload()
}


function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = $(".container");
  const main = $(".main");
  container.insertBefore(div, main);
  setTimeout(() => $(".alert").remove(), 3000);
}

//clear all fields
function clearFields() {
  $("#firstName").value = "";
  $("#lastName").value = "";
  $("#email").value = "";
}


function saveData(id, firstName, lastName, email) {
  let userList = [];
  const user = {
    id,
    firstName,
    lastName,
    email
  };

  userList.push(user);
  userList = userList.concat(localData);
  localStorage.setItem("user", JSON.stringify(userList));
}


//add new record
$("#student-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = $("#firstName").value;
  const lastName = $("#lastName").value;
  const email = $("#email").value;

  //validation
  if (firstName == "" || lastName == "" || email == "") {
    showAlert("Please fill all fields", "danger");
  } else {
      const list = $("#student-list");
      const row = document.createElement("tr");

      row.innerHTML = `
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${email}</td>
      <td>
      <button type="button" class="btn btn-warning btn-sm edit" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editRow(this)" data-id=${localData.length + 1 }>Edit</button>
      <button type="button" class="btn btn-danger btn-sm delete"  data-bs-target="#exampleModal" onclick="deleteRow(this)" data-id=${localData.length + 1 }>Delete</button>
      `;
      list.appendChild(row); 
      showAlert("Student added successfully", "success");
      saveData(localData.length + 1, firstName, lastName, email)
      clearFields();
  }
});

// check local storage
function checkLocal() {
  if (localData.length) {
    const user = localData
    const list = $("#student-list");

    user.map(a => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${a.firstName}</td>
      <td>${a.lastName}</td>
      <td>${a.email}</td>
      <td>
      <button type="button" class="btn btn-warning btn-sm edit" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editRow(this)"  data-id="${a.id}">Edit</button>
      <button type="button" class="btn btn-danger btn-sm delete" data-bs-target="#exampleModal" onclick="deleteRow(this)" data-id=${a.id }>Delete</button>
      `;
      list.appendChild(row);
    })
  }
}

function editRow(target) {
  const data = localData.filter(a => a.id == target.getAttribute('data-id'))
  $('.submitModal').setAttribute("data-id", data[0].id);
  $("#firstNameModal").value = data[0].firstName;
  $("#lastNameModal").value = data[0].lastName;
  $("#emailModal").value = data[0].email;
}

function submitEdit(target) {
  const id = target.getAttribute('data-id')
  const ObjInex = localData.findIndex((obj => obj.id == id));

  localData[ObjInex].firstName = $("#firstNameModal").value;
  localData[ObjInex].lastName =  $("#lastNameModal").value;
  localData[ObjInex].email =  $("#emailModal").value;

  localStorage.setItem("user", JSON.stringify(localData));
  window.location.reload();

  
}

function deleteRow(target) {
  let user = localData
  const id = target.getAttribute("data-id")
  user = user.filter(a => a.id != id);
  localStorage.setItem("user", JSON.stringify(user));
  window.location.reload();
}


checkLocal()