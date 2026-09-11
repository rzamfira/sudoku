
export class Dispatcher {

    constructor() {
        this.observers = [];
    }

    subscribe(observerFunction) {
        this.observers.push(observerFunction);
        return this;
    }

    unsubscribe(observerFunction) {
        this.observers = this.observers.filter((observer) => observer !== observerFunction);
        return this;
    }

    dispatch(action) {
        this.notify(action);
    }

    notify(action) {
        this.observers.forEach(observer => {
            observer(action);
        })
    }

}


