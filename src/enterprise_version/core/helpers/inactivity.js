import toast from "react-hot-toast"
class TimeScheduler {
    timeoutIDs;

    constructor() {
        this.timeoutIDs = new Map();
    }

    addCallback = (callback, timeLapseMS, autoRemove) => {
        if (!this.timeoutIDs.has(timeLapseMS + callback)) {
            let timeoutID = setTimeout(callback, timeLapseMS);
            this.timeoutIDs.set(timeLapseMS + callback, timeoutID);
        }

        if (autoRemove !== false) {
            setTimeout(
                this.removeIdleTimeCallback, // Remove
                10000 + timeLapseMS, // 10 secs after
                callback, // the callback
                timeLapseMS, // is invoked.
            );
        }
    };

    removeCallback = (callback, timeLapseMS) => {
        let timeoutID = this.timeoutIDs.get(timeLapseMS + callback);
        if (timeoutID) {
            clearTimeout(timeoutID);
            this.timeoutIDs.delete(timeLapseMS + callback);
        }
    };
}

class IdleTimeScheduler extends TimeScheduler {
    events = [
        'load',
        'mousedown',
        'mousemove',
        'keydown',
        'keyup',
        'input',
        'scroll',
        'touchstart',
        'touchend',
        'touchcancel',
        'touchmove',
    ];
    callbacks;

    constructor() {
        super();
        this.events.forEach(name => {
            document.addEventListener(name, this.resetTimer, true);
        });

        this.callbacks = new Map();
    }

    addIdleTimeCallback = (callback, timeLapseMS) => {
        this.addCallback(callback, timeLapseMS, false);

        let callbacksArr = this.callbacks.get(timeLapseMS);
        if (!callbacksArr) {
            this.callbacks.set(timeLapseMS, [callback]);
        } else {
            if (!callbacksArr.includes(callback)) {
                callbacksArr.push(callback);
            }
        }
    };

    removeIdleTimeCallback = (callback, timeLapseMS) => {
        this.removeCallback(callback, timeLapseMS);

        let callbacksArr = this.callbacks.get(timeLapseMS);
        if (callbacksArr) {
            let index = callbacksArr.indexOf(callback);
            if (index !== -1) {
                callbacksArr.splice(index, 1);
            }
        }
    };

    resetTimer = () => {
        for (let [timeLapseMS, callbacksArr] of this.callbacks) {
            callbacksArr.forEach(callback => {
                // Clear the previous IDs
                let timeoutID = this.timeoutIDs.get(timeLapseMS + callback);
                clearTimeout(timeoutID);

                // Create new timeout IDs.
                timeoutID = setTimeout(callback, timeLapseMS);
                this.timeoutIDs.set(timeLapseMS + callback, timeoutID);
            });
        }
    };
}
export const Scheduler = new TimeScheduler();
export const IdleTimeScheduler = new IdleTimeScheduler();
