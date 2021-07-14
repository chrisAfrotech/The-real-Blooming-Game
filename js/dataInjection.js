function dashBoardInjection(player){
	resetDashBoard();
	let income = document.getElementById("income");
	let expense = document.getElementById("expense");
	let asset = document.getElementById("asset");
	let liabilities = document.getElementById("liabilities");
	let total_expense = document.getElementById("total_expense");
	let passive_income = document.getElementById("passive_income");
	let amount_table = document.getElementById("sum_up").querySelectorAll(".amount");
	let progress = document.getElementById("progress");
	let max = player.possession.length;
	let i;
	let cash=0, tot_i=0, tot_e=0;

	income.innerHTML +="<div class = \"flex-container col-12\"><div class=\"entry col-9\">"+player.possession[0].name+
	"</div><div class=\"amount entry col-3\">"+player.salary.cash_flow+"</div></div>";
	for(i=1;i<max;i++){
		/*if(player.possession[i].type == "salary"){continue;}*/
		if(player.possession[i] instanceof Asset){
			income.innerHTML +="<div class = \"flex-container col-12\"><div class=\"entry col-9\">"+player.possession[i].name+
			"</div><div class=\"amount entry col-3\">"+player.possession[i].cash_flow+"</div></div>";
			asset.innerHTML +="<div id=\""+i+"\" class = \"flex-container col-12\"><div class=\"entry col-9\">"+player.possession[i].name+
			"</div><div class=\"amount entry col-3\">"+player.possession[i].cost+"</div></div>";
			tot_i += player.possession[i].cash_flow; 
		}
		else{
			expense.innerHTML +="<div class = \"flex-container col-12\"><div class=\"entry col-9\">"+player.possession[i].name+
			"</div><div class=\"amount entry col-3\">"+player.possession[i].cash_flow+"</div></div>";
			liabilities.innerHTML +="<div id=\""+i+"\" class = \"flex-container col-12\"><div class=\"entry col-9\">"+player.possession[i].name+
			"</div><div class=\"amount entry col-3\">"+player.possession[i].to_pay+"</div></div>";
			tot_e += player.possession[i].cash_flow;
		}
		total_expense.innerHTML = tot_e;
		passive_income.innerHTML = tot_i;
		amount_table[0].innerHTML = player.cash;
		amount_table[1].innerHTML = tot_i+player.salary.cash_flow;
		amount_table[2].innerHTML = tot_e;
		amount_table[3].innerHTML = tot_e+tot_i+player.salary.cash_flow;
		progress.max = -tot_e;
		progress.value = tot_i;
	}
}
//----card injection as nikobellic baby!!!!---------------------------------------
function cardInjection(possession,view){
	let card_image = document.getElementById("card_image");
	let card_title = document.getElementById("card_title");
	let card_text = document.getElementById("card_text");
	let button0 = document.getElementById("card_button").querySelectorAll("button");
	let button1 = document.getElementById("card_footer").querySelectorAll("button");
	let cash_flow_button =document.getElementById("cash_flow_button");
	card_image.firstElementChild.src=possession.image;
	card_title.innerHTML = possession.name;
	if(view == "initial"){
		card_title.innerHTML = "ROLL DICE";
		card_text.innerHTML = "Before you start you turn, review you financial statement. You may also use this time to repay liabilities or repay money";
		button0[0].style.display = 'block';
		button0[1].style.display = 'block';
		button1[0].style.display = 'block';
		button1[1].style.display = 'none';
		button0[0].innerHTML = 'Repay';
		button0[1].innerHTML = 'Borrow';
		button1[0].innerHTML = 'ROLL DICE';
		cash_flow_button.style.display = 'none';
	}
	else if(view == "initial2"){
		card_title.innerHTML = "ROLL DICE";
		card_text.innerHTML = "Before you start you turn, review you financial statement. You may also use this time to repay liabilities or repay money";
		button0[0].style.display = 'block';
		button0[1].style.display = 'block';
		button1[0].style.display = 'block';
		button1[1].style.display = 'block';
		button0[0].innerHTML = 'Repay';
		button0[1].innerHTML = 'Borrow';
		button1[0].innerHTML = 'ROLL DICE';
		button1[1].innerHTML = 'ROLL 2 DICE';
		cash_flow_button.style.display = 'none';
	}
	else if(view == "congratulation"){
		card_title.innerHTML = "CONGRATULATION";
		card_text.innerHTML = "congratulation you won you got out of the rat race";
		button0[0].innerHTML = 'done';
		button0[1].style.display = 'none';
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}
	else if(view == "game_over"){
		card_title.innerHTML = "GAME OVER";
		card_text.innerHTML = "traped and died pathetically onto the rat race! What a random life";
		button0[0].innerHTML = 'done';
		button0[1].style.display = 'none';
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}	
	else if(view == "sale"){
		card_title.innerHTML = possession.name;
		card_text.innerHTML = "sale it at 1/2 of the downpay : "+possession.down_pay+" per month";
		button0[0].style.display = 'none';
		button0[1].style.display = 'none';
		button1[0].style.display = 'block';
		button1[0].innerHTML = 'SALE';
		button1[1].style.display = 'none';
	}	
	else if(view == "baby"){
		card_title.innerHTML = "NEW BABY";
		card_text.innerHTML = "you have landed on baby square so you have a new baby he will cost you : "+possession.cash_flow+" per month";
		button0[0].innerHTML = 'done';
		button0[1].style.display = 'none';
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}	
	else if(view == "baby_cant"){
		card_title.innerHTML = "NEW BABY";
		card_text.innerHTML = "you have already too much baby";
		button0[0].style.display = 'none';
		button0[1].innerHTML = 'done';
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}	
	else if(view == "downsized"){
		card_title.innerHTML = "DOWNSIZED!";
		card_text.innerHTML = "you have pathetically landed on downsized square so you lost 2 turn and pay the total amount of your expenses";
		button0[0].innerHTML = 'DONE';
		button0[1].style.display = 'none';
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}
	else if(view == "charity"){
		card_title.innerHTML = "CHARITY!";
		card_text.innerHTML = "Give 10% of your Total Income to Charity. and gain the possibility to use two dice on each of your three next turn";
		button0[0].innerHTML = 'ACCEPT';
		button0[1].innerHTML = 'PASS';
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}
	else if(view == 'repay'){
		card_title.innerHTML = "REPAY DEBTS";
		card_text.innerHTML = "Select an item to repay";
		button0[0].style.display = 'none';
		button0[1].innerHTML = "CANCEL";
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}
	else if(view == 'repay_can'){
		card_title.innerHTML = "REPAY DEBTS";
		card_text.innerHTML = "Select an item to repay<br><br>pay the whole debt of: "+possession.name+"<input hidden id=\"loan\" value = \"0\"/>";
		button0[0].style.display = 'block';
		button0[0].innerHTML = 'REPAY';
		button0[1].innerHTML = 'CANCEL';
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}
	else if(view == 'repay_canot'){
		card_title.innerHTML = "REPAY DEBTS";
		card_text.innerHTML = "Select an item to repay<br><br>NOT ENOUGH CASH TO PAY THE WHOLE DEBT OF: "+possession.name;
		button0[0].style.display = 'none';
		button0[1].innerHTML = 'CANCEL';
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}
	else if(view == 'repay_loan'){
		alert(current_player.cash);
		card_title.innerHTML = "REPAY DEBTS";
		card_text.innerHTML = card_text.innerHTML = "which amount would you wan to repay <br><br><div>Amount: <input id = \"loan\" min = \"-1\" max = \""+possession+"\" value = \"0\" type=\"number\"/></div>";
		button0[0].style.display = 'block';
		button0[0].innerHTML = 'REPAY';
		button0[1].innerHTML = 'CANCEL';
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}
	else if(view == 'paycheck_success'){
		card_title.innerHTML = "PAYDAY";
		card_text.innerHTML = "Chehk your dashboard cahflow paid! despite the negative cashflow";
		button0[0].style.display = 'none';
		button0[1].style.display = 'none';
		button1[0].style.display = 'block';
		button1[0].innerHTML = "OK";
		button1[1].style.display = 'none';
	}
	else if(view == 'paycheck_positive'){
		card_text.innerHTML = "your paycheck is availabe as it is the end of the month";
		button0[0].style.display = 'none';
		button0[1].style.display = 'none';
		button1[0].style.display = 'block';
		button1[0].innerHTML = "OK";
		button1[1].style.display = 'none';
	}
	else if(view == "paycheck_fail"){
		card_title.innerHTML = 'PAYDAY';
		card_text.innerHTML = "You don't have enough money try to sale some asset to pay your monthly cashflow!";
		button0[0].style.display = 'none'; //another complicated things are going to get done here!
		button0[1].style.display = 'none';
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}
	else if(view == "ending_turn"){
		card_image.firstElementChild.src="image source";
		card_title.innerHTML = "FINISH YOUR TURN";
		card_text.innerHTML = "Before you end you turn, review you financial statement. You may also use this time to repay liabilities or repay money";
		button0[0].innerHTML = "Repay";
		button0[1].innerHTML = "Borrow";
		button1[0].style.display = 'none';
		button1[1].innerHTML = "END";
	}	
	else if(view == "big_or_smal_deal"){
		card_image.firstElementChild.src="image source";
		card_title.innerHTML = "DEAL OPPORTUNITY";
		card_text.innerHTML = "Which deal type do you want small deal cost 5000 or less and big deal cost 6000 or more";
		button0[0].innerHTML = "SMALL";
		button0[1].innerHTML = "BIG";
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}	
	else if(view == "deal_not_enough"){
		let to_borrow = possession.toBorrow();
		card_image.firstElementChild.src="image source";
		card_title.innerHTML = "DEAL NOT ENOUGH";
		card_text.innerHTML = "You don't have enough money to enjoy this bid.<br><br>Would you want to borrow: "+to_borrow+
		"at"+to_borrow/10+" interest per month?";
		button0[0].innerHTML = "BORROW";
		button0[1].innerHTML = "CANCEL";
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}	
	else if(view == "doodad_not_enough"){
		let to_borrow = possession.toBorrow();
		card_image.firstElementChild.src="image source";
		card_title.innerHTML = possession.name;
		card_text.innerHTML = possession.description+" : "+possession.cost+"<br>You don't have enough money as you must pay doodad's bill borrowing is your unique choice.<br>amount: "+to_borrow+
		" at "+to_borrow/10+" interest per month";
		button0[0].innerHTML = "BORROW";
		button0[1].style.display = 'none';
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}	
	else if(view == "downsized_not_enough"){
		let to_borrow = possession.cost;
		card_image.firstElementChild.src="image source";
		card_title.innerHTML = possession.name;
		card_text.innerHTML = possession.description + "<br>You don't have enough money to pay your total expenses borrowing is your unique choice.<br>amount: "+to_borrow+
		" at "+to_borrow/10+" interest per month";
		button0[0].innerHTML = "BORROW";
		button0[1].style.display = 'none';
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}
	else if(view == "pay_loan" || view == "cant_pay_loan"){
		card_image.firstElementChild.src="image source";
		card_title.innerHTML = "PAY OFF LOAN";
		card_image.firstElementChild.src=possession.image;
		card_title.innerHTML = possession.name;
		card_text.innerHTML = "Loan amount "+possession.to_pay+"<br>pay of you loan";
		button0[0].innerHTML="PAY";
		button0[1].innerHTML = "CANCEL";
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
		if(view == "cant_pay_loan"){
			button0[0].style.display = 'none';
			card_text.innerHTML = "Loan amount "+possession.to_pay+"<br>You don't have enough cash to pay off this loan";
		}
	}
	else if(view == "loan"){
		card_image.firstElementChild.src="image source";
		card_title.innerHTML = "TAKE OUT A LOAN";
		card_text.innerHTML = "Loan must be in mutiple of 1000 at 10% interest per month<br><br><div>Amount: <input id = \"loan\" value = \"1000\" type=\"number\"/></div>";
		button0[0].innerHTML = "BORROW";
		button0[1].innerHTML = "CANCEL";
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}	
	else if(view == "market_dont_have"){
		card_image.firstElementChild.src=possession.image;
		card_title.innerHTML = possession.name;
		card_text.innerHTML = "Acceptez-vous une nouvelle"+possession.description+"<br> You have no assets that match this market card";
		button0[0].style.display = 'none';
		button0[1].innerHTML = "DONE";
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}
	else if(possession.type == "deal" || possession.type == "market"){
		card_image.firstElementChild.src=possession.image;
		card_title.innerHTML = possession.type;
		card_text.innerHTML = possession.name+"<br>Acceptez-vous une nouvelle"+possession.description+"<br>"+"cost: "+possession.cost+"<br>"+"cash flow: "+possession.cash_flow
		+"<br>"+"down pay"+possession.down_pay;
		button0[0].innerHTML = "BUY";
		button0[1].innerHTML = "PASS";
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
		if(possession.type == "market"){button0[0].innerHTML = "SALE";}

	}
	else if(possession.type == "doodad"){
		card_image.firstElementChild.src=possession.image;
		card_title.innerHTML = possession.name;
		card_text.innerHTML = "Achetez"+possession.description+" et cela vas vous coutez: "+possession.cost;
		button0[0].innerHTML = "ACCEPT";
		button0[1].style.display = 'none';
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
	}
}
function resetDashBoard(){
	document.getElementById("income").innerHTML = '<div class="title col-12">INCOME</div>';
	document.getElementById("expense").innerHTML = '<div class="title col-12">EXPENSES</div>';
	document.getElementById("asset").innerHTML = '<div class="title col-12">ASSETS</div>' ;
	document.getElementById("liabilities").innerHTML = '<div class="title col-12">LIABILITIES</div>';
}
function colorLiabilities(color){
	let liabilities = document.getElementById("liabilities").children,i, j=liabilities.length;
	for(i = 0; i<j;i++){
		liabilities[i].style.backgroundColor = color;
	}
}
function colorAsset(color){
	let asset = document.getElementById("asset").children,i, j=asset.length;
	for(i = 0; i<j;i++){
		asset[i].style.backgroundColor = color;
	}
}
/*
function cardContent(image,title,name,text,button00,button01,button10,button11){
		card_image.firstElementChild.src = image;
		card_title.innerHTML = name;
		card_text.innerHTML = text;
		button0[0].style.display = ';
		button0[1].innerHTML = "ACCEPT";
		button1[0].style.display = 'none';
		button1[1].style.display = 'none';
}*/