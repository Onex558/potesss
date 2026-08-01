
 window.addEventListener("gamepadconnected", function(e) {
    var gamepadID = e.gamepad.id;
    document.getElementById("gamepadtext").innerHTML = gamepadID;
});
 window.addEventListener("gamepaddisconnected", function(e) {
    document.getElementById("gamepadtext").innerHTML = "No gamepads detected. Plug in and press a button to use it.";
});





window.onkeydown = function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
		AJS.emulate();
        e.preventDefault();
        return false;
    }
};