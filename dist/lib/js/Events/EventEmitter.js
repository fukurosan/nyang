"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EventEnum = _interopRequireDefault(require("./EventEnum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EventEmitter {
  /* Add all possible events from Enum to instance */
  constructor() {
    this.events = {};
    Object.keys(_EventEnum.default).forEach(key => {
      this.events[_EventEnum.default[key]] = [];
    });
  }
  /* Add a callback to an event */


  on(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName].push(callback);
    } else {
      throw new Error("No such event: " + eventName);
    }
  }
  /* Trigger an Event */


  trigger(eventName) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        callback.apply(null, args);
      });
    }
  }

}

exports.default = EventEmitter;