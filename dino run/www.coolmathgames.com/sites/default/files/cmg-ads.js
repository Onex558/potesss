var version = "2.5.6 Truex reward size fix";
console.log("cmgAds cmg-ads.js loaded", version);

/*
var cmgTrackJsConfig = {
  token: "8d3f05668d194a9fa351033fa00591ef",
  application: "cmg-ads",
  version: version
};
var cmgTrackJsInstalling = false;

function installCmgTrackJs() {
  if (
    window.cmgTrackJsInstalled ||
    !window.TrackJS ||
    typeof window.TrackJS.install !== "function"
  ) {
    return;
  }

  try {
    window.TrackJS.install(cmgTrackJsConfig);
    window.cmgTrackJsInstalled = true;
    cmgTrackJsInstalling = false;
    console.log("cmgAds TrackJS initialized", version);
  } catch (error) {
    cmgTrackJsInstalling = false;
    console.warn("cmgAds TrackJS install failed", error);
  }
}

function loadCmgTrackJs() {
  if (window.cmgTrackJsInstalled || cmgTrackJsInstalling) {
    return;
  }

  if (window.TrackJS && typeof window.TrackJS.install === "function") {
    installCmgTrackJs();
    return;
  }

  cmgTrackJsInstalling = true;
  var existingTrackJsScript = document.querySelector(
    'script[data-cmg-trackjs="true"]'
  );
  if (existingTrackJsScript) {
    if (window.TrackJS) {
      installCmgTrackJs();
      return;
    }

    existingTrackJsScript.addEventListener("load", installCmgTrackJs, {
      once: true
    });
    return;
  }

  var trackJsScript = document.createElement("script");
  trackJsScript.src = "https://cdn.trackjs.com/agent/v3/latest/t.js";
  trackJsScript.async = true;
  trackJsScript.setAttribute("data-cmg-trackjs", "true");
  trackJsScript.addEventListener("load", installCmgTrackJs, { once: true });
  trackJsScript.addEventListener(
    "error",
    function () {
      cmgTrackJsInstalling = false;
      console.warn("cmgAds TrackJS failed to load");
    },
    { once: true }
  );
  (document.head || document.getElementsByTagName("head")[0] || document.documentElement)
    .appendChild(trackJsScript);
}

loadCmgTrackJs();
*/

// Add styles
const styles = `
/* General Styles */
.ads-popup {
  font-family: "Helvetica Neue", "Arial Nova", Helvetica, Arial, sans-serif!important;
}

/* Hidden Elements */
.ads-popup, .ad-container, #img-button-self {
  display: none;
}

/* Ads Popup and Container Styles */
.ads-popup, .ad-container {
  position: relative;
  z-index: 10;
}

body{position:relative; min-height:100%}
html{height: 100%;}

/* Removing donot sell dialog on app */
html .fc-ccpa-root .fc-dns-dialog{
  display: none !important;
}

.ads-popup {
  position: absolute;
  left: 0;
  top: 0;
  z-index:111111;
  background: #000000;
  height: 100vh;
  width: 100%;
}

.ads-popup #afg_container.top-continue-btn {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.ads-popup #afg_container.top-continue-btn ~ iframe {
  position: relative;
  z-index: 1;
}

.ads-popup .pw-custom-ima-container{max-width: 100vw}

div[style^="display: block"].ads-popup{
  display: flex !important;
  align-items:center;
  justify-content: center;
}

.ad-container {
  height: 100%;
}

.ad-container.flex-center {
  display: flex !important;
  justify-content: center;
 // align-items: center;
}

.ad-container > div iframe {
 // position:unset;
}

/* Preloader Styles */
#afg_preloader {
  display: flex;
  height: 400px;
  justify-content: center;
 // align-items: center;

}

/* Container123 Styles */
#container123 {
  width: 640px;
  height: 400px;
  max-width: 100vw;
}

/* Nested div inside ad-container */
.ad-container > div {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
}

/* Link Styles */
#timer_div a, .timer-div a, .continue-lnk-container-rsection, .continue-link-yellow, #continue-link {
  color: #000;
}

.continue-lnk-container-rsection, .continue-link-yellow {
  font-size: 16px;

}

.timer-div {
  margin-left: 5px;
}

/* Continue Container Styles */
#continue-container, .continue-container {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  bottom: 0;
  z-index: 10;
  min-width:160px;
  background: #ffe420;
  border-radius: 5px;
  font-weight: 500;
  color: #000;
  height: 20px;
  padding: 5px;
  text-align:center;
}

/* Continue Link Yellow Styles */
.continue-link-yellow {
  text-decoration: none;
  background: #ffe420;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  height: 20px;
  position: absolute;
  left: 15px;
  top:0;
  display:block;
  padding: 5px;
  text-align:center;
}

.continue-link-yellow:active::before {
  opacity: 1;
  transform: translate(2px, 1px);
  box-shadow: none;
}

/* AFG Container Styles */
#afg_container {
  text-align: center;
  width: 100vw;
  height: 100vh;
}

#afg_container .load-wrap {
  width: 100%;
  padding-top: 50px;
  margin-bottom: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

#afg_container .load-wrap .loadingText {
  display: block;
  font-size: 20px;
  margin-top: 46px;
  color: #fff;
  text-align: center;
}

#afg_container .load-wrap .circle {
  display: inline-block;
  height: 15px;
  width: 15px;
  margin-left: 20px;
  border-radius: 50%;
  animation: afg_container_loading 1.6s infinite;
  vertical-align: middle;
}

#afg_container .load-wrap .circle:first-child {
  animation-delay: 0.1s;
  background: #f8eb13;
}

#afg_container .load-wrap .circle:nth-child(2) {
  animation-delay: 0.3s;
  background: #29bffd;
}

#afg_container .load-wrap .circle:nth-child(3) {
  animation-delay: 0.5s;
  background: #f3733b;
}

#afg_container .load-wrap .circle:nth-child(4) {
  animation-delay: 0.7s;
  background: #65efbd;
}

/* Loading Animation */
@keyframes afg_container_loading {
  0%, 100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}

/* Play Now Button Styles */
.playNow {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
}

.playWrapper {
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  position: absolute;
}

#playAdsNowButton {
  width: 88px;
  height: 88px;
  position: absolute;
  z-index: 10000;
  transform: translate(-50%, -50%);
  text-align: center;
  /* Correct the positioning */
  left: 50%;
  top: 50%;
}

#playAdsNowButton h4 {
  color: #fff;
}

#playAdsNowButton::before {
  animation: playPulse 2s infinite;
  background: #fff;
  border-radius: 50%;
  content: "";
  height: 118%;
  left: -9%;
  position: absolute;
  top: -9%;
  width: 118%;
  z-index: -1;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3); /* Add drop shadow */
}

#playAdsNowButton::after {
  background: #56eeb7;
  border-radius: 50%;
  content: "";
  height: 100%;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 1;
}

#playAdsNowButton svg{
  height: 34px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: scaleX(1.1) translate(-50%, -50%);
  width: 40px;
  z-index: 2;
}

@keyframes playPulse {
  0% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
  }
  50% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
  100% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}
`;

var styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

var adBreakInterval = 120000; //Changed from 180000 to 120000 on 12022025; // Change to 180000 for live
if(/mine-escape/.test(window.location.href)) {  //Mr Mine Escape
  adBreakInterval = 10;
}
if(/0-clicker-heroes-escape/.test(window.location.href)) {  //Mr Mine Escape
  adBreakInterval = 10;
}


var gameInterstitialAdTimerDone = false;
var gameInterstitialAdTimer;
var adLoadedTimer;
var justAMomentLoaderTimer;
var isRewardAd = false;
var cmgAInvD = false;
var reInitCounter = 0;
var isTrueXAdPlaying = false;
var is_ad_started = false;  //initialize is_ad_started to false;

const hostname = new URL(window.location).hostname;
const domainname = hostname.split('.').slice(-2).join('.');
var midrollorRewardAdCompleted = false;


// GLOBAL FLAGS
window.playwireAdStarted = false;
window.adblockDetected = false;

var validSubscriber = false;
window.addEventListener('message', function(event) {
    //console.log("Message received from the parent: ", event.data);
    if(/(www|stage|stage-edit|dev|stage2).coolmathgames.com/i.test(event.origin) && event.data == "valid-subscriber") {
      validSubscriber = true;
      console.log("CMGAdBreak - Premium Subscriber");
    }
    //truex related events
    const isTruexOrigin = event.origin.includes("truex.com");
    if(isTruexOrigin) {
      const data = event.data;
      if (data.message === "interaction") {
        console.log("TrueX ad is interaction by user");
        //removeMidrollAndReinit();
      }
      if (data.message === "close") {
        console.log("TrueX ad is closed by user after reward");
        //removeMidrollAndReinit();
      }
      if (data.message === "finish") {
        console.log("TrueX ad finished after reward");
        removeMidrollAndReinit();
      }
    }

});

console.log("cmg Not subbed user, loading ads.");

$.fn.once = function (processed_class) {
  if (typeof processed_class == "undefined") {
    processed_class = "processed";
  }
  return this.not("." + processed_class).addClass(processed_class);
};

function adBreakRequestInit() {
  adBreakInterval = 1000;
  gameInterstitialAdTimerDone = true;
}

function adBreakRequest() {
  if (window.parent && window.parent.document) {
      adBreakRequestInit();
      cmgAdBreak();
    }
  }

function gameInterstitialAdTimerAction() {
  console.log("cmg gameInterstitialAdTimerAction called");
  gameInterstitialAdTimerDone = true;
  clearGameInterstitialAdTimer();
}

function clearGameInterstitialAdTimer() {
  console.log("cmgAdBreak: timer completed, ready to display the ad next time");
  clearTimeout(gameInterstitialAdTimer);
  gameInterstitialAdTimer = null;
}

function init() {
  var script = document.createElement("script");
  script.src = "https://cdn.intergi.com/prebid/cmg-prebid.js";
  script.async = false;
  document.head.appendChild(script);
  var script2 = document.createElement("script");
  script2.src = "https://cdn.intergi.com/cmg/cmg-headerbidding-dev.js";
  script2.async = false;
  document.head.appendChild(script2);
  var script3 = document.createElement("script");
  script3.src = "https://imasdk.googleapis.com/js/sdkloader/ima3_debug.js";
  script3.async = false;
  document.head.appendChild(script3);

  var script4 = document.createElement("script");
  script4.src = "https://static.truex.com/js/client.js";
  //script4.src = "https://static.truex.com/js/client.test.js";
  script4.async = false;
  document.head.appendChild(script4);

  var script5 = document.createElement("script");
  script5.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
  script5.async = false;
  document.head.appendChild(script5);

  console.log("cmgAdBreak initialized");
  window.top.postMessage("midroll initialized", "*"); //for game qa page
 // Start the timer
 gameInterstitialAdTimer = setTimeout(function () {
    currentTime = new Date();
    gameInterstitialAdTimerAction();
  }, adBreakInterval);
}

function createAdsLoadingPopup() {
  console.log("cmg Creating Ads Loading Popup...");
  var popupContent = $(
    '<div class="ads-popup" id="ads-popup"><div id="afg_container"><div class="load-wrap">' +
      '<div class="circle"></div><div class="circle"></div>' +
      '<div class="circle"></div><div class="circle"></div>' +
      '<h3 class="loadingText">Just a moment while your content loads</h3>' +
      "</div></div></div>"
  );
  return popupContent;
}

function createPreloaderAndGameContainer() {
  console.log("cmgAdBreak Creating Preloader and Game Container...");
  var html =
    "<!--Start of Preloader call -->" +
    '<div id="afg_preloader" >' +
    '<div id="container123">' +
    '<div id="videoplayer"></div>' +
    '<div id="adcontainer" class="ad-container"></div>' +
    "</div>" +
    "</div>" +
    "<!-- Continue to Game container with timer -->" +
    '<div id="continue-container"  style="display:none">' +
    '<div id="img-button-container">' +
    '<div id="img-button-self" class="img-button"></div>' +
    '<div class="continue-lnk-container-rsection">' +
    '<span id="continue-link">Continue in </span>' +
    '<span id="timer_div" class="timer-div">8</span>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  return html;
}

$(document).ready(function () {
  console.log("cmg Document is ready, loading ad window...");
  const adsLoadingPopup = createAdsLoadingPopup();
  const preloaderAndGameContainer = createPreloaderAndGameContainer();
  $("body").prepend(adsLoadingPopup);
  $(".ads-popup").prepend(preloaderAndGameContainer);
});

