 /**** Multi API *****/
/** @license
 *
 * The Multi API 1: JavaScript API for JS game
 * ----------------------------------------------
 * http://www.gamorlive.com/
 *
 * Copyright (c) 2012, Pascal Boudier. All rights reserved.
 * Code provided under the BSD License:
 * 
 *
 * V0.1.20121214
 */
var pseudo;
var iduser;
var session;
var jsgame;
var annulSearch=0;

//event data
var idvent;
var nameevent;
var longitude;
var latitude;
var descEvent;
var nameteam1;
var nameteam2;
var team1score;
var team2score;
var scopourc;
var splitsco1;
var splitsco2;

function subid(x,nameG) {
    pseudo = x;
    jsgame = nameG;
    iduser = Math.floor((Math.random()*1000000000000)+1);
    initAPI();
}

function resubid() {    
    var searchN = document.getElementById('searchN');
    var powere = document.getElementById('powere');
    var waiTing = document.getElementById('waiTing');    
    var waiT = document.getElementById('waiT');
    var sartG = document.getElementById('sartG');
    var loader = document.getElementById("loader");
    loader.style.display="block";
    waiTing.style.marginTop= "10px";
    sartG.style.marginTop= "10px";
    waiT.style.marginTop= "10px";
    powere.style.marginTop= "30px";
    searchN.style.display="none";
    iduser = Math.floor((Math.random()*1000000000000)+1);
    initAPI();
}

function Golstart(y) {
    jsgame = y;
    var x = document.getElementById("pseudo").value;
    if(x =='' ||x == null) {
	alert('Please, choose an username');
	return false;
    }
    else {
        subid();
    }
}

var calcScore = function(){
    $.ajaxSetup ({
		url: "http://gamorlive.com/unumity/connect.php",
		type: "POST",
		});
    $.ajax ({
                data: 'teamscore=1&idvent='+idvent,
                success: function (html) { 
			    recuScoreT(html);
                        },
                error: function() {
                            alert ('error');
                        },
    })
}
function recuScoreT(x){
    var tmp = x.split('~');
    scopourc = tmp[0];
    scoteam1 = tmp[1];
    scoteam2 = tmp[2];
    var nbrt1 = (scoteam1).length;
    var nbrt2 = (scoteam2).length;
    if (nbrt1 == 1) {
	scoteam1 = '0000'+scoteam1;
    } else if (nbrt1 == 2) {
	scoteam1 = '000'+scoteam1;
    } else if (nbrt1 == 3) {
	scoteam1 = '00'+scoteam1;
    } else if (nbrt1 == 4) {
	scoteam1 = '0'+scoteam1;
    }
    if (nbrt2 == 1) {
	scoteam2 = '0000'+scoteam2;
    } else if (nbrt2 == 2) {
	scoteam2 = '000'+scoteam2;
    } else if (nbrt2 == 3) {
	scoteam2 = '00'+scoteam2;
    } else if (nbrt2 == 4) {
	scoteam2 = '0'+scoteam2;
    }
    splitsco1 = scoteam1.split("");
    splitsco2 = scoteam2.split("");
    if (splitsco1[1]== undefined) {
	splitsco1[1]=0;
    }
    if (splitsco1[2]== undefined) {
	splitsco1[2]=0;
    }
    if (splitsco1[3]== undefined) {
	splitsco1[3]=0;
    }
    if (splitsco1[4]== undefined) {
	splitsco1[4]=0;
    }
    
    if (splitsco2[1]== undefined) {
	splitsco2[1]=0;
    }
    if (splitsco2[2]== undefined) {
	splitsco2[2]=0;
    }
    if (splitsco2[3]== undefined) {
	splitsco2[3]=0;
    }
    if (splitsco2[4]== undefined) {
	splitsco2[4]=0;
    }
    
    if(stateG == 2 || stateG == 3){	
	setTimeout(function(){calcScore()},5000);
    }  
}
function initAPI() {
    //waitOppon=0;
    $.ajaxSetup ({
		url: "http://gamorlive.com/unumity/connect.php",
		type: "POST",
		});
    $.ajax ({
                data: 'pseudo='+pseudo+'&iduser='+iduser+'&game=1&team='+myteamselect,
                success: function (html) { 
                            var tmep = html.split('~');
                            waiT(html);			    
                        },
                error: function() {
                            alert ('error');
                        },
            })
}
function waiT(x) {
    var tmp = x.split('~');
    //si on récupère 300 alors on passe en attente sinon on refait un ID
    if (tmp[0] == 300) {
	console.log('return wait ok');
        //alert ('Session: '+tmp[1]+' On passe en attente d\'un adversaire');
        session =  tmp[1];
        setTimeout(function() {searchOp()},500);
    }
    //si on est pret à lancer la partie d'un opponent
    else if (tmp[0] == 400){
        session = tmp[1];
        //alert ('On a trouvé un adversaire avec une session: '+session);
        setTimeout(function() {searchOp()},500);    
    } else {
        //on recré un id et ton relance la requete
        iduser = Math.floor((Math.random()*1000000000000)+1);
        initAPI();
        //alert ('ca plante');
    }
}
        
