import chrome from './lib/chromeProxy';

window.chrome = chrome;

(async () => {
  const [cookies] = await chrome.cookies.getAll({
    url: 'https://www.google.com/',
  });
  console.log(cookies);

  chrome.cookies.onChanged.addListener(changeInfo => console.log(changeInfo));
})();
