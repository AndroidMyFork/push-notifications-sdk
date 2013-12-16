var port = 34236;
var serverUrl = "http://pushapi.eval.blackberry.com";
var appId = "4363-875258kB87i6580O39c346m7h9e4a512ei2";
var max = 100;
var wakeUpPage = "index.html";
function openBISPushListener() {
	try {
		var bisRegistered = localStorage.getItem("bisRegistered");
		
		if (bisRegistered != null && bisRegistered)
		{
			onRegister(0);
		}
		else
		{
			showMessage("Open BIS push listener...");
			
			var ops = {port : port, appId : appId, serverUrl : serverUrl, wakeUpPage : wakeUpPage, maxQueueCap : max};
			blackberry.push.openBISPushListener(ops, onData, onRegister, onSimChange);
		}
	}
	catch (err) {
		showMessage("Open BIS push listener error: " + err);
	}
}

function onRegister(status) {
	if (status == 0) {
		localStorage.setItem("bisRegistered", true);
		
		var pushwooshRegistered = localStorage.getItem("pushwooshRegistered");
		if (pushwooshRegistered != null && pushwooshRegistered)
		{
			onPushwooshRegisterSuccess();
		}
		else
		{
			showMessage("Register on Pushwoosh...");
			PushWoosh.register(function(data) {
					localStorage.setItem("pushwooshRegistered", true);
					
					onPushwooshRegisterSuccess();
		        }, function(errorregistration) {
		            showMessage("Register on Pushwoosh error: " + errorregistration);
		        });
		}
	}
	else if (status == 1) {
		showMessage("push register status network error: " + status);
	}
	else if (status == 2) {
		showMessage("push register status rejected by server");
	}
	else if (status == 3) {
		showMessage("push register status invalid parameters");
	}
	else if (status == -1) {
		showMessage("push register status general error");
	}
	else {
		showMessage("push register status unknown");
	}
}

function onPushwooshRegisterSuccess() {
	showMessage("Register on Pushwoosh success.");
}

function onData(data) {
	localStorage.setItem("push", JSON.parse(blackberry.utils.blobToString(data.payload)).m);
	
	blackberry.app.showBannerIndicator("img/banner.png");
	
	showPush();
	
	return 0;
}

function onSimChange() {
	showMessage("SIM changed");
}