//fonction recherche opponent
function searchOp() {
    if (annulSearch == 0) {
    $.ajaxSetup ({
                    url: "http://gamorlive.com/unumity/session.php",
                    type: "POST",
	    	});
    $.ajax ({
                    data: 'session='+session+'&iduser='+iduser+'&team='+myteamselect,
                    success: function (html) {                            
                                waiTing(html);
                            },
                    error: function() {
                                alert ('error');
                           },
            })
    } else {
	annulSearch = 0;
    }
}        
function waiTing(x) {
        var tmp = x.split('~');
        //si on récupère 200 donc on trouve un opponent et alors on passe en attente du ready, sinon on continue d'attendre
        if (tmp[0] == 200) {                
            foundoppo = 1;
            setTimeout(function() {
		    foundoppo = 2;
		    gotoP = 1;
		},1000);
        } else {
            //sinon on attend
            setTimeout(function() {searchOp()},500);
        }    
}
//fin de la fonction recherche opponent
        
        
//fonction apres avoir mis en relation tout le monde
function rezop() {
    foundoppo = 0;
}

var ix = 0;        
function reaDy() {
    if (ix >= 20) {
        ix = 0;
        $.ajaxSetup ({
                	url: "http://gamorlive.com/unumity/ready.php",
                	type: "POST",
                    });
        $.ajax ({
                    data: 'session='+session+'&iduser='+iduser+'&fail=1',
                    success: function (html) {     ;
                                //alert (adversaire repond pas ix, on reset tout...');
				sessionreset();
                                iduser = Math.floor((Math.random()*1000000000000)+1);					
                                initAPI();
				setTimeout(function() {rezop();waitOppon=0;},1000);
                            },
                    error: function() {
                                alert ('error');
                            },
                })                
    } else {
        ix++
        $.ajaxSetup ({
                	url: "http://gamorlive.com/unumity/ready.php",
                	type: "POST",
                    });
        $.ajax ({
                    data: 'session='+session+'&iduser='+iduser,
                    success: function (html) {                            
                                waiTI(html);
                            },
                    error: function() {
                                 //alert ('error');
                            },
                })
    }
}
        
function waiTI(x) {
    var tmp = x.split('~');
    //si on récupère 600 alors on lance le jeu car l'adversaire repond
    if (tmp[0] == 600) {
        foundoppo = 2;
	gotoP = 1;
	waitOppon=2;
    }
    //si l'adversaire repond pas on renvoie 700 et on attend encore (10s max)
    else if (tmp[0] == 700){
        setTimeout (function() {reaDy()}, 500);
                
    } else if (tmp[0] == 800){
	//session HS, on refait tout...
	ix = 0;
	sessionreset();
        iduser = Math.floor((Math.random()*1000000000000)+1);					
        initAPI();
	setTimeout(function() {rezop();waitOppon=0;},1000);             
    }
}		