function reInit() {
  console.log("cmg Re-initializing ad window...");
  const adsLoadingPopup = createAdsLoadingPopup();
  const preloaderAndGameContainer = createPreloaderAndGameContainer();
  $("body").prepend(adsLoadingPopup);
  $(".ads-popup").prepend(preloaderAndGameContainer);
}

init();
var initialWidth = window.innerWidth; // Store the initial width
var initialHeight = window.innerHeight; // Store the initial height
var isMobile; // Variable to store if the device is mobile

function isMobileDevice() {
  console.log("cmg is mobile device Function called");
  let isMobileDevices = /Android|iPhone/i.test(navigator.userAgent);
  let isSmallScreen = $(window).width() <= 640 || $(window).height() <= 500;
  let isTablet = /iPad|Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);

  if (isTablet && $(window).width() > 640 && $(window).height() > 500) {
    // Tablet with enough space for larger ad
    return false;
  } else {
    // Mobile device or tablet with small screen
    return isMobileDevices && isSmallScreen;
  }
}


// Initialize the isMobile variable
isMobile = isMobileDevice();
function getGameDimensions() {
  var gameIframe = document.getElementById('html5game');
  if (gameIframe) {
    return {
      width: gameIframe.clientWidth,
      height: gameIframe.clientHeight
    };
  }
  return null;
}

function sendResizeMessage(width, height) {
  if (width === undefined || height === undefined) {
    var gameDimensions = getGameDimensions();
    if (gameDimensions) {
      width = gameDimensions.width;
      height = gameDimensions.height;
      console.log("cmg Using game dimensions:", width, "x", height);
    } else {
      if (isMobile) {
        // Check if the mobile device has a larger screen
        if (initialWidth > 640 && initialHeight > 500) {
          // Use larger ad size for larger mobile screens
          width = 640;
          height = 480;
          console.log("cmg Using larger ad size for larger mobile screens:", width, "x", height);
        } else {
          // Default mobile ad size

          width = window.innerWidth;
          height = window.innerHeight;
          if(!isPortrait() && !isTrueXAdPlaying) {
            width = 300;
            height = 250;
          }

          console.log("cmg Using default mobile ad size:", width, "x", height);
        }
      } else {
        // Default desktop ad size
        width = 640;
        height = 480;
        console.log("cmg Using default desktop ad size:", width, "x", height);
      }
    }
  }

  window.parent.postMessage(
    { action: "resize", width: width, height: height },
    "*"
  );
  console.log("cmg Resize message sent.", width, "x", height);
}
// Function to swap width and height
function swapWidthHeight() {
  var tempWidth = window.innerWidth;
  var tempHeight = window.innerHeight;
  initialWidth = tempHeight;
  initialHeight = tempWidth;
}

function resetToOriginalSize() {
  console.log("cmg Resetting to initial size:", initialWidth, "x", initialHeight);
  sendResizeMessage(initialWidth, initialHeight);
}

// Event listener for orientation change
window.addEventListener('orientationchange', function() {
  console.log("Orientation changed. Resizing the ad.");
  swapWidthHeight();

  // Resize the ad based on the current orientation
  var currentWidth = window.innerWidth;
  var currentHeight = window.innerHeight;
  sendResizeMessage(currentWidth, currentHeight);
});

const adBreakComplete = new CustomEvent("adBreakComplete");
const adBreakStart = new CustomEvent("adBreakStart");

function removeMidrollAndReinit() {
  console.log("cmgAdBreak removeMidrollAndReinit called");
  midrollorRewardAdCompleted = true;
  isTrueXAdPlaying = false;

  //reset is_ad_started to false;
  window.is_ad_started = false;
  window.playwireAdStarted = false;
  //clear the timers if any
  clearTimeout(justAMomentLoaderTimer);

  $(".ads-popup").remove();  //this is main placeholder for Ads
  $("#afg_preloader").remove(); //this is the new placeholder for Ramp2.0
  reInitCounter++;

  if(typeof window.ramp.settings != "undefined") {
    window.ramp.settings.cp = null;
  }
  handleAdBreakComplete();

  gameInterstitialAdTimerDone = false;
  clearTimeout(gameInterstitialAdTimer);
  gameInterstitialAdTimer = setTimeout(() => {
    currentTime = new Date();
    console.log("CMG:: cmgAdBreak - Timer restarted next ad eligible after " + adBreakInterval + " ms");
    gameInterstitialAdTimerAction();
  }, adBreakInterval);

  gameInterstitialAdTimerDone = false;

  //TODO destory the ramp ads


  //add focus back to game if the game is implemented with canvas
  if (document.getElementById("canvas") != null) {
    document.getElementById("canvas").focus();
  }

  if(typeof isRewardAd != "undefined" && isRewardAd){
    window.top.postMessage("reward completed", "*"); //for game qa page
  }else{
    window.top.postMessage("midroll completed", "*"); //for game qa page
  }

  resetToOriginalSize();
}


function getCookie1(key) {
  var keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
  return keyValue ? keyValue[2] : null;
}
function isPortrait() {
  return window.innerHeight > window.innerWidth;
}

function cmgads_ga4_trackEvent(event, pArr, vArr) {
  try {
    if (window.top && window.top !== window && typeof window.top.ga4_trackEvent === "function") {
      window.top.ga4_trackEvent(event, pArr, vArr);
      return;
    }
  } catch (e) {
    // Ignore cross-origin access errors and fall back to the iframe scope.
  }
}

