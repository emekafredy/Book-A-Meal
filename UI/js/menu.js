function showDetails() {
  let modal = document.getElementById('detailsModal'); 

	modal.innerHTML =`<div class="card">
	              <div class="card-title">
                  <labe style="text-align:center; line-height: 55px;">Order</labe>
                </div>
                <div class="form-group">
                  <p>Cheese Cake, with Vanilla Ice-cream Topping - &#8358;2,400</p>
                  <img class="modalImg" src="https://www.millerandcarter.co.uk/content/dam/miller-and-carter/images/content/dn17/menusb/lunch-menu-sb.jpg.asset/1518800390691.jpg">
                  <p><b>Ingredients:</b> Made with Roast chicken, baby carrots, spring peas topped with grandma’s flakey pie crust.</p>
                  
                    <input type="submit" value="Add to order">
                </div>
	              <button class="close-btn" id="close">Close</button>
	              </div> `
	
	modal.style.display = "block";

	window.onclick = function(event) {
	  if (event.target == modal) {
	      modal.style.display = "none";
	  }
	} 


	let closeBtn = document.getElementById("close");
	closeBtn.onclick = function() {
    modal.style.display = "none";
	}
};

document.getElementById("submitBtn").onclick = function () {
    location.href = "menu.html";
};