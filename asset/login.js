const $ = (selector) => document.querySelector(selector);

const localData = JSON.parse(localStorage.getItem('user') || '[]')

function checkData( email, password) {

    localData.map(user => {
        console.log(user);
        if (user.email == email && user.password == password) {
            window.location.href = '/contact.html'
            localStorage.setItem('logged-in', true);
     }
 })
}


//add new record
$("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = $("#email").value;
  const password = $("#password").value;

 checkData(email, password)
   
});