//get url parameter
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function ReseT(x) {
    $.ajaxSetup ({
		url: "http://gamorlive.com/unumity/endgame.php",
		type: "POST",
		});
    $.ajax ({
                data: 'session='+session+'&iduser='+iduser,
                success: function (html) {                            
                            html
			    session = null;			    
			    boxuse(x);
                        },
                error: function() {
                            alert ('error');
                        },
            });    
}

function boxuse(x) {
    var wrapper= document.createElement('div');
    var Ylose = document.getElementById('Ylose');
    wrapper.setAttribute("id", "final");
    var topFinal = window.innerHeight - 131+('px');
    
    wrapper.innerHTML=  '<p id="welc">Welcome!</p>'+
			'<div id="entpseu">'+
			'<p style="font-family: \'OutageRegular\', sans-serif;">Enter an username please...</p>'+
			'<input type="text" name="pseudo" id="pseudo" value=""  style="width:160px; height:29px"/>'+
			'<div class="subchat" onclick="Golstart('+x+')"/>Play</div>'+
			'</div>'+
			'<div id="waiTing">'+
			'<p>Waiting for an opponent</p>'+
			'</div>'+
			'<div id="waiT">We founded an oppopent !</div>'+
			'<div id="sartG">The Game will start</div>'+
			'<div id="perd">Opponent offline</div>'+
			'<div id="searchN" style="display:none"></div>'+
			'<div id="powere">'+
			'<img id="loader" src="css/loader.gif" style="display:none"/>'+
			'<table id="tabl"><tr><td>Powered by </td><td><a href="http://www.gamorlive.com"><img src="powergol.png"/></a></td></tr></table>'+
			'</div>';				
    document.body.appendChild(wrapper);
    document.getElementById('final').style.top = window.innerHeight - 120+('px');
    var entpseu = document.getElementById('entpseu');
			    var welc = document.getElementById('welc');
			    welc.style.display="none";
			    entpseu.style.display="none";
    var searchN= document.getElementById('searchN');
    searchN.style.display="block";
    searchN.innerHTML=  pseudo+' Search a new opponent?'+
			'<div class="subchat" style="margin:0.3em;" onclick="resubid()">Let\'s go</div>'+
			'</div>';
    var loader = document.getElementById("loader");
    loader.style.display="none";
}

