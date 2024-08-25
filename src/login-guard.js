const LOGIN_GUARD_REDIRECT_URL = "./login.html"

function addLoginGuard() {
  const isAlreadyOnLoginPage = window.location.href.includes("login.html");
  firebaseApp.auth().onAuthStateChanged((state) => {
    if (!isAlreadyOnLoginPage && state != null)
      window.location.href = LOGIN_GUARD_REDIRECT_URL;
  });
}

addLoginGuard();
