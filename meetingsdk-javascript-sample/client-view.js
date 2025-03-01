// Initialize Zoom SDK
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const sdkKey = "Ww7rD2QBRvKA54nCT_iJGA";
const meetingNumber = "89400098896";
const passWord = "DLu960";
const userName = "My_AI_Agent";
const authEndpoint = "http://localhost:4000";
const userEmail = "ankitjaain2003@gmail.com";
const leaveUrl = "https://zoom.us";
let currentStream = null;

// const cameraName = "HP Wide Vision HD Camera";
// currentStream = await setPreferredCamera(cameraName);
// Function to get available video devices
// async function getVideoDevices() {
//   const devices = await navigator.mediaDevices.enumerateDevices();
//   return devices.filter((device) => device.kind === "videoinput");
// }

// // Function to select a specific camera by name
// async function selectCamera(cameraName) {
//   const devices = await getVideoDevices();
//   console.log("Available devices:", devices);

//   const camera = devices.find((device) => device.label.includes(cameraName));
//   if (!camera) {
//     throw new Error(`Camera "${cameraName}" not found.`);
//   }

//   return camera.deviceId;
// }

// Function to set the desired camera as active
// async function setPreferredCamera(cameraName) {
//   try {
//     const deviceId = await selectCamera(cameraName);

//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: { deviceId: { exact: deviceId } },
//     });

//     console.log(`Camera "${cameraName}" activated.`);

//     // 🚀 Key Part: Keep the stream active before Zoom loads
//     stream.getVideoTracks()[0].enabled = true;

//     return stream;
//   } catch (error) {
//     console.error("Error selecting camera:", error);
//   }
// }

// Function to get Zoom signature from backend
function getSignature() {
  fetch(authEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ meetingNumber: meetingNumber, role: 0 }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Signature received:", data);
      startMeeting(data.signature);
    })
    .catch((error) => {
      console.error("Error fetching signature:", error);
    });
}
const printBtn = () => {
  const btn = document.querySelector("button");
  console.log(btn);
};
{
  /* <button class="preview-video__control-button" aria-label="Start Video" id="preview-video-control-button">flex */
}
// Function to start Zoom meeting
async function startMeeting(signature) {
  document.getElementById("zmmtg-root").style.display = "block";
  // we get the camera stream here
  const cameraName = "HP Wide Vision HD Camera";
  // currentStream = await setPreferredCamera(cameraName);
  ZoomMtg.init({
    leaveUrl: leaveUrl,
    patchJsMedia: true,
    leaveOnPageUnload: true,
    success: async () => {
      console.log("Zoom SDK initialized.");
      setTimeout(() => {
        printBtn();
        window.electronAPI.clickButton(); // Calls the Electron API to click
      }, 5000);
      // console.log("Using webcam:", hpVisionCamera.label);
      ZoomMtg.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        passWord: passWord,
        userName: userName,
        userEmail: userEmail,
        success: () => {
          console.log("Joined Zoom Meeting!");

          console.log("device id of this is");
        },
        error: (error) => {
          console.error("Error joining meeting:", error);
        },
      });
    },
    error: (error) => {
      console.error("Zoom initialization error:", error);
    },
  });
}
{
  /* <button type="button" class="footer-button-base__button ax-outline send-video-container__btn" aria-label="start my video" aria-disabled="false">…</button> */
}
function clickCameraSelectionButton() {
  const cameraButton = document.querySelectorAll(
    ".footer-button-base__button ax-outline send-video-container__btn"
  );
  console.log(cameraButton);
  if (cameraButton) {
    cameraButton.click();
    console.log("Camera selection button clicked.");
  } else {
    console.error("Camera selection button not found.");
  }
}
// Ensure camera is selected before Zoom loads
async function initializeZoomWithCamera(
  cameraName = "HP Wide Vision HD Camera"
) {
  // await setPreferredCamera(cameraName); // Pre-select camera before Zoom
  getSignature(); // Start Zoom meeting
}
