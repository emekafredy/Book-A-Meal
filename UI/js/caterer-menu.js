function addItem() {
  let modal = document.getElementById('editModal');

	modal.innerHTML =`<div class="card">
	              <div class="card-title">
                  <labe style="text-align:center; line-height: 55px;">Add New Item</labe>
                </div>
                <div class="form-group">
                  <form>
                    <label for="title">Title</label>
                    <input type="text" id="menuTitle" placeholder="Change title">

                    <label for="price">Price</label>
                    <input type="text" id="menuPrice" value="&#8358;">

                    <label for="country">Upload Image</label>
                    <input type="file" name="pic" accept="image/*">
                  
                    <input type="submit" value="Add">
                  </form>
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

document.getElementById("toOrders").onclick = function () {
  location.href = "order.html";
};