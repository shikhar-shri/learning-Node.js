import { EventEmitter } from "events"


class Logger extends EventEmitter{
    log(type, message) {
        this.emit(type.toUpperCase(), message);
    }
}

export default new Logger(); //Singleton