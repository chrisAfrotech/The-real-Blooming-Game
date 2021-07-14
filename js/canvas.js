try {
		var canvas=document.querySelector("canvas");
		var field = document.getElementById("field");
		var pion = document.getElementById("pion");
		var context = canvas.getContext('2d');
		canvas.style.width ="62%";
		context.save();
		context.drawImage(field,0,0);
		//---
		var w,x,y,z;
		var fdirection = 40;
		var rdirection = 0;
		function fastTrackMoving(dice,j){
			//--setting of parameter when fastRack is toggle
			if(fdirection == 40){
				context.setTransform(1,0,0,1,0,0);
				x = 0; y = 0;
				rdirection = 0;
			}
				while(j<dice){
				if(fdirection <=6){
					translateFluide(0,-90);
					y-=90;
				}
				else if(fdirection == 7){
					translateFluide(105,-10);/*+45*+35*/
					x+=105; y-=10;
				}
				else if(fdirection <= 18) {
					translateFluide(98,0);
					x+=98;
				}
				else if(fdirection==19){
					translateFluide(3,110);
					x+=3; y+=110;
				}
				else if(fdirection <=26){
					translateFluide(0,90);
					y+=90;
				}
				else if(fdirection == 27){
					translateFluide(-100,0);
					x-=100;
				}
				else if(fdirection <=38){
					translateFluide(-97,0);
					x-=97;
				}
				else{
					translateFluide(-19,-100);
					context.translate(-x,-y);
					context.translate(10+19,650+100);
					x=10; y=650;
							fdirection =-1;
				}
					j++;
					fdirection++;
						}					
			}
		function translateFluide(x,y){
			var j=0, k=0,signex=1,signey=1;
			if(x<0){signex=-1; x=-x;}
			if(y<0){signey=-1; y=-y;}
			var i=window.setInterval(function(){
				if(j<x){
					context.translate(signex,0);
					j++;
				}
				if(k<y){
					context.translate(0,signey);
					k++;
				}
				context.save();
				context.setTransform(1,0,0,1,0,0);
				context.drawImage(field,0,0);
				context.restore();
				context.drawImage(pion,10,20);
				if(j==x && k==y){
					clearInterval(i);
				}
				},1);
			}
			var poso =9;
		function ratRaceMoving(dice){
			//--setting of parameter when ratRace is toggle
			if(dice == 0){return;}
			if(rdirection == 0){
				context.setTransform(1,0,0,1,0,0);
				context.translate(644,420.5);
				w=7.5+8*15;
				z=w;
				x = 260*Math.cos((z)*Math.PI/180);
				y = 260*Math.sin((z)*Math.PI/180);
				context.translate(x-25,y-25);
				context.drawImage(pion,0,0);
				rdirection =1;
				fdirection = 40;
			}
		//--- ratRace moving mecanism--------------------------
		z=w; let t=w;
		let i = window.setInterval(function(){
				context.save();
				context.setTransform(1,0,0,1,0,0);
				context.drawImage(field,0,0);
				context.restore();
				z++;
				context.translate(-x,-y);
				x =260*Math.cos((z)*Math.PI/180);
				y = 260*Math.sin((z)*Math.PI/180);
				context.translate(x,y);
				context.drawImage(pion,0,0);
				if(z == t+15){
					if(poso>=23){poso=-1;}
					poso++; t+=15;
				}
				if(z == w+dice*15){
					w+=dice*15;
					card.style.display = 'block';
					clearInterval(i);
				}
			},20);
		}
		//------ image animation---------------
		function tabOfTab(){
			this.element = [];
		}
		function init_die(){
				let j=80;
				let img =[];
				let i = 0,k=0;
				//initialisation
				for(k=0;k<6;k++){
					img[k] = new tabOfTab();
				}
				for(k=0;k<6;k++){
					for(j=80,i=0;j<=190;i++,j++){
						img[k].element.push(document.createElement("img"));
						if(j<100){
							img[k].element[i].src = "image/"+(k+1)+"/00"+j+".png";
						}
						else{img[k].element[i].src = "image/"+(k+1)+"/0"+j+".png";}
					}
				}
				return img;
			}
		function imgAnimation(img,dice,callback){	
				context.save();
				context.setTransform(1,0,0,1,0,0);
				let j;
				j=0;
				function f(){setTimeout(function(){
					context.drawImage(field,0,0);
					context.restore();
					context.drawImage(pion,0,0);
					context.save();
					context.setTransform(1,0,0,1,0,0);
					context.drawImage(img[j],100,100,900,900);
					console.log("image normaly displayed "+j);
					j++;
					if(j>110){
						context.restore();
						callback(dice);
						j = 0;
					}
					else{f();}
				}, 1000/24);
			}
			f();
		}
		function imgAnimation2(img1,img2,dice,callback){	
				context.save();
				context.setTransform(1,0,0,1,0,0);
				let j;
				j=0;
				function f(){setTimeout(function(){
					context.drawImage(field,0,0);
					context.restore();
					context.drawImage(pion,0,0);
					context.save();
					context.setTransform(1,0,0,1,0,0);
					context.drawImage(img1[j],100,100,900,900);
					context.drawImage(img2[j],200,-100,900,900);
					console.log("image normaly displayed "+j);
					j++;
					if(j>110){
						context.restore();
						callback(dice);
						j = 0;
					}
					else{f();}
				}, 1000/24);
			}
			f();
		}
		function a(dice){
			let i=0;
				let j=setInterval(function(){
					console.log(i);
					i++;
					if(i==5){
						clearInterval(j);
						ratRaceMoving(dice);
					}
				}, 300);		
			}
		}		
		catch(error){
			alert("l'erreur est : "+error);
		}