/***********************set numbre of players********************** */
let setplayers = document.getElementById("setplayers");
let nbrplayers = document.getElementById("nbrplayers").querySelectorAll("option");
let time_of_party = document.getElementById("time_of_party");
let nbr_baby = document.getElementById("nbr_baby");

nbrplayers[0].onclick = function(){
    setplayers.innerHTML = "<div class=\"logo_player\"></div><div class =\"name_player\"><form><input type=\"text\" placeholder=\"Enter your name\" required> </form></div><div class=\"color_player\"  id=\"color_p1\"><form><select name=\"color_party\" size=\"1\"><option>gold</option><option>blue</option></select></form></div>";
    }

nbrplayers[1].onclick = function(){
    setplayers.innerHTML = "<div class=\"logo_player\"></div><div class =\"name_player\"><form><input type=\"text\" placeholder=\"Enter your name\" required> </form></div><div class=\"color_player\" id=\"color_p1\"><form><select name=\"color_party\" size=\"1\"><option>gold</option><option>blue</option></select></form></div>";
    setplayers.innerHTML += "<div class=\"logo_player\"></div><div class =\"name_player\"><form><input type=\"text\" placeholder=\"Enter your name\" required> </form></div><div class=\"color_player\" id=\"color_p2\"><form><select name=\"color_party\" size=\"1\"><option>gold</option><option>blue</option></select></form></div>";
}

/*****************************Time of party**********************/
time_of_party.onclick=function(e){
  
   for(let i=0; i<this.children.length; i++)
   {
       if(e.target == this.children[i])
       {
        game_setup_time_party.innerHTML = "<div class=\"time_of_party\"><p><b>HAHA!! the party will take <span class=\"blue\">"+e.target.innerHTML +" <\span></b></p></div>"
       break;
        }
   }
}

/*****************************Number of babies****************** */
nbr_baby.onclick=function(e){
  
    for(let j=0; j<this.children.length; j++)
    {
        if(e.target == this.children[j])
        {
            game_setup_baby_party.innerHTML = "<div class=\"number_babies\"><p><b>And the number of baby(ies) have been Setup to <span class=\"blue\">"+ e.target.innerHTML +" <\span></b></p></div>"
        break;
         }
    }
 }



 let color_p1 = document.getElementById("color_p1").querySelectorAll("option");

 color_p1[0].onclick=function(){
    getElementsByClassName.logo_player.style.backgroundColor="red";
}