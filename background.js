let timer;
let time = 20; // 20 minutes in seconds
let isRunning = false;

chrome.runtime.onInstalled.addListener(() => {
  console.log("Pomodoro Quotes extension installed.");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startTimer") {
    if (!isRunning) {
      startTimer();
    }
    sendResponse({ status: "Timer started" });
  }
  if (message.action === "getTime") {
    sendResponse({ time: time });
  }
});

function startTimer() {
  isRunning = true;
  timer = setInterval(() => {
    if (time > 0) {
      time--;
    } else {
      clearInterval(timer);
      notifyContentScript();
      isRunning = false;
      time = 20; // Reset time to 20 minutes
    }
  }, 1000);
}

function notifyContentScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0 && !tabs[0].url.startsWith('chrome://')) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          alert("Time is up! Take a break!");
        },
      });
    } else {
      console.error("Cannot execute script on this URL.");
    }
  });
}