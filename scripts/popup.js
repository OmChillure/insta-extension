document.getElementById("sendButton").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const message = document.getElementById("message").value;

  if (!username || !message) {
    alert("Please enter both username and message.");
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].url.includes("instagram.com")) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "sendMessage",
        username: username,
        message: message,
      });
    } else {
      alert("This extension only works on Instagram.com");
    }
  });
});
