/*const Field = {
	RAT_RACE : 1,
	FAST_TRACK :2
};
Object.freeze(Field);*/
//-- pawnPosition class definition------
function PawnPosition(play_ground){
	this.play_ground = play_ground; //from the namespace field
	this.position = 9;
	this.number_of_dice =1; //an integer representing the case whe a player is 
	this.number_of_turn =1; //an integer representing the case whe a player is 
	this.dice =0; //it is the variable to save the number of the dice in case of chrity 
	//------
	this.move = function(){
		let x = Math.floor(Math.random() * 6)+1;
		//x=3;
		this.position +=x;
		this.play_ground.move((this.position),x); //--we could add a new
	}	
	this.move2Dice = function(){
		let x = Math.floor(Math.random() * 6)+1;
		this.dice = x;
		alert("1er"+x);
		let y = Math.floor(Math.random() * 6)+1;
		x += y;
		this.position +=x;
		alert("2er"+y);
		this.play_ground.move((this.position),x); //--we could add a new
	}
	this.moveRemaining = function(remaining){
		this.play_ground.move((this.position),remaining); //--we could add a new
	}
	this.charityMecanism = function(){
		if(this.number_of_dice >1){
			this.number_of_turn--;
			if(this.number_of_turn == 0){
				this.number_of_dice = 1;
				return false;
			}
		}
		return true;
	}
}