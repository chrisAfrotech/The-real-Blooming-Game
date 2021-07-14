function PlayGround(name,square_list,list_card){
	this.name = name;
	this.square_list =square_list;
	this.list_card = list_card;
	this.dice;
	this.signal="none";
	this.current_card;
	this.dice_remaining = 0; // if all the move is not perform this number willbe greater than 0;
	this.move = function(position,dice_number){
		this.dice = dice_number;
		let i, j,k=0, list = [];
		let p = position - dice_number+1;
		for(i=p;i<=position;i++){
			if(this.square_list[i%24] == 'payday'){
				this.signal = "payday";
				j=-1;
				this.dice_remaining = position-i;
			}
		}
			j = this.list_card.length;
			position %=24; 
		for(i=0;i<j;i++){
				if(this.list_card[i].type == this.square_list[position]){
					list.push(this.list_card[i]);
					k++;
				}
			}
			let x = Math.floor(Math.random() * (k-1));
			this.current_card= list[x];
		}
}
	var square_rat = [
		"market",
		"deal",
		"doodad",
		"deal",
		"baby",
		"deal",
		//------------------------
		"payday",
		"deal",
		"market",
		"deal",
		"doodad",
		"deal",
		//----------------------------------------------
		"charity",
		"deal",
		"payday",
		"deal",
		"market",
		"deal",
		//-------------------------------------------
		"doodad",
		"deal",
		"downsized",
		"deal",
		"payday",
		"deal"
];