import pify from 'pify';
import _ from 'lodash';

import { getFunction } from './util';

export const getOwnPropertyNames = async (msg, sender) => {
  const object = _.get(chrome, msg.path.join('.'));
  return Object.getOwnPropertyNames(object);
};

export const callFunction = async (msg, sender) => {
  let { fun } = getFunction(msg.path);
  fun = pify(fun, { multiArgs: true, errorFirst: false });
  return await fun(...msg.args);
};

export const addListener = async (msg, sender) => {
  const { fun, scope } = getFunction(msg.path);

  // 建立一个长连接用于发送监听数据
  const port = chrome.tabs.connect(sender.tab.id, { name: msg.listenerId });
  const listener = function () {
    console.log(arguments[0]);
    port.postMessage(Array.from(arguments));
  };
  port.onDisconnect.addListener(() => {
    scope.removeListener(listener);
    console.log('连接已断开，listener 已删除');
  });

  return fun(listener, ...msg.args);
};
