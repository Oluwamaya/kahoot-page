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
  var storageRef = firebase.storage().ref();
  const db = firebase.firestore();





let display = document.getElementById("display")
let just = document.getElementById("just")
let imgReader = document.getElementById("imgReader")
let none = document.getElementById("none")
let body = document.getElementById("body")






none.style.display = "none"
function edit(){
none.style.display = "block"

setTimeout(() => {
  none.style.display = "none "
}, 4000);
}

  
show()
function show(){
firebase.auth().onAuthStateChanged((user) => {
if (user) {
// User is signed in, see docs for a list of available properties
// https://firebase.google.com/docs/reference/js/v8/firebase.User
var uid = user.email;
display.innerHTML = uid

imgReader.src = user.photoURL 

}  else {
// User is signed out
alert("please login")
window.location.href= "login.html"
// ...
}
})
}
function reed(ev){
let file = ev.target.files[0]

// Create the file metadata
var metadata = {
contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
(snapshot) => {
// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
console.log('Upload is ' + progress + '% done');
switch (snapshot.state) {
  case firebase.storage.TaskState.PAUSED: // or 'paused'
    console.log('Upload is paused');
    break;
  case firebase.storage.TaskState.RUNNING: // or 'running'
    console.log('Upload is running');
    break;
}
}, 
(error) => {
// A full list of error codes is available at
// https://firebase.google.com/docs/storage/web/handle-errors
switch (error.code) {
  case 'storage/unauthorized':
    // User doesn't have permission to access the object
    break;
  case 'storage/canceled':
    // User canceled the upload
    break;

  // ...

  case 'storage/unknown':
    // Unknown error occurred, inspect error.serverResponse
    break;
}
}, 
() => {
// Upload completed successfully, now we can get the download URL
uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
  console.log('File available at', downloadURL);
  const user = firebase.auth().currentUser;
  user.updateProfile({
    photoURL : downloadURL
  }).then(()=>{
    imgReader.src = downloadURL
    alert("upload successful")
    none.style.display= "none"
  }).catch((error)=>{
    alert("something is wrong")
  })
});
}
);
}

 function press(){
  window.location.href = "quiz.html"
 }