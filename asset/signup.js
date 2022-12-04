const $ = (selector) => document.querySelector(selector);

const localData = JSON.parse(localStorage.getItem('user') || '[]')

function saveData(id, firstName, lastName, email,   password) {
  let userList = [];
  const user = {
    id,
    firstName,
    lastName,
    email,
    password
  };

  userList.push(user);
  userList = userList.concat(localData);
    localStorage.setItem("user", JSON.stringify(userList));
window.location.href = '/index.html'
}


//add new record
$("#signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = $("#firstName").value;
  const lastName = $("#lastName").value;
  const email = $("#email").value;
  const password = $("#password").value;

      saveData(localData.length + 1, firstName, lastName, email, password)
   
});


