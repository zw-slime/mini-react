import {jsxDEV} from "./ReactJSXElement";

export function jsxWithValidation(type,props,key,isStaticChildren,source,self) {
  const validType = isValidElementType(type);

  if(!validType) {
    console.error('React.jsx type is invalid')
  }

  const element = jsxDEV(type,props,key,source,self);
  return element;
}

export function isValidElementType(type):boolean {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  }

  // 此处省略一大推 判断 symbol 类型 例如 provider contenxt forward memo lazy
  if(typeof type === 'object' &&  type !== null ) {
    return  true;
  }
  return  false;
}
