import ReactCurrentOwner from '../ReactCurrentOwner';
import { hasValidKey, hasValidRef } from './jsx/ReactJSXElement';

import {REACT_ELEMENT_TYPE} from "../../shared/ReactSymbols";

export function ReactElement(type,config,children) {
  let propName;
  const props: any = {};

  let key: null | string = null;
  let ref = null;
  let self = null;
  let source = null;

  if(hasValidKey(config)) {
    key = '' + config.key
  }

  if(hasValidRef(config)) {
    ref = config.ref
  }

  self = config?.__self === undefined ? null : config.__self;
  source = config?.__source === undefined ? null : config.__source;


  for(propName in config) {
    const val = config[propName];
    if (propName === 'key') {
      if (hasValidKey(config)) {
        key = '' + val;
      }
      continue;
    }
    if (propName === 'ref' && val !== undefined) {
      if (hasValidRef(config)) {
        ref = val;
      }
      continue;
    }
    if ({}.hasOwnProperty.call(config, propName)) {
      props[propName] = val;
    }
  }

  const childrenLength = arguments.length -2;
  if(childrenLength === 1) {
    props.children = children
  } else if(childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray
  }


  const element = {
    $$typeof: REACT_ELEMENT_TYPE,

    type,
    key,
    ref,
    props,
    _owner: ReactCurrentOwner.current,
    _store: false,
    _self: self,
    _source: source
  };

  return element
}
