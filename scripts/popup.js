document.getElementById("activateButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].url.includes("instagram.com")) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggle" });
    } else {
      alert("This button only works on Instagram.com");
    }
  });
});