window.cmgRewardAds = function () {
  isRewardAd = true;
  cmgads_ga4_trackEvent('ad_event', ["action", "path"], ["Rewarded Ad: Button Clicked", location.pathname.replace("/play", "")]);
  //gameInterstitialAdTimerAction();
  $(".load-wrap").show();

  //show TrueX on desktop or mobile portrait mode
  if(!isMobile || (isMobile &&  isPortrait())) {
    network_user_id = "cmg" + Math.random().toString(36).substring(2);
    var gaCookie =  getCookie1('_ga');
    if (gaCookie) {
      network_user_id = gaCookie.replace('GA', 'cmg').replaceAll("\.", "");
    }

    //test partner hash is 83f879b26797c723882473d6435e6361c105d86b
    var partner_config_hash = '375f2f2b728700cd991bb24601b3841c98375886';

    if(isMobile) {
      partner_config_hash = '0d188638b7d82efe6e2e696c3ab3e06d88e35cbf';
    }
    //call truex first and then fallback to playwire ads
    truex_options = {
      'network_user_id': network_user_id,
      'partner_config_hash': partner_config_hash
    };

    // TRUEX Test Hash  (update client.js to client.test.js when using test hash)
    //truex_options = {'network_user_id': network_user_id, 'partner_config_hash': '83f879b26797c723882473d6435e6361c105d86b'};


    //Truex start
    if(typeof truex !="undefined") {
      truex.client(truex_options, function (client) {
        client.requestActivity(function (activity) {
          if (!activity || !activity.window_url) {
            console.log("No TrueX ad available  for " + partner_config_hash  + "falling back to Playwire.");
            cmgRewardsAdBreak();
            return;
          }
          isTrueXAdPlaying = true;
          //truex reward is available
          cmgRewardsAdBreakTrueX();

          client.trackTriggerPointImpression(activity);

          // Show your overlay container and inject iframe
          $(".ads-popup").show();
          $("#afg_container .load-wrap").hide(); // Hide preloader
          $("#afg_preloader").hide();

          console.log("TrueX ad available displaying the ad");
          //load truex ad in ads-popup
          client.loadAdIntoContainer(activity, document.querySelector('.ads-popup'), { width: '100%', height: '100%' });

          let rewarded = false;
          const grantReward = () => {
            console.log("Truex: grantReward");
            if (!rewarded) {
              console.log("Truex: grantReward rewarded if condition");
              rewarded = true;
              console.log("TrueX reward earned!");
            } else {
              console.log("Truex: grantReward already rewarded");
            }
          };

          // Attach events
          activity.onStart(function(activity){
            cmgads_ga4_trackEvent('ad_event', ["action", "path"], ["Rewarded Ad: TrueX Ad Started", location.pathname.replace("/play", "")]);
          });
          activity.onCredit(function(engagement){
            //grantReward();
            cmgads_ga4_trackEvent('ad_event', ["action", "path"], ["Rewarded Ad: TrueX Ad Credited", location.pathname.replace("/play", "")]);
          });
          activity.onFinish(function(activity){
            console.log("TrueX finished inside activity.onFinish");
            cmgads_ga4_trackEvent('ad_event', ["action", "path"], ["Rewarded Ad: TrueX Ad Finished", location.pathname.replace("/play", "")]);
          });
          activity.onClose(function(activity){
            console.log("TrueX closed"); 
            removeMidrollAndReinit();
            cmgads_ga4_trackEvent('ad_event', ["action", "path"], ["Rewarded Ad: TrueX Ad Closed", location.pathname.replace("/play", "")]);
          });
        });
      });
    } else { //truex is not available so display playwire ads
      console.log("No TrueX ad available  for " + partner_config_hash  + " or truex is not initialized yet so falling back to Playwire.");
      cmgRewardsAdBreak();   //playwire ads
    }

    //TrueX End

  } else { //in mobile and landscape mode display Playwire ads only
    console.log("cmgRewardAds:: only display playwire ads in landscape mode");
    cmgRewardsAdBreak();   //playwire ads
  }

};

cmgAInvD = false;

function cmgAdBreak() {
  cmgads_ga4_trackEvent('ad_event', ["action", "path"], ["Midroll Ad: Eligible Moment", location.pathname.replace("/play", "")]);
  if(validSubscriber) {   //iframed games recieves valid-subscriber post message from parent if the user is premium subscriber
    handleAdBreakComplete();
    return;
  }
  if(window.adblockDetected) { //adblock detection
    handleAdBreakComplete();
    console.log("CMG::cmgAdBreak: AdBlocker Detected returing to game");
    return;
  }
  if (/(www|stage|stage-edit|dev|stage2).coolmathgames.com/i.test(window.location.hostname)) { //for all the games that are uploaded to coolmathgames (not iframed multiplayer games)
  if(validSubscriber || window.parent.document.body.classList.contains('subscribed-users')) {
    console.log("cmg premium subscriber - skipping ad break");
    handleAdBreakComplete();
    return;
    }
  }
  midrollorRewardAdCompleted = false; //initialize midrollorRewardAdCompleted to false
  isRewardAd = false; // Set to false for regular ads


  //Bloxd-io specific logic:  display Midroll ads without waiting for the first time as we are not displaying preroll ads
  if(/bloxd/.test(window.location.href) && reInitCounter < 1) {  //Bloxd-io
  gameInterstitialAdTimerDone = true;
  }
  if (typeof gameInterstitialAdTimerDone != "undefined" && gameInterstitialAdTimerDone) {
    document.dispatchEvent(adBreakStart);
  } else {
    handleAdBreakComplete();
    console.log("cmgAdBreak: Too early to invoke midroll ads, wait for " + adBreakInterval + " milliseconds");
    return;
  }

  //if (shouldReinitialize()) reInit();
  window.top.postMessage("midroll called", "*"); //for game qa page

  midRollAdStarted = true;
  sendResizeMessage();
  //TODO uncomment the below line
  //$("#afg_preloader").show();
  $(".continue-lnk-container-rsection").remove();

  $(".ads-popup").remove();

  $("body").prepend('<div class="ads-popup"><div id="afg_container"><div class="load-wrap"><div class="circle"></div><div class="circle"></div><div  class="circle"></div><div class="circle"></div><h3 class="loadingText">Just a moment while your content loads</h3></div></div><div class="afg_preloader" id="afg_preloader"></div> <div id="continue-container"  style="display:none"><div id="img-button-container"><div id="img-button-self" class="img-button"></div><div class="continue-lnk-container-rsection"><span id="continue-link">Continue in </span><span id="timer_div" class="timer-div">8</span></div></div></div></div>');
  $(".ads-popup").show();

  midRollAdStarted = true;
  midroll_ads_timer = 8; // 8 seconds timer
  cmgAInvD = false;
  cmgads_ga4_trackEvent('ad_event', ["action", "path"], ["Midroll Ad: Video Ad Requested", location.pathname.replace("/play", "")]);

  $("#adcontainer").addClass("ad-container flex-center");
  $("#timer_div a").addClass("timer-div");
  $("#continue-container").addClass("continue-container");
  $("#img-button-self").html("&nbsp;");
  $("#timer_div").addClass("continue-button-link");
  $("#afg_container").css({ "z-index": 2 });
  $("#afg_container .load-wrap").html("");
  $("#afg_container").addClass("top-continue-btn");
  $("#afg_preloader").show();
  $("#continue-container").show();
  $("#continue-link").text("Skip Ad in");
  $(".continue-button-link").text(midroll_ads_timer); //8 seconds timer

  startAdTimer();

  if (!window.ramp || typeof window.ramp.setPath !== "function") {
    console.warn("CMG:: ramp not ready fallback to H5");
    if (!window.playwireAdStarted) {
      console.log("CMG:: No Playwire ad started likely adblock skipping H5 fallback");
      removeMidrollAndReinit();
      return;
    }
    cmgMidrollAdFallbackH5();
    return;
  }
  window.ramp.setPath('ROS');

  if (typeof window.ramp.setCustomGamKvs === "function") {
    window.ramp.setCustomGamKvs({
      'cust_cli_tag_1': 'mid_game',
      'cust_cli_tag_2': window.location.href.split('/').splice(-2)[0],
      'cust_cli_tag_4': /stage/.test(hostname) ? 'test-video' : domainname
    });
  }

  if (typeof window.ramp.spaAddAds === "function") {
    const ads = [{type: 'precontent_ad_video'}];
    //Playwire's Ramp 2.0 video Ads
    window.ramp.spaAddAds(ads);
  } else {
    if (!window.playwireAdStarted) {
      console.log("CMG:: No Playwire ad started likely adblock skipping H5 fallback");
      removeMidrollAndReinit();
      return;
    }
    cmgMidrollAdFallbackH5();
  }

}

