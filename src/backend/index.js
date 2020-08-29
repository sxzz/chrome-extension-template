import { callFunction, getOwnPropertyNames, addListener } from './lib/handler';

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg?.type === 'SIGN_CONNECT') {
    sendResponse('Connected!');
    return;
  }

  let error = null;
  let returnValue = null;

  switch (msg.action) {
    case 'call':
      returnValue = callFunction(msg, sender);
      break;
    case 'getOwnPropertyNames':
      returnValue = getOwnPropertyNames(msg, sender);
      break;
    case 'addListener':
      returnValue = addListener(msg, sender);
      break;
    default:
      returnValue = 'UNKNOWN_ACTION';
      break;
  }
  returnValue = await returnValue.catch(err => {
    error = err;
    return null;
  });

  const response = {
    status: !error,
    error: error + '',
    returnValue,
  };
  console.log(response);
  sendResponse(response);
});
