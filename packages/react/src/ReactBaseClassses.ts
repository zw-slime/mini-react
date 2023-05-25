import ReactNoopUpdateQueue from "./ReactNoopUpdateQueue";

const emptyObject = {};

function Component(props,context,updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

Component.prototype.setState = function (partialState,callback) {
  this.updater.enqueueSetState(this,partialState,callback)
}