function cmgRewardsAdBreakTrueX() {
  console.log("cmgAdBreak cmgRewardsAdBreak called for TrueX");
  cmgads_ga4_trackEvent('ad_event', ["action", "path"], ["Rewarded Ad: TrueX Ad Loading", location.pathname.replace("/play", "")]);
  if (shouldReinitialize()) reInit();
  $(".load-wrap").show();
  //TODO truex we dont need adRewardsBreakSpecificLogic
  //adRewardsBreakSpecificLogic();
  //send adBreakStart so game sound is paused
  document.dispatchEvent(adBreakStart);
  startMidRollRewardAd();
  prepareAdDisplayElements();
  sendResizeMessage();
  isRewardAd = true; // Set the flag when loading a rewards ad
}


///////Google H5 Rewarded Ad START

function cmgRewardsAdBreakH5() {
  cmgads_ga4_trackEvent('ad_event', ["action", "path"], ["Rewarded Ad: H5 Ad Requested", location.pathname.replace("/play", "")]);
  console.log("[H5Rewarded] Launching isolated iframe for rewarded ad");
  //removing old reward and Midroll iframes
  const oldRewardFrame = document.getElementById("h5-rewarded-frame");
  if (oldRewardFrame) oldRewardFrame.remove();
  const oldInterFrame = document.getElementById("h5-interstitial-frame");
  if (oldInterFrame) oldInterFrame.remove();

  // Remove any leftover ad containers (Playwire remnants, etc.)
  $(".ads-popup").remove();

  // Ensure parent container (ads-popup or body) is full-size
  const container = document.querySelector(".ads-popup") || document.body;
  Object.assign(container.style, {
    position: "relative",
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
    overflow: "hidden",
    backgroundColor: "black",
  });

  // Create isolated iframe (local GPT sandbox)
  const iframe = document.createElement("iframe");
  iframe.id = "h5-rewarded-frame";
  Object.assign(iframe.style, {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",      //  fills parent container, not full viewport
    height: "100%",     // matches game area, no overflow
    border: "none",
    display: "block",
    zIndex: "99999",
    background: "black",
  });

  container.appendChild(iframe);

  const doc = iframe.contentDocument;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html><head>
      <meta charset="utf-8" />
      <style>
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background: black;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>
      <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"><\/script>
      <script>
        window.googletag = window.googletag || { cmd: [] };
        // Detect GPT blocked
        setTimeout(() => {
          if (!window.googletag || !googletag.apiReady) {
            console.warn("[Iframe] GPT blocked");
            parent.h5RewardedIframeCleanup();
          }
        }, 1000);


        googletag.cmd.push(function() {
          try {
            if (
              !window.googletag ||
              !googletag.apiReady ||
              typeof googletag.pubads !== 'function' ||
              typeof googletag.defineOutOfPageSlot !== 'function' ||
              !googletag.enums ||
              !googletag.enums.OutOfPageFormat
            ) {
              console.warn('[H5Rewarded iframe] GPT API not ready for rewarded fallback.');
              parent.h5RewardedIframeCleanup();
              return;
            }

            const pubads = googletag.pubads();
            if (!pubads || typeof pubads.addEventListener !== 'function') {
              console.warn('[H5Rewarded iframe] GPT pubads unavailable for rewarded fallback.');
              parent.h5RewardedIframeCleanup();
              return;
            }

            const slot = googletag.defineOutOfPageSlot(
              '/45966600/H5_Rewarded_ads',
              googletag.enums.OutOfPageFormat.REWARDED
            );
            if (!slot) {
              console.warn('[H5Rewarded iframe] Rewarded not supported.');
              parent.h5RewardedIframeCleanup();
              return;
            }

            slot.addService(pubads);

            pubads.addEventListener('rewardedSlotReady', e => {
              parent.clearTimeout(parent.h5RewardedTimeout);
              console.log('[H5Rewarded iframe] Rewarded ad ready. Showing now');
              e.makeRewardedVisible();
            });

            pubads.addEventListener('rewardedSlotGranted', e => {
              console.log('[H5Rewarded iframe] Reward granted:', e.payload);
            });

            pubads.addEventListener('rewardedSlotClosed', e => {
              console.log('[H5Rewarded iframe] Rewarded ad closed. Cleaning up.');
              parent.h5RewardedIframeCleanup();
            });

            pubads.addEventListener('slotRenderEnded', e => {
              if (e.isEmpty) {
                console.log('[H5Rewarded iframe] No ad returned.');
                parent.h5RewardedIframeCleanup();
              }
            });

            googletag.enableServices();
            googletag.display(slot);
          } catch (error) {
            console.warn('[H5Rewarded iframe] GPT rewarded fallback failed.', error);
            parent.h5RewardedIframeCleanup();
          }
        });
      <\/script>
    </head>
    <body>
      <!--<div style="color:white;font-family:sans-serif;font-size:16px;">Loading Ad...</div>-->
    </body>
    </html>
  `);
  doc.close();

  // Keep reference for cleanup
  window.h5RewardedIframe = iframe;
  // FAILSAFE TIMER for h5
  window.h5RewardedTimeout = setTimeout(() => {
    console.warn("[H5Rewarded] Timeout fallback triggered");
    h5RewardedIframeCleanup(false); // no reward
  }, 3000);
}

// Cleanup function called from the inner iframe
window.h5RewardedIframeCleanup = function() {
  console.log("[H5Rewarded] Cleaning up rewarded iframe and resuming game");

  if (window.h5RewardedTimeout) {
    clearTimeout(window.h5RewardedTimeout);
    window.h5RewardedTimeout = null;
  }

  const frame = document.getElementById("h5-rewarded-frame");
  if (frame) frame.remove();

  // Resume game logic
  if (typeof window.removeMidrollAndReinit === "function") {
    window.removeMidrollAndReinit();
  } else if (parent && typeof parent.removeMidrollAndReinit === "function") {
    parent.removeMidrollAndReinit();
  } else {
    console.warn("[H5Rewarded] removeMidrollAndReinit() not found.");
  }
};

///////Google H5 Rewarded Ad END

///////Google H5 Midroll Interstitial  Ad START

function cmgMidrollAdFallbackH5() {
  console.log("[H5Interstitial] Launching isolated iframe for midroll fallback");
  cmgads_ga4_trackEvent('ad_event', ["action", "path"], ["Midroll Ad: H5 Ad Requested", location.pathname.replace("/play", "")]);
  // Remove any old H5 fallback frames before creating a new one.
  const oldRewardFrame = document.getElementById("h5-rewarded-frame");
  if (oldRewardFrame) oldRewardFrame.remove();
  const oldInterFrame = document.getElementById("h5-interstitial-frame");
  if (oldInterFrame) oldInterFrame.remove();

  if (window.h5MidrollTimeout) {
    clearTimeout(window.h5MidrollTimeout);
    window.h5MidrollTimeout = null;
  }

  // Clean up any leftover Playwire ad overlays
  $(".ads-popup").remove();

  // Ensure parent container fills the game area
  const container = document.querySelector(".ads-popup") || document.body;
  Object.assign(container.style, {
    position: "relative",
    width: "100%",
    height: "100%",
    margin: "0",
    padding: "0",
    overflow: "hidden",
    backgroundColor: "black",
  });

  // Create isolated GPT iframe
  const iframe = document.createElement("iframe");
  iframe.id = "h5-interstitial-frame";
  Object.assign(iframe.style, {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",    // fills parent container
    height: "100%",   // matches game area
    border: "none",
    display: "block",
    zIndex: "99999",
    background: "black",
  });
  container.appendChild(iframe);

  const doc = iframe.contentDocument;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html><head>
      <meta charset="utf-8" />
      <style>
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background: black;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>
      <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"><\/script>
      <script>
        window.googletag = window.googletag || { cmd: [] };
        // Detect GPT blocked
        setTimeout(() => {
          if (!window.googletag || !googletag.apiReady) {
            console.warn("[Iframe] GPT blocked");
            parent.h5InterstitialIframeCleanup();
          }
        }, 1000);

        googletag.cmd.push(function() {
          try {
            if (
              !window.googletag ||
              !googletag.apiReady ||
              typeof googletag.pubads !== 'function' ||
              typeof googletag.defineOutOfPageSlot !== 'function' ||
              !googletag.enums ||
              !googletag.enums.OutOfPageFormat
            ) {
              console.warn('[H5Interstitial iframe] GPT API not ready for interstitial fallback.');
              parent.h5InterstitialIframeCleanup();
              return;
            }

            const pubads = googletag.pubads();
            if (!pubads || typeof pubads.addEventListener !== 'function') {
              console.warn('[H5Interstitial iframe] GPT pubads unavailable for interstitial fallback.');
              parent.h5InterstitialIframeCleanup();
              return;
            }

            // Clean up any old interstitial slots first
            try {
              if (typeof googletag.destroySlots === 'function') {
                console.log('[H5Interstitial iframe] Destroying any previous interstitial slots');
                googletag.destroySlots();
              }
            } catch (e) {
              console.log('[H5Interstitial iframe] destroySlots failed', e);
            }

            // Define the official ad unit again (do NOT change the path)
            const slot = googletag.defineOutOfPageSlot(
              '/45966600/h5_interstitial_ads',
              googletag.enums.OutOfPageFormat.GAME_MANUAL_INTERSTITIAL
            );

            if (!slot) {
              console.warn('[H5Interstitial iframe] Interstitials not supported.');
              parent.h5InterstitialIframeCleanup();
              return;
            }

            slot.addService(pubads);

            // Register fresh listeners for every iframe load
            pubads.addEventListener('gameManualInterstitialSlotReady', e => {
              console.log('[H5Interstitial iframe] Interstitial ready showing.');
              parent.clearTimeout(parent.h5MidrollTimeout);
              e.makeGameManualInterstitialVisible();
            });
            pubads.addEventListener('impressionViewable', e => {
              console.log('[H5Interstitial iframe] Interstitial impressionViewable.');
              parent.clearTimeout(parent.h5MidrollTimeout);
            });

            pubads.addEventListener('gameManualInterstitialSlotClosed', e => {
              console.log('[H5Interstitial iframe] Interstitial closed cleaning up.');
              parent.h5InterstitialIframeCleanup();
            });

            pubads.addEventListener('slotRenderEnded', e => {
              if (e.isEmpty) {
                console.log('[H5Interstitial iframe]  No ad returned.');
                parent.h5InterstitialIframeCleanup();
              }
            });

            // Re-enable and request a new fill
            googletag.enableServices();
            googletag.display(slot);
          } catch (error) {
            console.warn('[H5Interstitial iframe] GPT interstitial fallback failed.', error);
            parent.h5InterstitialIframeCleanup();
          }
        });
      <\/script>
    </head>
    <body>
      <!--<div style="color:white;font-family:sans-serif;font-size:16px;">Loading Ad...</div>-->
    </body>
    </html>
  `);
  doc.close();

  // Keep global reference for cleanup
  window.h5InterstitialIframe = iframe;
  //FAILSAFE (CRITICAL)
  window.h5MidrollTimeout = setTimeout(() => {
    console.warn("[H5Midroll] Timeout fallback triggered");
    h5InterstitialIframeCleanup();
  }, 3000);
}

