let userOption = document.getElementById('userOption');

document.getElementById("getAccess").onclick = function () {
	if (userOption.value === 'customer@mail.com') {
		location.href = "menu.html";
	} else if (userOption.value === 'caterer@mail.com') {
		location.href = "dashboard.html";
	} else {
    alert ('Please login with your registered email')
  }
};