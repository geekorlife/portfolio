var op = 0;
var xr = -121;
var timert;

function rid(){
  var ride = document.getElementById('rid');
  ride.style.backgroundPosition="center "+xr+"px";
  if (xr > -569 && xr < -121) {
    clearTimeout(timert);
  }
  if (xr <= -569) {
    xr= -569;
    ride.style.display="none";
  } else {
    xr = xr - 4;
    timert=setTimeout(function() {rid()},20);
  };  
}
function clrid(){
  var ride = document.getElementById('rid');
  ride.style.display="block";
  ride.style.backgroundPosition="center "+xr+"px";
  if (xr > -569 && xr < -121) {
    clearTimeout(timert);
  }
  if (xr >= -121) {
    xr= -121;
  } else {
    xr = xr + 4;
    timert=setTimeout(function() {clrid()},20);
  };  
}
function Target(xX) {
	$('#'+xX).show('fast', function() {
		var div = document.getElementById(xX);
	});
}
function distarg (xX) {
	var div = document.getElementById(xX);
	div.style.display= "block";
	div.style.width = "600px";
	div.style.marginLeft= "auto";
	div.style.marginRight= "auto";
	div.style.background = "rgba(255,255,255,0.9)";
	div.style.paddingTop = "5px";
	div.style.paddingBottom = "5px";
	div.style.paddingLeft= "5px";
	if (op >= 1) {
		op = 0;
	} else {		
		div.style.opacity = op;
		op += 0.1;
		setTimeout(function() {distarg(xX)},20);
	}
}
function unTarget(xX) {
	op = 0;
	$('#'+xX).hide()
	var div = document.getElementById(xX);
	div.style.display= "none";
}
function detectOrid(){
  var p = $('#moreinf');
  var position = p.position();
  if(position.top==0){
    rid();
  } else {
    console.log(position.top);
    setTimeout(detectOrid,200);
  }
}
$(document).ready(function () {
  $('#cberret').click(function(){
    berret();
  });
  $('#cunberret').click(function(){
    unberret();
  });
  $('#cberretm').click(function(){
    berret();
  });
  $('#cunberretm').click(function(){
    unberret();
  });
  $('#dishirg').click(function(){
    display();
  });
  $('#corid').click(function(){
    rid();
  });
  $('.opnrid').click(function(){
    detectOrid();
  });
  $('#clrid').click(function(){
    clrid();
  });
  $('#valemail').click(function(){
    isValidEmail();
  });
  $('#hidtmsg').click(function(){
    undisplay();
  });
  $('.unberretother').click(function(){
    unberretother();
  });
  $('.dispmsg').click(function(){
    display();
  });
  $('.sha').mouseover(function(){
    Target('sha');
  });
  $('.gold').mouseover(function(){
    Target('gold');
  });
  $('.pers').mouseover(function(){
    Target('pers');
  });
  $('.ast').mouseover(function(){
    Target('ast');
  });
  $('.game').mouseover(function(){
    Target('game');
  });
  $('.blog').mouseover(function(){
    Target('blog');
  });
  $('.golm').mouseover(function(){
    Target('golm');
  });
  $('.flash').mouseover(function(){
    Target('flash');
  });
  $('.resum').mouseover(function(){
    Target('resum');
  });
  $('.sha').mouseout(function(){
    unTarget('sha');
  });
  $('.gold').mouseout(function(){
    unTarget('gold');
  });
  $('.pers').mouseout(function(){
    unTarget('pers');
  });
  $('.ast').mouseout(function(){
    unTarget('ast');
  });
  $('.game').mouseout(function(){
    unTarget('game');
  });
  $('.blog').mouseout(function(){
    unTarget('blog');
  });
  $('.golm').mouseout(function(){
    unTarget('golm');
  });
  $('.flash').mouseout(function(){
    unTarget('flash');
  });
  $('.resum').mouseout(function(){
    unTarget('resum');
  });
  $('#affarro').mouseover(function(){
    affarr();
  });
  $('#affarro').mouseout(function(){
    daffarr();
  });
});
function berret() {
  var ber = document.getElementById('berret');
  var moi = document.getElementById('moi');
  moi.style.opacity= "1";
  ber.style.display="block";
  var foot1 = document.getElementById('foot1');
  var foot2 = document.getElementById('foot2');
  foot1.style.background="none";
  foot2.style.background="rgba(255,255,255,0.5)";
  foot2.style.borderTop = "4px solid balck";
}
function unberret() {
  var ber = document.getElementById('berret');
  var moi = document.getElementById('moi');
  moi.style.opacity= "0";
  ber.style.display="none";
  var foot1 = document.getElementById('foot1');
  var foot2 = document.getElementById('foot2');
  foot1.style.background="url('../../img/footertop.png') no-repeat center";
  foot1.style.backgroundSize="cover";
  foot2.style.background="url('../../img/footer.png') no-repeat center";
  foot2.style.backgroundSize="cover";
  foot2.style.borderTop = "3px solid #222";
}
function unberretother() {
  var ber = document.getElementById('berret');
  var moi = document.getElementById('moi');
  moi.style.opacity= "1";
  ber.style.display="none";
  var foot1 = document.getElementById('foot1');
  var foot2 = document.getElementById('foot2');
  foot1.style.background="none";
  foot2.style.background="rgba(255,255,255,0.5)";
}
function display() {
	var dis = document.getElementById('contact');
	dis.style.display= "block";
	dis.style.height = window.innerHeight + "px";
	dis.style.width = "100%";
	dis.style.position = "fixed";
	dis.style.top = "0px";
}
function undisplay() {
	var dis = document.getElementById('contact');
	dis.style.display= "none";
}
function isValidEmail(){
	var validRegExp = /^[^@]+@[^@]+.[a-z]{2,}$/i;
	var strEmail = document.getElementById('mail').value;
    if (strEmail.search(validRegExp) == -1) {
		alert('A valid e-mail address is required.\nPlease amend and retry');
    } else {
		sendMail();
	}
}
function sendMail() {
	 var mail = document.getElementById('mail').value;
	 var msg = document.getElementById('msg').value;
    $.ajaxSetup ({
		url: "mail.php",
		type: "POST",
		});
    $.ajax ({
                data: 'mail='+mail+'&msg='+encodeURIComponent(msg),
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
		var wait = document.getElementById('msgwait');
		var ok = document.getElementById('msgok');
		wait.style.display = "none";
		msgok.style.display = "block";
    } else {
        alert ('error');
    }
}
function affarr(){
    var arrid = document.getElementById('arrid');
    arrid.style.width = "290px";
    arrid.style.left = "50%";
    console.log('display');
};
function daffarr(){
    var arrid = document.getElementById('arrid');
    arrid.style.width = "0px";
    arrid.style.left = "60%";
    console.log('hide');
};
(function(){
console.log(""+
 "                                       .'"+                                           
 "                                      .+@`\n"+                                          
 "                                   `.#@@@#,`\n"+                                        
 "                                  #'@@@@@@@:.\n"+                                      
 "                                  :@@@@@@@@@@,`\n"+                                    
 "                                 ':@@@@@@@@@@@#`\n"+                                   
 "                               `+@@@@@@@@@@@@@@#.\n"+                                  
 "                               :@@@@@@@@@@@@@@@@@+:.\n"+                               
 "                             `'@@@@@@@@@@@@@@@@@@@@@'\n"+                              
 "                            .@@@@@#;,;;,,,,#@.``:@@@@;`\n"+                            
 "                           .@@@@'.          `    `#@@@@`\n"+                           
 "                          `#@@@.                  `'@@@,\n"+                           
 "                          :@@@.                     ;@@@`\n"+                          
 "                         `@@@,                      `@@@;\n"+                          
 "                         :@@@`                       .@@@`\n"+                         
 "                         @@@,                         '@@:\n"+                         
 "                        .@@+                          .@@#\n"+                         
 "                        ,@@,                           #@@`\n"+                        
 "                        ;@@.                           '@@,\n"+                        
 "                        +@@.                           '@@:\n"+                        
 "                        #@@.                           .@@'\n"+                        
 "                        @@@.                           `@@+ \n"+                       
 "                        @@@.                           `@@#\n"+                        
 "                        #@@`   ````           ``````   `@@#\n"+                        
 "                        #@@` ,#@@@@@#:      .+@@@@@@.  `@@+\n"+                        
 "                        '@@` ##;:+@@@@:    .@@@@@+::`  `@@'\n"+                        
 "                        :@@`  `'@@@#'+@`   `,,;@@@@+`  `@@:\n"+                        
 "                      .',@@   #@@@@@@:@,   .+:@@@@@@;   @@++,\n"+                      
 "                      #@,@#  `@@;@@+:@@:   `,@:@@@:@@`  '@;:@\n"+                      
 "                      @@@#'   .;+'@. .,`    `.``#@@..   :@``@`\n"+                     
 "                      +:`#'     ,;.  `'         ..`     :@`.@`\n"+                     
 "                      .' @;           `                 ,@`:'\n"+                      
 "                         @;                             .@,@.\n"+                      
 "                        +:.                             `+''\n"+                       
 "                        ++                               ,@`\n"+                       
 "                        .@`           .`  ..             +.\n"+                        
 "                         `           .@@,;@@`                \n"+                      
 "                          ``        `@,';.:.+           `    \n"+                      
 "                          .@`        `                 .@    \n"+                      
 "                          `#,                          ..     \n"+                     
 "                           :+                         .+     \n"+                      
 "                           `@`         `````          :+     \n"+                      
 "                            #,     '##@@@@@@#++.      :`      \n"+                     
 "                            :,     ,';:,,,,:;+'.     `'        \n"+                   
 "                            ..                       .#`         \n"+                  
 "                           .@@`           ;+         :@#:.        \n"+                 
 "                          .@@@;                      ;@@@@.        \n"+               
 "                          #@@@@`                   `.;@@@@@         \n"+             
 "                         ,@@@@@.                   +;;@@@@@.         \n"+           
 "                        `@@@;@@;+`                ;@`:@@@@@:           \n"+         
 "                        ,@@:;@@,@#.             `'@` ,@@@@@+             \n"+       
 "                        @@#.@@+ .@@:`         `:@'`  .@@#@@@.              \n"+     
 "                       ,@@.:@@.  `'@@;.```..,'@#,    .@@'@@@@;`              \n"+ 
 "                       #@@`#@,     .'@@@@@@@@;.      .@@,@@@@@@'.              \n"+
 "                     .'@@'.@@.       `.:;'#+.        .@@.#@@@@@@@#,`             \n"+ 
 "                  `,#@@@@`.@@,                       .@@`:@@@@@@@@@@'.            \n"+
 "                `,@@@@@@' `@@:                       :@@`,@@@@;,;@@@@@@;.          \n"+
 "              `:@@@@@@@@. `@@;                       #@+ :@@@@`  `;@@@@@@#:.       \n"+
 "            .;@@@@@#@@@@`  +@'                      .@@, :@@@'     `.;@@@@@@@;.    \n"+
 "         `:#@@@@@+.,@@@@   ;@#                      ;@@`  ;;#`        `,;@@@@@@#`  \n"+
 "       .'@@@@@@+,  ,@@@'   ,@@`                     #@;                  `:#@@@@#` \n"+
 "     `;@@@@@+.`    ,@@@,   .@@.                    ,@@.                     `,#@@, \n"+
 "    `+@@@@+,       .@@@,   `@@+                   ,@@@`                       ,@@# \n"+
 "   .+@@#.`         `@@@#    ,@@;`                .@@#.                        ,@@@,\n"+
 "  ;@@@;`            :@:`     '@@@,              .@@@.                          ;@@@\n"+
 " ,@@@:               `       `'@@@:            `@@@,                            '@@\n"+
 " @@@.                          :@@@.           +@@,                             `.`\n"+
 ".@@@`                           ,@@+`         ;@@:                                 \n"+
 ";@@,                             :@@@.       ,@@@`                                 \n"+
 "`@@                              `@@@@.     `@@@.                                  \n"+
 "+@@                               `:@@@.    +@@,                                   \n"+
 "@@                                  ,@@#`  ,@@;                                    \n"+
 "@@                                   :@@' `@@#`                                    \n"+
 ".                                     +@@;'@@.                                     \n"+
 "                                      .#@@@@#                                      \n"+
 "                                       `#@@@,                                      \n"+
 "                                        `;#,                                       ");    
})();