// Called from inside iframe after ad closes or no fill
window.h5InterstitialIframeCleanup = function() {
  console.log("[H5Interstitial] Cleaning up interstitial iframe and resuming game");

  if (window.h5MidrollTimeout) {
    clearTimeout(window.h5MidrollTimeout);
    window.h5MidrollTimeout = null;
  }
  const frame = document.getElementById("h5-interstitial-frame");
  if (frame) frame.remove();

  // Resume game logic after ad closes
  if (typeof window.removeMidrollAndReinit === "function") {
    window.removeMidrollAndReinit();
  } else if (parent && typeof parent.removeMidrollAndReinit === "function") {
    parent.removeMidrollAndReinit();
  } else {
    console.warn("[H5Interstitial] removeMidrollAndReinit() not found.");
  }
};


///////Google H5 Midroll Interstitial  Ad END

function onAllAdsCompleted() {
  removeMidrollAndReinit(); // Call your function to handle the end of the ad
  isRewardAd = false; // Reset the flag
}

function commonAdBreakLogic() {
  window.top.postMessage("midroll called", "*"); //for game qa page
}

function adBreakSpecificLogic() {
  console.log("CMG::: adBreakSpecificLogic ....");
  midRollAdStarted = true;
  midroll_ads_timer = 8; // 8 seconds timer
  cmgAInvD = false;

  $(".ads-popup").show();
  $("#adcontainer").addClass("ad-container flex-center");
  $("#timer_div a").addClass("timer-div");
  $("#continue-container").addClass("continue-container");
  $("#img-button-self").html("&nbsp;");
  $("#timer_div").addClass("continue-button-link");
  $("#afg_container").css({ "z-index": 2 });
  $("#afg_container .load-wrap").html("");
  $("#afg_container").addClass("top-continue-btn");
  $("#afg_preloader").show();
  $("#continue-container").show();
  $("#continue-link").text("Skip Ad in");
  $(".continue-button-link").text(midroll_ads_timer); //8 seconds timer
  var swf_game_url = $("#swfgame").attr("src");
  startAdTimer();
}



