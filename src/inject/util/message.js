export const sendMessage = message =>
  new Promise(resolve => {
    const id = Math.random().toString(36);
    window.postMessage({ to: 'chrome-ext-content', id, message }, '*');

    const handler = event => {
      if (event?.data?.to !== 'chrome-ext-inject' || event?.data?.id !== id) return;
      window.removeEventListener('message', handler);
      resolve(event.data.message);
    };
    window.addEventListener('message', handler);
  });

export const addMessageListener = (id, fun) => {
  const handler = event => {
    if (event?.data?.to !== 'chrome-ext-inject' || event?.data?.id !== id) return;
    fun(...event.data.message);
  };
  window.addEventListener('message', handler);
};
