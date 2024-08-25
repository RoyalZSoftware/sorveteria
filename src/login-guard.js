const LOGIN_GUARD_REDIRECT_URL = "./login.html"

let user;

function addLoginGuard() {
  const isOnLoginPage = window.location.href.includes("login.html");
  firebaseApp.auth().onAuthStateChanged((user) => {
    if (user == null)
      window.location.href = LOGIN_GUARD_REDIRECT_URL;
    console.log(user.displayName);
  });
}

function loginWithGoogle() {

// Using a popup.
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
firebase.auth().signInWithPopup(provider).then(function(result) {
 // This gives you a Google Access Token.
 var token = result.credential.accessToken;
 // The signed-in user info.
 user = result.user;
});
}

