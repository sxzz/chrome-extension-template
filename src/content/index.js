// 加载 inject 和 转发

import { sendMessageToBackend, sendMessageToInject } from './lib/message';

window.addEventListener('load', () => {
  const content = chrome.extension.getURL('js/inject.js');
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', content);
  document.body.appendChild(script);
});

const messageHandler = async event => {
  if (event?.data?.to !== 'chrome-ext-content') return;
  const response = await sendMessageToBackend(event.data.message);
  sendMessageToInject(event.data.id, response);
};
window.addEventListener('message', messageHandler, false);

chrome.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(msg => {
    sendMessageToInject(port.name, msg);
  });
});
