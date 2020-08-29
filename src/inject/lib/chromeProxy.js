import DeepProxy from 'proxy-deep';
import { sendMessage, addMessageListener } from '../util/message';

const chromeProxy = new DeepProxy(() => '', {
  get(target, path, receiver) {
    return this.nest();
  },

  async apply(target, thisArg, args) {
    let result;

    const funName = this.path[this.path.length - 1];
    if (funName === 'addListener') {
      // 剔除第一个参数 listener
      const listener = args.shift();
      const listenerId = Math.random().toString(36);
      result = await sendMessage({
        action: 'addListener',
        path: this.path,
        args,
        listenerId,
      });
      addMessageListener(listenerId, listener);
    } else {
      result = await sendMessage({
        action: 'call',
        path: this.path,
        args,
      });
    }

    return result.status ? result.returnValue : Promise.reject(result.error);
  },
});

export default chromeProxy;
