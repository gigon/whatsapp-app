chrome.contextMenus.create({
    id: "sendToWhatsApp",
    title: "Send to WhatsApp",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sendToWhatsApp") {
        const selectedText = info.selectionText;
        const phoneNumberPattern = /\b(\+?\d{1,3})?[-.\s]?\(?\d{2,3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/;
        const match = selectedText.match(phoneNumberPattern);

        if (match) {
            let phoneNumber = match[0].replace(/[-.\s()]/g, '');
            if (!phoneNumber.startsWith('+')) {
                chrome.storage.sync.get('countryCode', (data) => {
                    const countryCode = data.countryCode || '972'; // Default to 972 if not set
                    phoneNumber = `${countryCode}${phoneNumber}`;
                    const whatsappUrl = `https://wa.me/${phoneNumber}`;
                    chrome.tabs.create({ url: whatsappUrl });
                });
            } else {
                const whatsappUrl = `https://wa.me/${phoneNumber}`;
                chrome.tabs.create({ url: whatsappUrl });
            }
        } else {
            alert("No valid phone number found in the selected text.");
        }
    }
});
