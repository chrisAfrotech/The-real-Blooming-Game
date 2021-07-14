// the fucking player class
function Player(name,age,job,dream,cash,salary_,possession, play_ground){
	this.name=name;
	this.age = age;
	this.job = job;
	this.dream = dream;
	this.cash = cash;
	this.cash_flow = salary_;
	this.salary = new Asset("salary","the money earn from "+this.job,"",0,salary_,0,"salary");
	this.possession=[]; this.possession.push(this.salary);this.possession.push(new Loan(0.0));
	this.position = new PawnPosition(play_ground);
	this.editor_card = []; //an array of string wich contains statements saying player actions
	// list of method now!
	this.is_bankrupt = false;
	this.onCharity = false;
	this.baby_numb =0;
	this.move = function(){
		this.position.move();
	}
	this.move2Dice = function(){
		this.position.move2Dice();
	}
	this.moveRemaining = function(remaining){
		this.position.moveRemaining(remaining);
	}
	this.charityMecanism = function(){
		this.onCharity = this.position.charityMecanism();
	}
	this.getPossession = function(possession_){ //possession_ has to type possession
		switch(possession_.type){ 
		case "doodad":
			this.cash += possession_.cost;
		break;
		case 'loan':
			this.possession[1].borrow(possession_.cost);
			this.cash += possession_.cost;
			this.cash_flow -=possession_.cost*1/10;
		break;
		case 'market':
			this.salePossession(possession_); alert("saling");
		break;
		case 'downsized':
			this.cash += this.totalExpenses();
		break;
		case 'charity':
			this.onCharity = true;
			this.position.number_of_dice =2;
			this.position.number_of_turn =3;
			this.cash -= this.totalIncome()/10;
		break;
		case 'baby':
			this.possession.push(possession_);
			this.baby_numb++;
			this.cash_flow += possession_.cash_flow;
		break;
		default: //in the deal case
		this.possession.push(possession_);
		this.cash -= possession_.down_pay;
		this.cash_flow += possession_.cash_flow;
		}
	}
	this.payCashFlow = function(){
		this.cash += this.cash_flow;
		if(this.cash<0){
			this.is_bankrupt = true;
		}
		else {this.is_bankrupt = false;}
	}
	this.letPossession = function(possession_){
		let i=0, newPossession=[], p_i = this.possession.length;
		for(i=0;i<p_i; i++){
			if(this.possession[i]!=possession_){
				newPossession.push(this.possession[i]);
			}
			else{
				this.cash_flow -= possession_.cash_flow;
			}
		}
		this.possession = newPossession;
	}
	this.salePossession = function(possession_){
		this.letPossession(possession_);
		this.cash +=possession_.cost;
	}
	this.salePossessionDown = function(possession_){
		this.letPossession(possession_);
		this.cash +=possession_.down_pay;
	}
	this.canPayBack = function(liability){
		return liability.canPayedBack(this.cash);
	}
	this.payBack = function(liability, amount){ // or loan
		liability.payedBack(amount);
		if(liability.type!=loan){
		this.cash -= liability.cost;
		this.letPossession(liability);	
		}
		else{
		this.cash -= amount;}
	}
	this.havePossession = function(asset){
		let i=0, p_i = this.possession.length;
		for(i=0;i<p_i; i++){
			if(this.possession[i].name == asset.name){
				return this.possession[i];
			}
		}
		return false;
	}
	this.totalExpenses = function(){
		let i; max = this.possession.length, tot_exp=0;
		for(i=0;i<max;i++){
			if(!(this.possession[i] instanceof Asset)){
				tot_exp += this.possession[i].cash_flow 
			}
		}
		return tot_exp;
	}
	this.totalIncome = function(){
		let i; max = this.possession.length, tot_in=0;
		for(i=0;i<max;i++){
			if(this.possession[i].cash_flow > 0){
				tot_in += this.possession[i].cash_flow 
			}
		}
		return tot_in;
	}
	this.isPlayerWon = function(){
		if((this.totalIncome()-this.salary)>this.totalExpenses()){
			return true;
		}
		return false;
	}
	this.numberOfAsset = function(){
		let i; max = this.possession.length, number=0;
		for(i=1;i<max;i++){
			if(this.possession[i] instanceof Asset){
				number++;
			}
		}
		return number;
	}
	this.changePosition = function(){
	}
}	