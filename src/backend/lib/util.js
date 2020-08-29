import _ from 'lodash';

export const getFunction = path => {
  const prop = path.join('.');
  let fun = _.get(chrome, prop);
  if (!fun || typeof fun !== 'function') {
    throw new Error(`"${prop}" is not a function, instead ${typeof fun}.`);
  }

  path.pop();
  const scope = _.get(chrome, path.join('.'));
  fun = fun.bind(scope);

  return { fun, scope };
};
