
let userOption = document.getElementById('userOption');

document.getElementById("getAccess").onclick = function () {
	if (userOption.value == 'customer') {
		location.href = "menu.html";
		// console.log('NOT WORKING');
	} else {
		location.href = "dashboard.html";
	}
};