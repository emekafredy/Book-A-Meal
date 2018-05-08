
const company = document.getElementById('company');

document.getElementById('getAccess').onclick = function () {
  const companyValue = company.value;
  if (!companyValue) {
    window.location.href = 'menu.html';
  } else {
    window.location.href = 'set-menu.html';
  }
};
