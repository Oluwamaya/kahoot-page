
  // Import the functions you need from the SDKs you need
  
  const firebaseConfig = {
    apiKey: "AIzaSyBIxDzSewXm5Fc6sfR0A_zgGnt36rJNpTg",
    authDomain: "kahoot-project-d09b7.firebaseapp.com",
    projectId: "kahoot-project-d09b7",
    storageBucket: "kahoot-project-d09b7.appspot.com",
    messagingSenderId: "650529307688",
    appId: "1:650529307688:web:5f5492c01db78912d9891d"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  let firstname = document.getElementById("firstname")
  let lastname = document.getElementById("lastname")
  let email = document.getElementById("email")
  let password = document.getElementById("password")
  let cpassword = document.getElementById("cpassword")

  function sub(ev){
   ev.preventDefault()
   

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
        var user = userCredential.user;
       
    //   const user = firebase.auth().currentUser;
    if (user) {
        alert("signup Successful ")
        firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
          alert("verification sent")
          // ...
        }); 
        window.location.href ="login.html"
    }

user.updateProfile({
  displayName: "lastname.value",
//   photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
  // Update successful
  // ...
}).catch((error) => {
  // An error occurred
  // ...
});  
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("error siging up")
    });

  }