//function restart
function APIstart(x) {
        jsgame = x;
	window.scrollTo(0, 1);
	var BoDy = document.getElementById("BoDy");
	BoDy.style.height = window.innerHeight+'px';
	var Rsession = GetURLParameter('session');
    var Riduser = GetURLParameter('iduser');
    var Rpseudo = GetURLParameter('pseudo');
	var Reset = GetURLParameter('reset');
	var EndGame = GetURLParameter('endgame');
    if (Rsession != undefined && Riduser != undefined && Rpseudo != undefined && Reset == undefined) {
        session = Rsession;
        iduser = Riduser;
        pseudo = Rpseudo;
        gameAPI.initialise();
        gameAPI.playerName(displayPlayerName);
        gameAPI.listen(getResponse);
        jsgame();
    } else if (Reset != undefined && Rpseudo != undefined && Rsession != undefined) {
	    pseudo = Rpseudo;
	    session = Rsession;
	    ReseT(x);	    
	} else {
	    var wrapper= document.createElement('div');
	    var Ylose = document.getElementById('Ylose');
	    wrapper.setAttribute("id", "final");
	    wrapper.innerHTML=  '<p id="welc">Welcome!</p>'+
				'<div id="entpseu">'+
				'<p style="font-family: \'OutageRegular\', sans-serif;">Enter an username please...</p>'+
				'<input type="text" name="pseudo" id="pseudo" value=""  style="width:160px; height:29px"/>'+
				'<div class="subchat" onclick="Golstart('+x+')"/>Play</div>'+'</div>'+
				'<div id="waiTing">'+
				'<p>Waiting for an opponent</p>'+
				'</div>'+
				'<div id="waiT">We founded an oppopent !</div>'+
				'<div id="sartG">The Game will start</div>'+
				'<div id="perd">Opponent offline</div>'+
				'<div id="searchN" style="display:none"></div>'+
				'<div id="powere">'+
				'<img id="loader" src="css/loader.gif" style="display:none"/>'+
				'<table id="tabl"><tr><td>Powered by </td><td><a href="http://www.gamorlive.com"><img src="powergol.png"/></a></td></tr></table>'+
				'</div>';				
	    document.body.appendChild(wrapper);
	    document.getElementById('final').style.top = window.innerHeight - 120+('px');
	}
}
function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}
var rezendiop;
var backfgame=0;
function searchEvent() {
    var Rpseudo = GetURLParameter('pseudo');
    rezendiop = GetURLParameter('rezendiop');
    if(Rpseudo!=undefined){
	fullback.style.display = "none";
	if(rezendiop!=undefined){
	    backfgame=1;
	} else {
	    backfgame=0;
	}
    } else {
	fullback.style.display = "block";
    };
    sizeBackG();
    var now = new Date();
    var strDateTime = [
		       [	now.getFullYear(),
				AddZero(now.getMonth() + 1),
				AddZero(now.getDate())
			].join("/"),
		       [
			    AddZero(now.getHours()),
			    AddZero(now.getMinutes())
			].join(":"),].join(" ");
    $.ajaxSetup ({
		url: "http://www.gamorlive.com/unumity/endgame.php",
		type: "POST",
		});
    $.ajax ({
                data: 'searchevent='+strDateTime,
                success: function (html) {
			    openEvent(html);
                        },
                error: function() {
                            //alert ('error');
                        },
            });    
}
function openEvent(x){
    var tmp = x.split('~');
    var Rpseudo = GetURLParameter('pseudo');
    var Rmyteamselect = GetURLParameter('Rmyteamselect');
    if(Rpseudo != undefined){
	pguest = Rpseudo;
	myteamselect = Rmyteamselect;
	if (tmp[0] == 1) {
	    idvent = tmp[1];
	    nameevent = tmp[2];
	    longitude = tmp[3];
	    latitude = tmp[4];
	    descEvent = tmp[5];
	    nameteam1 = tmp[6];
	    nameteam2 = tmp[7];
	    team1score = tmp[8];
	    team2score = tmp[9];
	    eventStart = 11;
	} else {
	    eventStart = 10;
	}
    } else {
	//si on récupère 1 alors un event est en cours
	if (tmp[0] == 1) {
	    idvent = tmp[1];
	    nameevent = tmp[2];
	    longitude = tmp[3];
	    latitude = tmp[4];
	    descEvent = tmp[5];
	    nameteam1 = tmp[6];
	    nameteam2 = tmp[7];
	    team1score = tmp[8];
	    team2score = tmp[9];
	    eventStart = 1;
	} else {
	    eventStart = 0;
	}
    }
    checkMyvent();
}
function dbscore(result) {
    $.ajaxSetup ({
		url: "http://gamorlive.com/unumity/endgame.php",
		type: "POST",
		});
    $.ajax ({
                data: 'session='+session+'&iduser='+iduser+'&team='+myteamselect+'&result='+result+'&idvent='+idvent,
                success: function (html) {                            
			    //window.location = 'index.html?reset=1&pseudo='+pseudo+'&session='+session;
                        },
                error: function() {
                            //alert ('error');
                        },
            });    
}

function sessionreset() {
    waitOppon=3;
    $.ajaxSetup ({
		url: "http://gamorlive.com/unumity/endgame.php",
		type: "POST",
		});
    $.ajax ({
                data: 'sessionreset='+session+'&iduser='+iduser,
                success: function (html) {                            
			    //window.location = 'index.html?reset=1&pseudo='+pseudo+'&session='+session;
                        },
                error: function() {
                            //alert ('error');
                        },
            });    
}