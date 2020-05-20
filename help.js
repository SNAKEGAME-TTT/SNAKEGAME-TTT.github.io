
var username="Amigo!";




function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie() {
    var user=getCookie("username");
    username=getCookie("username");
    if (user != "") {
     //alert("Welcome again " + username +  "!😎  Yo!\nStart your 🐍 game😀?\n\n\nP.S: "+user+", to enjoy the GAMEPLAY to the fullest,please gothrough the instructions(leftmost) carefully especially if you are playing this GAME/LEVEL for the FIRST TIME.\nThankyou🙂!");
     
    }
    
    else {
       user = prompt("Please enter your name🙂:","");
       if (user != "" && user != null) {
         setCookie("username", user, 30);
        //alert("Hola "+user+"!😎  Yo!\nStart your 🐍 game😀?\n\n\nP.S: "+user+", to enjoy the GAMEPLAY to the fullest,please gothrough the instructions(leftmost) carefully especially if you are playing this GAME/LEVEL for the FIRST TIME.\nThankyou🙂!");
        
       }
       else{
        // alert("Hola amigo!😎  Yo!\nStart your 🐍 game😀?\n\n\nP.S: AMIGO, to enjoy the GAMEPLAY to the fullest,please gothrough the instructions(leftmost) carefully especially if you are playing this GAME/LEVEL for the FIRST TIME.\nThankyou🙂!");
         user="Amigo!";
         username="Amigo!";
       }
    }
  }

  username=getCookie("username");
  var header11 = document.getElementById("header1");
  document.getElementById("header1").innerHTML = "Hello "+username+"!😎";
     