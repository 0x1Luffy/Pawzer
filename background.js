let extensionEnabled = false;

// Listen for enable/disable messages from popup.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'enable') {
    extensionEnabled = true;
    console.log('Extension enabled');
  } else if (message.action === 'disable') {
    extensionEnabled = false;
    console.log('Extension disabled');
  }
});

// Handle tab activation and URL checking only if extension is enabled
chrome.tabs.onActivated.addListener((activeInfo) => {
  if (extensionEnabled) {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab.url && tab.url.includes('youtube.com/watch')) {
        chrome.scripting.executeScript({
          target: { tabId: activeInfo.tabId },
          files: ['content.js'],
        });
      }
    });
  }
});

// Handle tab updates and URL checking only if extension is enabled
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (extensionEnabled && changeInfo.status === 'complete' && tab.url && tab.url.includes('youtube.com/watch')) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js'],
    });
  }
});
