chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "showAlert") {
      alert("Time is up! Take a break!");
    }
  });