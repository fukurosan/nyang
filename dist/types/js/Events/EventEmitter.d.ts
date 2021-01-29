export default class EventEmitter {
    events: {};
    on(eventName: any, callback: any): void;
    trigger(eventName: any, ...args: any[]): void;
}
