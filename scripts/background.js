function openInstagramDMTab() {
  chrome.tabs.query(
    { url: "https://www.instagram.com/direct/inbox/*" },
    (tabs) => {
      if (tabs.length === 0) {
        // If no Instagram DM tab is open, create a new one
        chrome.tabs.create({ url: "https://www.instagram.com/direct/inbox/" });
      } else {
        // If an Instagram DM tab exists, activate it
        chrome.tabs.update(tabs[0].id, { active: true });
      }
    }
  );
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Instagram Helper installed");
  openInstagramDMTab();
});

chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("instagram.com/direct/inbox")) {
    chrome.tabs.sendMessage(tab.id, { action: "clickButton" });
  } else {
    openInstagramDMTab();
  }
});

// Listen for extension startup
chrome.runtime.onStartup.addListener(() => {
  openInstagramDMTab();
});