function startAdTimer() {
  var seconds_left = midroll_ads_timer;
  var midrollIntervalId = setInterval(function () {
    seconds_left--;
    $(".continue-button-link").html(seconds_left);
    if (seconds_left <= 0) {
      clearInterval(midrollIntervalId);
      updateAdCompletionUI();
    }
  }, 1000);
}

function updateAdCompletionUI() {
  if ($(".continue-button-link ") != null) {
    $("#continue-link").each(function () {
      $(".continue-lnk-container-rsection #continue-link").text("");
      $(this).html("");
    });
    $(".continue-button-link").html(
      '<a href="javascript:removeMidrollAndReinit();" class="continue-link-yellow">Return to Game <span>&#x25BA;</span></a>'
    );
  }
}

function isAdTimingValid() {
  return (
    typeof gameInterstitialAdTimerDone !== "undefined" &&
    gameInterstitialAdTimerDone
  );
}

function handleAdBreakComplete() {
  document.dispatchEvent(adBreakComplete);
}

function shouldReinitialize() {
  return reInitCounter > 0;
}

function startMidRollAd() {
  midRollAdStarted = true;
  midroll_ads_timer = 8;
  cmgAInvD = false;
  $(".ads-popup").show();
}

function startMidRollRewardAd() {
  midRollAdStarted = true;
  cmgAInvD = false;
  $(".ads-popup").show();
}

function prepareAdDisplayElements() {
  $("#img-button-self").html("&nbsp;");
  $("#timer_div").addClass("continue-button-link");
  $("#afg_container").addClass("top-continue-btn");
}


function addPlayButtonToAdPopup() {
  const playAdsNowButtonHtml = `
    <a href="/play" class="playNow" >
    <div class="playWrapper">
      <div id="playAdsNowButton">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M176 480C148.6 480 128 457.6 128 432v-352c0-25.38 20.4-47.98 48.01-47.98c8.686 0 17.35 2.352 25.02 7.031l288 176C503.3 223.8 512 239.3 512 256s-8.703 32.23-22.97 40.95l-288 176C193.4 477.6 184.7 480 176 480z"></path>
        </svg>
        </div>
      </div>
    </a>
    `;
  $(".load-wrap").remove();
  $(".top-continue-btn").remove();
  $(".ads-popup").prepend(playAdsNowButtonHtml);
  $(".ad-container").addClass("flex-center");
  $(".playNow")
  .off("click")
  .on("click", function (e) {
  $(".playNow").remove();
    e.preventDefault();

    console.log("cmg Play button clicked");

    //TODO display ramp video player

  });

}

function cmgRewardsAdBreak() {
  console.log("CMG::cmgRewardAds called");
  cmgads_ga4_trackEvent('ad_event', ["action", "path"], ["Rewarded Ad: Video Ad Requested", location.pathname.replace("/play", "")]);
  midrollorRewardAdCompleted = false; //initialize midrollorRewardAdCompleted to false
  if(window.adblockDetected) { //adblock detection
    handleAdBreakComplete();
    console.log("CMG::cmgAdBreak: AdBlocker Detected returing to game");
    return;
  }

  if (window.ramp && typeof window.ramp.setPath === "function") {
    window.ramp.setPath('rewarded-video');
        // Set the KVs properly
    if (typeof window.ramp.setCustomGamKvs === "function") {
      window.ramp.setCustomGamKvs({
        'cust_cli_tag_1': 'rewarded_video',
        'cust_cli_tag_2': window.location.href.split('/').splice(-2)[0],
        'cust_cli_tag_4': /stage/.test(hostname) ? 'test-video' : domainname
      });
    }

    document.dispatchEvent(adBreakStart);
    //TODO include reInit so loader shows up
    //reInit();
    $(".ads-popup").remove();

    $("body").prepend('<div class="ads-popup"><div id="afg_container"><div class="load-wrap"><div class="circle"></div><div class="circle"></div><div  class="circle"></div><div class="circle"></div><h3 class="loadingText">Just a moment while your content loads</h3></div></div><div class="afg_preloader" id="afg_preloader"></div></div>');
    $(".ads-popup").show();

    //destroy Just a moment loaded if the Ad Load event doesnot fire in 8 seconds
    justAMomentLoaderTimer = setTimeout(() => {
      if (typeof is_ad_started != "undefined" && !is_ad_started) {
        console.log("cmgAdBreak Ad did not load in 8 seconds so removing it...");
        removeMidrollAndReinit(); //remove  midroll or rewarded ads
      } else {
        console.log( "cmgAdBreak Ad is loaded in 8 seconds so not removing the justamomnetloader/ad container...");
      }
    }, 8000);
    const ads = [{type: 'precontent_ad_video'}];
    window.ramp.spaAddAds(ads);
    isRewardAd = true; // Set the flag when loading a rewards ad
  }  else {
    //fallback to H5 ads as Ramp is not ready
    document.dispatchEvent(adBreakStart);
    isRewardAd = true;
      midrollorRewardAdCompleted = true;
        //H5 fallback ad starting so we can mark ad started and clear the justAMomentLoaderTimer
        window.is_ad_started = true;
        clearTimeout(justAMomentLoaderTimer);
        if (!window.playwireAdStarted) {
          console.log("CMG:: No Playwire ad startedlikely adblock skipping H5 fallback");
          removeMidrollAndReinit();
          return;
        }
        cmgRewardsAdBreakH5();
  }


}



