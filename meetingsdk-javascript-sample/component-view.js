const client = ZoomMtgEmbedded.createClient();

let meetingSDKElement = document.getElementById("meetingSDKElement");

var sdkKey = "NWboYTe6TqiXlViY5DydgQ";
// var meetingNumber = "75988737050";
// var passWord = "CQ6FH7";
var meetingNumber = "81605096086";
var passWord = "uSC7GD";
var userName = "My_AI_Agent";

var authEndpoint = "http://localhost:4000";
var userEmail = "ankitjaain2003@gmail.com";
var registrantToken = "";
var zakToken = "";
var role = 0;

function getSignature() {
  fetch(authEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      meetingNumber: meetingNumber,
      role: role,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      startMeeting(data.signature);
    })
    .catch((error) => {
      console.log(error);
    });
}

function startMeeting(signature) {
  client
    .init({
      zoomAppRoot: meetingSDKElement,
      language: "en-US",
      patchJsMedia: true,
      leaveOnPageUnload: true,
    })
    .then(() => {
      client
        .join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          password: passWord,
          userName: userName,
        })
        .then(() => {
          // enableScreenShare();
          console.log("joined successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

function enableScreenShare() {
  ZoomMtg.shareScreen({
    success: () => console.log("Screen start sharing"),
    error: () => console.log("error sharing screen"),
  });
}
