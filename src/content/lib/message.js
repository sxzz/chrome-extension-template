export const sendMessageToBackend = message => new Promise(resolve => chrome.runtime.sendMessage(message, resolve));

export const sendMessageToInject = (id, message) => window.postMessage({ to: 'chrome-ext-inject', id, message });
