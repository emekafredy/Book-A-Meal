
let company = document.getElementById('company');

document.getElementById("getAccess").onclick = function () {
	let companyValue = company.value;
	console.log(companyValue)
	if (!companyValue) {
		location.href = "menu.html";
		// console.log('NOT WORKING');
	} else {
		// console.log(companyValue);
		location.href = "set-menu.html";
	}
  
};