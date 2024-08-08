chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message.action,"Message received");
    if (message.action === "showAlert") {
      alert("Time is up! Take a break!");
    }
  });