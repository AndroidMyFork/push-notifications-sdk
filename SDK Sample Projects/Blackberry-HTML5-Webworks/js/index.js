function onDeviceReady() {
	if (typeof blackberry != "undefined") {
		openBISPushListener();
	} else {
		showMessage("Blackberry is undefined");
	}
}