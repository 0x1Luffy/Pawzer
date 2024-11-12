document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggle');
  
    // Check the current state from chrome storage
    chrome.storage.sync.get('extensionEnabled', function(data) {
      // Set the toggle button state based on storage
      toggleButton.checked = data.extensionEnabled || false;
    });
  
    toggleButton.addEventListener('change', function () {
      // Save the toggle state in chrome storage
      const isChecked = toggleButton.checked;
      chrome.storage.sync.set({ 'extensionEnabled': isChecked });
  
      if (isChecked) {
        // Enable the extension functionality
        chrome.runtime.sendMessage({ action: 'enable' });
      } else {
        // Disable the extension functionality
        chrome.runtime.sendMessage({ action: 'disable' });
      }
    });
  });
  