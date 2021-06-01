// ==UserScript==
// @name         Random WWYD
// @namespace    Anon
// @icon         https://i.imgur.com/8WNWFvP.png
// @version      1.00
// @description  Press W to randomize some things for WWYD screenshots.
// @author       Anon
// @include      https://mahjongsoul.game.yo-star.com/
// @include      https://game.mahjongsoul.com/
// @include      https://majsoul.union-game.com/0/
// ==/UserScript==

(function()
{
    'use strict'
 
	// Random WWYD script
	// Just a simple script done to practice using javascript a language not used to using
	// for another project and get used to how mods work for majsoul plus.
	// Based on the Anonymizer script. No plans to update just a test.
 
	// KEY to use to trigger the script
    var KEY = 87; // "87 = W" "17 = ctrl"
    
	// change these to turn on and off random titles, heads, names and room names
	var is_random_title = true;
	var is_random_head = true;
	var is_random_room = true;
	var is_change_names = false;
	
	var top_name = "What";
	var left_name = "Would";
	var right_name = "You";
	var bottom_name = "Discard?";
	
	// list of different words to go in front of room name
	// make your own list using this website or similar
	// https://www.matthewb.id.au/csv/text-list-to-javascript-array.html
	var ran_title_list = ['Acerola','Apple','Apricot','Avocado','Banana','Blackberry','Blackcurrant','Blueberry','Cherry','Coconut','Crabapple','Cranberry','Currant','Date','Dragonfruit','Elderberry','Fig','Gooseberry','Grape','Raisin','Grapefruit','Guava','Honeyberry','Kiwi','Lemon','Lime','Mango','Melon','Watermelon','Mulberry','Nectarine','Orange','Clementine','Mandarine','Tangerine','Passionfruit','Peach','Pear','Plum','Prune','Pineapple','Raspberry','Redcurrant','Strawberry','Negromancy','Red','Orange','Yellow','Green','Blue','Cyan','Purple','White','Black','Brown','Magenta','Tan','Olive','Maroon','Navy','Teal','Indigo','Violet','Pink','Gray'];

	
	// event listener variable
	var ready = true;
    var down = false;
	
	// key down event
    document.addEventListener('keydown', function(e)
	{
        e = e || window.event;
        if ((e.keyCode == KEY || e.key == KEY) && ready && !down)
		{
            MakeItRandom();
        }
    }, true);

	// key up event
   document.addEventListener('keyup', function(e)
   {
        e = e || window.event;
        if ((e.keyCode == KEY || e.key == KEY) && ready)
		{
            down = false; // just flip the key ready for next down press
        }
    }, true);


    function MakeItRandom()
	{
		// This function:
		// - Sets players Names to a fixed set of four names
		// - Sets players Player to a random one view and voice (only from first 2 outfits)
		// - Sets players Title to a random one
		// - Sets Room Name to a random name from an array
		
		// function for getting the scene
		let uiscene = 0;
        function checkScene(scene){
            return scene && ((scene.Inst && scene.Inst._enable) || (scene._Inst && scene._Inst._enable))
        }

		var number_of_players = view.DesktopMgr.Inst.player_datas.length;

		// check what scene we are on
		// desktop info for the main playfield or log
        if (checkScene(uiscene=uiscript.UI_DesktopInfo))
		{
            // set a random room name
			if(is_random_room)
			{
				// "Bronze Room·4-Player South" string format
				// explode the room string
				var temp_room_name = uiscene.Inst.label_gamemode.text;
				var temp_room_name_array = temp_room_name.split(" ");
				if(temp_room_name_array.length==3)
				{
					// try and maintain the room type unless it is vs ai
					var room_name_end = "South";
					if(temp_room_name.includes("East"))room_name_end = "East";
					// get the random title
					var ran_title = ran_title_list[Math.floor(Math.random() * ran_title_list.length)];
					// build the final title string
					temp_room_name = ran_title + " " + temp_room_name_array[1] + " " + temp_room_name_array[2];
				}
				else {temp_room_name = "Bronze Room·4-Player South"} // something went wrong so just bronze room for default
													
				// set the room name
				uiscene.Inst.label_gamemode.text = temp_room_name;
			}

			// looping through each of the players
			for(var count=0;count<number_of_players;count++)
			{
				// set a random head
				if(is_random_head)
				{
					var char_num = (Math.floor(Math.random() * 45) + 1); // assumes 45 characterSet
					var outfit_num = (Math.floor(Math.random() * 2) + 1); // assumes just 2 outfits
					var avatar_id = 400000 + (char_num*100) + outfit_num;
					var char_id = 200000 + char_num;
					
					uiscene.Inst._player_infos[count].head.id = avatar_id; // extra and likely uneeded
					view.DesktopMgr.Inst.player_datas[count].avatar_id = avatar_id;
					view.DesktopMgr.Inst.player_datas[count].character.charid = char_id;
					view.DesktopMgr.Inst.player_datas[count].character.is_upgraded = 1;
					view.DesktopMgr.Inst.player_datas[count].character.level = 5;
					
				}
			} 
			// refresh the seats before set titles and names
			uiscene.Inst.refreshSeat();
			
			for(var count=0;count<number_of_players;count++)
			{
				
				// set a random title
				if(is_random_title)
				{	
					var ran_title = 600000; // starting number for titles
					var title_num = (Math.floor(Math.random() * 17) + 1); // assumes 17 titles
					ran_title += title_num; // random one of 17 titles
					uiscene.Inst._player_infos[count].title.id = ran_title; // set the title
				}
			}
			
			// changes the player names
			if(is_change_names && number_of_players==4)
			{
				uiscene.Inst._player_infos[2].name._childs[0]._tf.text = top_name; // top player
				uiscene.Inst._player_infos[3].name._childs[0]._tf.text = left_name; // left player
				uiscene.Inst._player_infos[1].name._childs[0]._tf.text = right_name; // right player
				uiscene.Inst._player_infos[0].name._childs[0]._tf.text = bottom_name; // bottom player
			}
                
        }
		// set key to be down to prevent reentry chance
        down = true;
    }

   

})();