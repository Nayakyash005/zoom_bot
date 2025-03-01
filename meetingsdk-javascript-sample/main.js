const { app, BrowserWindow, ipcMain } = require("electron");
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: __dirname + "/preload.js",
      nodeIntegration: false, // Allows use of Node.js modules
      contextIsolation: true,
    },
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();
}
{
  /* <button class="preview-video__control-button" aria-label="Join Audio" id="preview-audio-control-button" title>…</button>flex */
}
app.whenReady().then(createWindow);
ipcMain.on("click-camera-button", () => {
  win.webContents.executeJavaScript(`


    const Toggle_button = document.querySelector(".preview__toggle");    
    if(Toggle_button){
      console.log(Toggle_button);
      Toggle_button.click();
      setTimeout(()=>{
        const ul = document.querySelector(".preview__dropdown-menu");
        console.log(ul);
        console.log("list of caMERS ",ul);
        ul.children[2].click();

        setTimeout(() => {
          const button = document.querySelector("#preview-video-control-button");
          const button2 = document.querySelector("#preview-audio-control-button");
          const button3 = document.querySelector(".zm-btn preview-join-button zm-btn--default zm-btn__outline--blue");
          if (button) {
            button.click();
            console.log("Camera button clicked by script.",button);
          } else {
            console.error("Camera button not found.");
          }
          if (button2) {
            button2.click();
            console.log("mike button clicked by script.",button);
          } else {
            console.error("mike button not found.");
          }
          if (button3) {
            button3.click();
            console.log("meet button clicked by script.",button);
          } else {
            console.error("meet button not found.");
          }
        }, 1000);

      },2000);
    }
   
  `);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
// dropdown
{
  /* <button class="preview__toggle" aria-label="More video controls">…</button>flex */
}
// ul
{
  /* <ul class="preview__dropdown-menu" role="menu" tabindex="0"></ul> */
}
{
  /* <button tabindex="0" type="button" class="zm-btn preview-join-button zm-btn--default zm-btn__outline--blue" aria-label>…</button> */
}
