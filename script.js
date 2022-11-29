function AddZero(num) {
  return (num >= 0 && num < 10) ? "0" + num : num + "";
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const months = ["ian","feb","mar","apr","mai","iunie","iulie","aug","sep","oct","nov","dec"];

$(document).ready(function(){
  var now = new Date();

  var strDateTime = now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear() + " " + now.getHours() + ":" + AddZero(now.getMinutes());
  $("#date").html(strDateTime);
  setInterval(function(){
    var now = new Date();
    
    var strDateTime =  now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear() + " " + now.getHours() + ":" + AddZero(now.getMinutes());
    $("#date").html(strDateTime);
  }, 30000);
    
  window.addEventListener("message", function(event){
    if (event.data.theName) {
      var theName = event.data.theName;
      if (theName.lenth > 9) {
        theName = theName.substring(0, 9) + "...";
      }
      if (event.data.isVip) {
        $("#username").html('<i class="fad fa-money-bill-alt"></i>  '+ theName);
      } else {
        $("#username").html('<i class="fas fa-user"></i> ' + theName);
      }
    }
    if(event.data.wallet >= 0){
      $(".cashMoney").html('<i class="fas fa-wallet"></i> $' + numberWithCommas(event.data.wallet));
    }
    if(event.data.bank >= 0){
      $(".bankMoney").html('<i class="fas fa-sack-dollar"></i> $ '+ numberWithCommas(event.data.bank));
    }
    if(event.data.on){
      $("#onlinePlayers").html(' ' + event.data.on + " Online");
    }

    if (event.data.sfz == true) {
      $( "#safezone" ).fadeIn(1000, function() {
        $("#safezone").css("display","block").fadeIn(300);
        $("#sfzName").html("Safezone " + event.data.sfzname);
      });
    }else if (event.data.sfz == false) {
      $( "#safezone" ).fadeOut(1000, function() {
        $("#safezone").css("display","none");
      })
    }

  });
});
