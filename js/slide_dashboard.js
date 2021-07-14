		try {
			var content = document.getElementById("content");
			var dash_button = document.getElementById("dash_button");
			var dashboard = document.getElementById("dashboard");
			var displayed = false;
			dash_button.onclick = function() {
				if(displayed == false) {
					dashboard.style.top = "5%";
					displayed =true;
				}
				else {
					dashboard.style.top = "-93%";
					displayed= false;
				}
			}
			content.onclick = function() {
				if(displayed == true) {
					dashboard.style.top = "-93%";
					displayed= false;
				}
			}
		}
		catch(error){
			alert("l'erreur est : "+error);
		}
