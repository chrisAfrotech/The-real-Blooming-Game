		function createStateMachine(machineDefinition){
			const machine = {
				value : machineDefinition.initialState,
				transition(event){	
					const currentStateDefinition = machineDefinition[this.value];
					const destinationTransition = currentStateDefinition.transition[event];
					if(!destinationTransition){return "cette evènement ne permet pas cette transition";}
					this.value = destinationTransition.action(this.value);
				}
			}
			return machine;
		}
		const machine = createStateMachine({
			initialState: 'on_rat_race',
			on_rat_race:{
				transition : {
					button00 : {
						action(){
							console.log("repaying ongoing");
							cardInjection(object_selected,'repay');
							colorLiabilities('green');
							return 'repay';
						}
					},
					button01 : {
						action(){
							console.log("borrowing ongoing");
							cardInjection('','loan');
							return 'borrow';
						}
					},
					button10 : {
						action(){
							let target;
							let current_play_ground = current_player.position.play_ground;
							let initial_remaining = current_play_ground.dice_remaining;
							if(current_play_ground.dice_remaining >0){
								if(current_player.cash < 0){
								}
								else{
									current_player.moveRemaining(current_play_ground.dice_remaining);
									current_play_ground.dice = current_play_ground.dice_remaining;
									current_play_ground.dice_remaining = 0;
								}
								cardInjection('','initial');
							}
							else {
								if(button_pressed == 'b11'){// the moving of two dice instead
									current_player.move2Dice();
									alert("2 dice moving");
								}
								else{
									current_player.move();
								}
								if(current_play_ground.dice_remaining >0){ //that also mean the player crossed payday
									object_selected =-1;
									if(current_player.cash_flow >= 0){
										cash_flow_button.style.display = 'block';
										current_play_ground.dice_remaining = 0;
									}
									else{
										current_play_ground.current_card = current_play_ground.list_card[0];
										current_play_ground.dice -= current_play_ground.dice_remaining;
										object_selected = 0;
									}
								}
							}						
							console.log("rolling dice, displacement etc...");
							current_card = current_play_ground.current_card;
							console.log("the current card is" + current_card.name);
							switch (current_card.type) {
								case 'payday':
									console.log("checking of cashflow sign!!!");
									if(current_player.cash_flow < 0){
										current_player.payCashFlow();
										dashBoardInjection(current_player);
										if(current_player.is_bankrupt == true){
											target = 'paycheck_fail'; 
												cardInjection('','paycheck_fail');
											if(current_play_ground.dice_remaining >0){
											//--- bankrupt routine--------
												let number_asset = current_player.numberOfAsset();
												if(number_asset == 0){
													cardInjection('','game_over');
													target = 'game_over'; console.log("you losed the party");
												}
												else if(object_selected == 0){
													target = 'on_rat_race';
												}
												else{
													current_play_ground.dice = 0;
													current_player.salePossessionDown(object_selected);
													if(current_player.cash < 0){
														if((number_asset-1) == 0){
														cardInjection('','game_over');
														target == 'game_over'; console.log("you losed the party: "+(number_asset-1));
														}
														else{
															cardInjection('','paycheck_fail');console.log("sell but unsufficient "+(number_asset-1));
															target = 'on_rat_race';
														}
													}
													else{
														cardInjection('','paycheck_success');console.log("cash flow finaly paid ");
														target = 'on_rat_race';
													}
													dashBoardInjection(current_player); console.log("you had well landed on paycheck_fail!"+object_selected.name);
												}
											}
										}
										else {
											if(current_play_ground.dice_remaining >0){
												target = 'on_rat_race'; console.log("returning on ratrace dooner than: "+current_player.cash);
											}
											else{
												target = 'paycheck_success'; console.log("player not bankrupt cash: "+current_player.cash);
											}
											cardInjection(current_card,'paycheck_success');
										}
									}
									else{
										target = 'paycheck_success'; console.log('negative');
										cardInjection(current_card,'paycheck_positive');
										cash_flow_button.style.display = 'block';
									}
								break;
								case 'deal':
									console.log("on the deal square");
									cardInjection('','big_or_smal_deal');
									target = 'big_small';
								break;
								case 'doodad':
									if(current_card.cost > current_player.cash){
										target = 'deal_not_enough';
										cardInjection(current_card,'doodad_not_enough');console.log("landed on doodad square and not enough money");
									}
									else{
										target = 'get_possession'; console.log("landed on doodad square and enough money");
										cardInjection(current_card,'doodad');
									}
								break;
								case 'market':
									let have_poss = current_player.havePossession(current_card);
									if( have_poss == false){
										cardInjection(current_card,'market_dont_have');console.log("you don't have "+current_card.name);
									}
									else{
										current_card = have_poss;
										current_card.type = 'market';
										cardInjection(current_card,''); console.log("you have the card "+current_card.name);
									}
									target = 'get_possession';
								break;
								case 'downsized':
									let t = current_player.totalExpenses();
									if(t > current_player.cash){
											let x=1000;
										while(x<t){
											x +=1000;
											}
										current_card.cost = x;
										cardInjection(current_card,'downsized_not_enough');console.log("landed on downsized square and not enough money");
										target = 'downsized_not_enough';
									}
									else{
										cardInjection('','downsized'); console.log("landed on downsized square");
										target = 'get_possession';
									}
								break;
								case 'baby':
									if(current_player.baby_numb < MAX_BABY){
										cardInjection(current_card,'baby'); console.log("landed on baby square"+current_player.baby_numb);
									}
									else{cardInjection('','baby_cant'); console.log("landed on baby square but too much baby got");}
										target = 'get_possession';
								break;
								default : //mean charityMecanism
									cardInjection('','charity'); console.log("landed on charity square");
									target = 'charity';
							}
							//ratRaceMoving(current_player.position.play_ground.dice);
							if(initial_remaining == 0){// mean the pawn moving is finished yet
							next="";
							let die_numb = current_play_ground.dice+current_play_ground.dice_remaining;
									card.style.display = 'none';
							if(current_player.onCharity == true){
								if(button_pressed == 'b11'){
									button_pressed = 0;
									let d = current_player.position.dice-1;
									imgAnimation2(die[d].element,die[die_numb-d-2].element,die_numb,ratRaceMoving);
								}
								else{imgAnimation(die[die_numb-1].element,die_numb,ratRaceMoving);}
								current_player.charityMecanism();
								if(current_player.onCharity == true){next="2";}
							}
							else{imgAnimation(die[die_numb-1].element,die_numb,ratRaceMoving);}
							}
							return target;
						}
					},

				}
			},
			paycheck_success:{
				transition :{
					button10 : {
						action(){
							console.log("ok retour a l'etat innitial!");
							cardInjection('','initial'+next);
							return 'on_rat_race';
						}
					},
				}
			},
			paycheck_fail:{
				transition :{
					button10 : {
						action(){
							let target;
							let number_asset = current_player.numberOfAsset();
							if(number_asset == 0){
								cardInjection('','game_over');
								target = 'game_over'; console.log("you losed the party");
							}
							else{
								current_player.salePossessionDown(object_selected);
								if(current_player.cash < 0){
									if((number_asset-1) == 0){
										cardInjection('','game_over');
										target == 'game_over'; console.log("you losed the party: "+(number_asset-1));
									}
									else{
										cardInjection('','paycheck_fail');console.log("sell but unsufficient "+(number_asset-1));
										target = 'paycheck_fail';
									}
								}
								else{
									cardInjection('','initial'+next);console.log("cash flow finaly paid ");
									target = 'on_rat_race';
								}
								dashBoardInjection(current_player); console.log("you had well landed on paycheck_fail!"+object_selected.name);
							}
							return target;
						}
					}
				}
			},
			borrow:{
				transition :{
					button00 : {
						action(){
							console.log("borowing! succefull");
							current_player.getPossession( new Loan(parseInt(document.getElementById("loan").value)));
							dashBoardInjection(current_player);
							cardInjection('','initial'+next);
							return 'on_rat_race';
						},
					},
					button01 : {
						action(){
							console.log("cancelling of the borowing!");
							cardInjection('','initial'+next);
							return 'on_rat_race';
						},
					},
				}
			},
			repay:{
				transition :{
					button00 : {
						action(){
							console.log("repaying should be succefull");
							current_player.payBack(object_selected, parseInt(document.getElementById("loan").value));
							dashBoardInjection(current_player);
							cardInjection('','initial'+next);
							return 'on_rat_race';
						},
					},
					button01 : {
						action(){
							console.log("cancelling of the repaying");
							cardInjection('','initial'+next);
							colorLiabilities("transparent");
							return 'on_rat_race';
						},
					},
				}
			},
			big_small:{
				transition :{
					button00 : {
						action(){
							console.log("small deal chosen");
							cardInjection(current_card,'');
							return 'accept_deal';
						},
					},
					button01 : {
						action(){
							console.log("big deal chosen");
							cardInjection(current_card,'');
							return 'accept_deal';
						},
					},
				}
			},
			accept_deal:{
				transition :{
					button00 : {
						action(){
							console.log("deal accepted");
							if(current_card.down_pay > current_player.cash){
								cardInjection(current_card,'deal_not_enough'); console.log("you don't have enough money");
								return 'deal_not_enough';
							}
							current_player.getPossession(current_card); console.log("deal succefully done");
							cardInjection('','initial'+next);
							dashBoardInjection(current_player);
							return 'on_rat_race';
						},
					},
					button01 : {
						action(){
							console.log("deal denied");
							cardInjection('','initial'+next);
							return 'on_rat_race';
						},
					},
				}
			},
			deal_not_enough:{
				transition :{
					button00 : {
						action(){
							console.log("borrowing accepted");
							current_player.getPossession(current_card); console.log("borrowing done and deal conclude succefully");
							current_player.getPossession(new Loan(current_card.toBorrow()));
							cardInjection('','initial'+next);
							dashBoardInjection(current_player);
							return 'on_rat_race';
						},
					},
					button01 : {
						action(){
							console.log("deal denied again");
							cardInjection(current_card,''); console.log("getting back on deal agreement decision");
							return 'accept_deal';
						},
					},
				}
			},
			get_possession:{
				transition :{
					button00 : {
						action(){
							console.log("you have accepted this possession");
							current_player.getPossession(current_card); console.log("you have accepted this possessio: "+current_card.name);
							cardInjection('','initial'+next);
							dashBoardInjection(current_player);
							return 'on_rat_race';
						},
					},
					button01 : {
						action(){
							console.log("you have refused this possession");
							cardInjection('','initial'+next); console.log("so getting back on deal the initial rat...");
							return 'on_rat_race';
						},
					},
				}
			},
			downsized_not_enough:{
				transition :{
					button00 : {
						action(){
							current_player.getPossession(current_card); console.log("borrowing done and deal conclude succefully");
							current_player.getPossession(new Loan(current_card.cost));
							cardInjection('','initial'+next);
							dashBoardInjection(current_player);
							return 'on_rat_race';
						},
					},
				}
			},		
			charity:{
				transition :{
					button00 : {
						action(){
							next="2";
							console.log("you have accepted this possession");
							current_player.getPossession(current_card); console.log("you have accepted this possessio: "+current_card.name);
							cardInjection('','initial'+next);
							dashBoardInjection(current_player);
							return 'on_rat_race';
						},
					},
					button01 : {
						action(){
							console.log("you have refuse this possession");
							cardInjection('','initial'+next); console.log("so getting back on deal the initial rat...");
							return 'on_rat_race';
						},
					},
				}
			},
		}
		);