chrome.contextMenus.create({
    id: "sendToWhatsApp",
    title: "Send to WhatsApp (Israel)",
    contexts: ["selection"]
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sendToWhatsApp") {
      const selectedText = info.selectionText;
      const phoneNumberPattern = /\b(\+972|972|0)?[-.\s]?\(?\d{2,3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/;
      const match = selectedText.match(phoneNumberPattern);
  
      if (match) {
        let phoneNumber = match[0].replace(/[-.\s()]/g, '');
        if (!phoneNumber.startsWith('+')) {
          const countryCode = '972'; // Default to 972
          if (phoneNumber.startsWith('0')) {
            phoneNumber = phoneNumber.substring(1); // Remove leading zero
          }
          if (!phoneNumber.startsWith('972')) {
            phoneNumber = `${countryCode}${phoneNumber}`;
          }
        } else {
          phoneNumber = phoneNumber.replace('+', ''); // Remove the plus sign
        }
        const whatsappUrl = `https://wa.me/${phoneNumber}`;
        chrome.tabs.create({ url: whatsappUrl });
      } else {
        alert("No valid Israeli mobile number found in the selected text.");
      }
    }
  });
  