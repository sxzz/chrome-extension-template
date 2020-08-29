# Chrome Extension Template

利用 ES6 的 Proxy 实现简单的 Chrome API 直接调用与监听事件

## Installation

```bash
git clone https://github.com/sxzz/chrome-extension-template
cd chrome-extension-template
yarn install
yarn dev
```


## Examples

```javascript
import chrome from './lib/chromeProxy';

const [cookies] = await chrome.cookies.getAll({
url: 'https://www.google.com/',
});
console.log(cookies);

chrome.cookies.onChanged.addListener(changeInfo => console.log(changeInfo)); 
```

## Reference

- https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html