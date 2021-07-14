// the class of possession asset, loan, liability;
function Possession(name,description,image,cost,cash_flow,down_pay,type,to_pay){
	this.name = name;
	this.description =description;
	this.image = image;
	this.cost = cost;
	//--- useful for system computation
	this.cash_flow = cash_flow;
	this.down_pay = down_pay;
	this.type = type;
	//-----------------------------------
	this.getCashFlow = function(){
		return this.cash_flow;
	}
	this.toBorrow = function(){
			let x=1000;
			while(x<this.down_pay){
				x +=1000;
			}
			return x;
		}

}
//--- classe enfant asset----------
function Asset(name,description,image,cost,cash_flow,down_pay,type){
	Possession.call(this,name,description,image,cost,cash_flow,down_pay,type);
}
//---------liability child declaration and definition------------
function Liability(name,description,image,cost,cash_flow,down_pay,type){
	Possession.call(this,name,description,image,cost,cash_flow,down_pay,type);
	this.to_pay = this.cost;
	this.canPayedBack = function(amount){
		 if(amount>this.cost){
		 	return true;
		 }
		 return false;
	}
	this.payedBack = function(){
		this.to_pay = 0.0;
	}
	this.toBorrow = function(){
		let x=1000;
		while(x<this.cost){
			x +=1000;
		}
		return x;
	}
}
//--- classe enfant asset----------
function Loan(amount){
	Liability.call(this,'loan','The amount of money borrowed from the bank','loan.jpg',amount,amount/10,0,'loan');
	//------ list of methods now
	this.payedBack = function(amount){
		this.to_pay -= amount;
		this.calculateCashFlow();
		return this.to_pay;
	}
	this.calculateCashFlow = function(){
		this.cash_flow = -this.to_pay*10/100;
	}
	this.borrow = function(amount){
		this.to_pay += amount;
		this.calculateCashFlow();
	}
}
