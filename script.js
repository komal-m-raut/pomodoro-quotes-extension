document.addEventListener("DOMContentLoaded", () => {
  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");
  const timerElement = document.getElementById("timer");
  const startButton = document.getElementById("start");

  async function fetchQuote() {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      quoteElement.textContent = `"${data.content}"`;
      authorElement.textContent = `- ${data.author}`;
    } catch (error) {
      quoteElement.textContent = "An error occurred while fetching the quote.";
      authorElement.textContent = "";
    }
  }

  function updateTimerDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  function startTimer() {
    fetchQuote();
    chrome.runtime.sendMessage({ action: "startTimer" }, (response) => {
      console.log(response.status);
    });
  }

  function getTime() {
    chrome.runtime.sendMessage({ action: "getTime" }, (response) => {
      updateTimerDisplay(response.time);
    });
  }

  startButton.addEventListener("click", () => {
    startTimer();
  });

  getTime();
  setInterval(getTime, 1000); // Update the timer display every second
});