window.ramp = window.ramp || {};
window.ramp.que = window.ramp.que || [];
window.ramp.passiveMode = true;

// Load the Ramp configuration script
const configScript = document.createElement("script");
// Connects to Cool X Games config file
configScript.src = "https://cdn.intergient.com/1023174/71134/ramp.js";
console.log("CMG::adding playwire script EARLY");

// load immediately
document.head.appendChild(configScript);
configScript.onload = function () {
  console.log("CMG:: ramp loaded");
};

configScript.onerror = function () {
  console.error("CMG:: ramp FAILED to load");
};




var prerollDisplayedCounter = 0;
var currentTime = new Date();
window.ramp.onPlayerReady = function() {
  //TODO
  if (window.ramp.onPlayerReady) {
    delete window.ramp.onPlayerReady;
  }

  console.log("CMG::onPlayerReady");
  // Add the Ad event to show the game once the preroll ad is completed:

  Bolt.on( 'precontent_ad_video', 'showHiddenContainer', function() {
    window.is_ad_started = true;
    clearTimeout(justAMomentLoaderTimer);
    console.log("CMG::midrollorRewardAdCompleted::  cmgAdBreak starting the timer at: " + currentTime);
    if(midrollorRewardAdCompleted) {  //remove ad only one time
      return;
    } else {
      console.log("CMG::Midroll/reward ad is displayed " + prerollDisplayedCounter);

      //jQuery(".iframe").hide();
      removeMidrollAndReinit();
      //console.log("CMG::midrollorRewardAdCompleted::  cmgAdBreak starting the timer at: " + currentTime);
      gameInterstitialAdTimerVar = setTimeout(function () {
        currentTime = new Date();
        gameInterstitialAdTimerAction();
      }, adBreakInterval);
    }
  });

  Bolt.on('precontent_ad_video', Bolt.BOLT_AD_STARTED, function() {
    //ad starting so we can mark is_ad_started and clear the justAMomentLoaderTimer
    window.playwireAdStarted = true;
    window.is_ad_started = true;
    clearTimeout(justAMomentLoaderTimer);
      // do something
      console.log('CMG::midrollorRewardAdStarted BOLT_AD_STARTED Fired');
      //TODO hide the loading
      $("#afg_container").remove();
  });

  Bolt.on('precontent_ad_video', Bolt.BOLT_AD_REQUEST_START, function() {
    console.log("CMG::midrollorRewardAd ad_request_start 11 ... ");
    //ad starting so we can mark is_ad_started and clear the justAMomentLoaderTimer
    window.is_ad_started = true;
    window.playwireAdStarted = true;
    clearTimeout(justAMomentLoaderTimer);
    $("#afg_container .load-wrap").show();


  });

  Bolt.on('precontent_ad_video', Bolt.BOLT_AD_ERROR, function() {
    console.log("CMG::Midroll/reward ad is displayed - Ad Error" + prerollDisplayedCounter);
    if(midrollorRewardAdCompleted) { //remove ad only one time
      return;
    } else {

      //console.log("CMG::Midroll/reward ad is displayed - Ad Error" + prerollDisplayedCounter);
      //jQuery(".iframe").hide();
      //fallback to Google H5 Ads
      console.log("CMG:: fallback to Google H5 Ads");
      if(isRewardAd) {   //for rewarded ads use H5 ads as fallback
        cmgads_ga4_trackEvent('ad_event', ["action", "path"], ["Rewarded Ad: H5 Ad Requested", location.pathname.replace("/play", "")]);
        midrollorRewardAdCompleted = true;
        //H5 fallback ad starting so we can mark ad started and clear the justAMomentLoaderTimer
        window.is_ad_started = true;
        clearTimeout(justAMomentLoaderTimer);
        if (!window.playwireAdStarted) {
          console.log("CMG:: No Playwire ad started likely adblock skipping rewarded H5");
          removeMidrollAndReinit();
          return;
        }
        cmgRewardsAdBreakH5();
      } else {  //for midroll ads, display the game when there is no playwire ad

        //removeMidrollAndReinit();
        //document.dispatchEvent(adBreakStart);
        midrollorRewardAdCompleted = true; //set midrollorRewardAdCompleted to true so that h5 fallback ad displays
        cmgads_ga4_trackEvent('ad_event', ["action", "path"], ["Midroll Ad: H5 Ad Requested", location.pathname.replace("/play", "")]);
        if (!window.playwireAdStarted) {
          console.log("CMG:: No Playwire ad started likely adblock skipping H5 fallback");
          removeMidrollAndReinit();
          return;
        }
        cmgMidrollAdFallbackH5();
      }

      console.log('CMG::BOLT_AD_ERROR Fired at: ' +currentTime );
      /*console.log("CMG::BOLT_AD_ERROR : cmgAdBreak starting a new timer at: " + currentTime);
      gameInterstitialAdTimerVar = setTimeout(function () {
        currentTime = new Date();
        gameInterstitialAdTimerAction();
      }, adBreakInterval);
      */
    }
  });
}
