/* 
Created by: Kenrick Beckett

Name: Chat Engine
*/

var instanse = false;
var state;
var mes;
var file;
var newC = 0;

function reZet() {
    newC = 0;
    $.ajaxSetup ({
		url: "http://gamorlive.com/multiapi/endgame.php",
		type: "POST",
		});
    $.ajax ({
                data: 'session='+session+'&iduser='+iduser,
                success: function (html) {                            
			    window.location = 'index.html?reset=1&pseudo='+pseudo+'&session='+session;
                        },
                error: function() {
                            alert ('error');
                        },
            });    
}
function rePlay() {
    window.location = 'index.html?iduser='+iduser+'&session='+session+'&pseudo='+pseudo;
}

function chatinit() {   
    if (newC >= 1) {
	//setTimeout(function() {newC = 0},20000);
    } else {
	newC++;
	console.log('chat lance');
	var canvas = document.getElementById('canvas');
	canvas.style.visibility = "hidden";
	var wrapper= document.createElement('div');
	wrapper.setAttribute("id", "chatDiv");
	wrapper.innerHTML= '<div id="page-wrap">'+    
			'<table style="width:100%"><tr>'+
			'<td><div class="butchat leftbut" onclick="rePlay()">Replay</div></td>'+
			'<td><h4 id="col">Chat</h4></td>'+
			'<td><div class="butchat rightbut" onclick="reZet()">Home</div></td>'+
			'</tr></table>'+
    			'<p id="name-area"></p>'+        
    			'<div id="chat-wrap"><div id="chat-area" style="text-align:left; color:black; text-shadow:none"></div></div>'+        
    			'<form id="send-message-area" onsubmit="onProfileSubmit(event);">'+
    			'<table style="width:100%"><tr><td><input type="text" id="sendie" style="color:black;text-shadow:none" onclick="vaLueoff()"></textarea>'+	    
    			'</form></td>'+
    			'<td style="width:100px"><div style="margin-bottom:2px"><input type="button" class="subchat" onclick="Chargement()" value="Submit"></div></td>'+
			'</tr></table>'+
    			'</div>';
	document.body.appendChild(wrapper);
	vaLue();
	heightP();
	chat.update()
    }
}
function vaLue() {
    var val = document.getElementById('sendie');
    val.value ="Your message here...";
}
function vaLueoff() {
    var val = document.getElementById('sendie');
    val.value ="";
}
function heightP() {
    var page = document.getElementById('page-wrap');
    page.style.height = window.innerHeight - 20 +'px';
}

function onProfileSubmit(e){    
    Chargement();
    e.preventDefault();
};

function Chargement() {
    var text = $("#sendie").val()
    chat.send(text, name, session);	
    $("#sendie").val("");  			        
}
$("#input").keydown(function (e) {
	alert(e.which);
});
// ask user for name with popup prompt    

// default name is 'Guest'
if (!name || name === ' ' || name === undefined) {
	var name = "Guest";	
} else {
    var name = pseudo;    	
};

// strip tags
name = name.replace(/(<([^>]+)>)/ig,"");
    	
// display name on page
$("#name-area").html("You are: <span>" + name + "</span>");
    	
// kick off chat
var chat =  new Chat();
$(function() {    	
    	chat.getState();     		 
    	// watch textarea for key presses
        $("#sendie").keydown(function(event) {  
		var key = event.which;  
		//all keys including return.  
		if (key >= 33) {   
			var maxLength = $(this).attr("maxlength");  
			var length = this.value.length;  
			// don't allow new content if length is maxed out
			if (length >= maxLength) {  
				event.preventDefault();  
			}  
		}
	});
	// watch textarea for release of key press
	$('#sendie').keyup(function(e) {						 
		if (e.keyCode == 13) { 
			var text = $(this).val();
			var maxLength = $(this).attr("maxlength");  
			var length = text.length; 
			// send 
			if (length <= maxLength + 1) {                      
				chat.send(text, name, session);	
				$(this).val("");
			} else {                    
				$(this).val(text.substring(0, maxLength));
			}		
		}
	});            
});


function Chat () {
    this.update = updateChat;
    this.send = sendChat;
    this.getState = getStateOfChat;
}

//gets the state of the chat
function getStateOfChat(){
	if(!instanse){
		instanse = true;
		$.ajax({
			   type: "POST",
			   url: "http://www.gamorlive.com/multiapi/process.php",
			   data: {  
			   	    'function': 'getState',
				    'file': file,
				    'session': session
						},
			   dataType: "json",			
			   success: function(data){
					state = data.state;
					instanse = false;
				    },
		});
	}	 
}

//Updates the chat
function updateChat(){
    if(!instanse){
	instanse = true;
	chat.getState();
	$.ajax({
	       type: "POST",
	       url: "http://www.gamorlive.com/multiapi/process.php",
	       data: {  
			'function': 'update',
			'session': session,
			'state': state,
			'file': file			
		      },
	       dataType: "json",
	       success: function(data){
			   if(data.text){
				for (var i = 0; i < data.text.length; i++) {
		                    $('#chat-area').append($("<p>"+ data.text[i] +"</p>"));
		                }								  
			   }
			   document.getElementById('chat-area').scrollTop = document.getElementById('chat-area').scrollHeight;
			   instanse = false;
			   state = data.state;
			   },
	});
	setInterval('chat.update()', 2000)
    } else {    
	setTimeout(updateChat, 2000);
    }
}

//send the message
function sendChat(message, nickname, session)
{       
    updateChat();
     $.ajax({
	    type: "POST",
	    url: "http://www.gamorlive.com/multiapi/process.php",
	    data: {  
	            'function': 'send',
		    'message': message,
		    'session': session,
		    'nickname': nickname,
		    'file': file
		    
		    },
	    dataType: "json",
	    success: function(data){
		          updateChat();
		     },
    });
}
