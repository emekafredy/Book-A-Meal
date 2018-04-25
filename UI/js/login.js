function openForm(evt, loginType) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("login-box");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(loginType).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

document.getElementById("customerLogin").onclick = function () {
  location.href = "../menu.html";
};

document.getElementById("catererLogin").onclick = function () {
  location.href = "set-menu.html";
};