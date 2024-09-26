document.getElementById('save').addEventListener('click', () => {
    const countryCode = document.getElementById('countryCode').value;
    chrome.storage.sync.set({ countryCode }, () => {
        console.log('Country code saved:', countryCode);
        alert(`Country code ` + countryCode + ` was saved!`);
        window.close(); 
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('countryCode', (data) => {
      if (data.countryCode) {
        document.getElementById('countryCode').value = data.countryCode;
        console.log('Loaded country code:', data.countryCode);
      }
    });
  });
  