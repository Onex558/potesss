// Copyright 2013 Google Inc. All Rights Reserved.
// You may study, modify, and use this example for any purpose.
// Note that this example is provided "as is", WITHOUT WARRANTY
// of any kind either expressed or implied.

var adsManager;
var adsLoader;
var adDisplayContainer;
var intervalTimer;
var isLoaded = false;

function setUpIMA() {	
	if (!isLoaded) {
		console.log("INIT ADS");
		isLoaded = true;
		// Create the ad display container.
		document.getElementById('contentElement').innerHTML = "";
		createAdDisplayContainer();
		
		// Create ads loader.
		adsLoader = new google.ima.AdsLoader(adDisplayContainer);
		// Listen and respond to ads loaded and error events.
		adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, onAdsManagerLoaded, false);
		adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError, false);

		// Request video ads.
		var adsRequest = new google.ima.AdsRequest();
		adsRequest.adTagUrl = 'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_text_image&client=ca-games-pub-6129580795478709&description_url=http%3A%2F%2Fwww.y8.com&channel=5397675186&videoad_start_delay=30000&hl=en&max_ad_duration=30000';
		//adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?' +
							  //'sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&' +
							  //'impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&' +
							  //'cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=';

		// Specify the linear and nonlinear slot sizes. This helps the SDK to
		// select the correct creative if multiple are returned.
		adsRequest.linearAdSlotWidth = 640;
		adsRequest.linearAdSlotHeight = 400;

		if(window.innerWidth < 640 || window.innerHeight < 360)	{
			adsRequest.nonLinearAdSlotWidth = 336;
			adsRequest.nonLinearAdSlotHeight = 280;
		}
		else {
			adsRequest.nonLinearAdSlotWidth = 640;
			adsRequest.nonLinearAdSlotHeight = 400;
		}
		adsRequest.forceNonLinearFullSlot = true;

		adsLoader.requestAds(adsRequest);		
	}
}


function createAdDisplayContainer() {
	// So we can run VPAID2.
	//google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);	
	// We assume the adContainer is the DOM id of the element that will house
	// the ads.
	adDisplayContainer = new google.ima.AdDisplayContainer(document.getElementById('contentElement'));
}

function playAds() {
	// Initialize the container. Must be done via a user action on mobile devices.
	if (isLoaded) adDisplayContainer.initialize();
	isLoaded = false;
	try {
		console.log("SHOW ADS");
		
		// Initialize the ads manager. Ad rules playlist will start at this time.
		adsManager.init(window.innerWidth * 0.75, window.innerHeight * 0.75, google.ima.ViewMode.NORMAL)
		
		var el = document.getElementById('contentElement').firstChild;
		var width = el.style.width.replace("px", "")*1;
		var height = el.style.height.replace("px", "")*1;
		el.style.marginLeft = "-" + (width/2) + "px";
		el.style.marginTop = "-" + (height/2) + "px";		
		
		// Call play to start showing the ad. Single video and overlay ads will
		// start at this time; the call will be ignored for ad rules.
		adsManager.start();		
	}
	catch (adError) {
		// An error may be thrown if there was a problem with the VAST response.
		console.log("ERROR ADS");
		resumeGame();
		document.getElementById('contentElement').style.width = "0px";
		document.getElementById('contentElement').style.height = "0px";
		document.getElementById("contentElement").style.zIndex = 0;	
		setUpIMA();
	}
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {
	console.log("ADS MANAGER LOADED");
	// Get the ads manager.
	var adsRenderingSettings = new google.ima.AdsRenderingSettings();
	adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
	adsManager = adsManagerLoadedEvent.getAdsManager(adsRenderingSettings);

	// Add listeners to the required events.
	adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);
	adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, onContentPauseRequested);
	adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, onContentResumeRequested);
	adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, onAdEventAllAdsComplete);

	// Listen to any additional events, if necessary.
	adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, onAdEventLoaded);
	adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, onAdEventStarted);
	adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, onAdEventComplete);
}

function onAdEventLoaded(adEvent) {
	// Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
	// don't have ad object associated.
	var ad = adEvent.getAd();
	switch (adEvent.type) {
		case google.ima.AdEvent.Type.LOADED:
			console.log("LOADED " + adEvent.type);
			// This is the first event sent for an ad - it is possible to
			// determine whether the ad is a video ad or an overlay.
			if (!ad.isLinear()) {
				// Position AdDisplayContainer correctly for overlay.
				// Use ad.width and ad.height.
				//videoContent.play();
			}
		break;
	}
}

function onAdEventStarted(adEvent) {
	// Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
	// don't have ad object associated.
	var ad = adEvent.getAd();
	switch (adEvent.type) {
		case google.ima.AdEvent.Type.STARTED:
			console.log("STARTED " + adEvent.type);
			pauseGame();
			document.getElementById('contentElement').style.width = "100%";
			document.getElementById('contentElement').style.height = "100%";		
			document.getElementById("contentElement").style.zIndex = 99;
			// This event indicates the ad has started - the video player
			// can adjust the UI, for example display a pause button and
			// remaining time.
			if (ad.isLinear()) {
				// For a linear ad, a timer can be started to poll for
				// the remaining time.
				intervalTimer = setInterval(
					function() {
						var remainingTime = adsManager.getRemainingTime();
					},
				300); // every 300ms
			}
		break;
	}
}

function onAdEventComplete(adEvent) {
	// Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
	// don't have ad object associated.
	var ad = adEvent.getAd();
	switch (adEvent.type) {
		case google.ima.AdEvent.Type.COMPLETE:
			console.log("ADS COMPLETE " + adEvent.type);
			// This event indicates the ad has finished - the video player
			// can perform appropriate UI actions, such as removing the timer for
			// remaining time detection.
			if (ad.isLinear()) {
				adsManager.destroy();
				clearInterval(intervalTimer);
				resumeGame();
				document.getElementById('contentElement').style.width = "0px";
				document.getElementById('contentElement').style.height = "0px";	
				document.getElementById("contentElement").style.zIndex = 0;
				setUpIMA();
			}
		break;
	}
}

function onAdEventAllAdsComplete(adEvent) {
	// Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
	// don't have ad object associated.
	var ad = adEvent.getAd();
	console.log("ALL ADS COMPLETE " + adEvent.type);
}

function onAdError(adErrorEvent) {
	// Handle the error logging.
	console.log(adErrorEvent.getError());
	adsManager.destroy();
	setUpIMA();
}

function onContentPauseRequested() {
	console.log("ADS PAUSE REQUESTED");
	//videoContent.pause();
	// This function is where you should setup UI for showing ads (e.g.
	// display ad timer countdown, disable seeking etc.)
	// setupUIForAds();
}

function onContentResumeRequested() {
	console.log("ADS RESUME REQUESTED");
	adsManager.destroy();
	clearInterval(intervalTimer);
	resumeGame();
	document.getElementById('contentElement').style.width = "0px";
	document.getElementById('contentElement').style.height = "0px";	
	document.getElementById("contentElement").style.zIndex = 0;		
	setUpIMA();
	// This function is where you should ensure that your UI is ready
	// to play content. It is the responsibility of the Publisher to
	// implement this function when necessary.
	// setupUIForContent();
}