import ReactCurrentOwner from "../../ReactCurrentOwner";
import {REACT_ELEMENT_TYPE} from "../../../shared/ReactSymbols";

export function jsxDEV(type,config,maybeKey,source,self) {
  let propName;
  const props = {};

  let key = '';
  let ref = null;

  if(maybeKey !== undefined) {
    try {
      key = '' + maybeKey
    } catch (e) {
      console.error('key must be string')
    }
  }

  if(hasValidKey(config)) {
    key = '' + config.key
  }

  if(hasValidRef(config)) {
    ref = config.ref
  }


  for(propName in config) {
    if(Object.prototype.hasOwnProperty.call(config,propName)) {
      props[propName] = config[propName]
    }
  }

  return ReactElement(type,key,ref,self,source,ReactCurrentOwner.current,props)
}


export function hasValidKey(config) {
  return config?.key !== undefined
}

export function hasValidRef(config) {
  return config?.ref !== undefined;
}

export function ReactElement(type,key,ref,self,source,owner,props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,

    type,
    key,
    ref,
    props,
    _owner: owner,
    _store: false,
    _self: self,
    _source: source
  };

  return element
}


export function jsx(type,config,maybeKey) {
  let propName;
  const props = {};

  let key = '';
  let ref = null;

  if(maybeKey !== undefined) {
    try {
      key = '' + maybeKey
    } catch (e) {
      console.error('key must be string')
    }
  }

  if(hasValidKey(config)) {
    key = '' + config.key
  }

  if(hasValidRef(config)) {
    ref = config.ref
  }


  for(propName in config) {
    if(Object.prototype.hasOwnProperty.call(config,propName)) {
      props[propName] = config[propName]
    }
  }

  return ReactElement(type,key,ref,undefined,undefined,ReactCurrentOwner.current,props)
}
