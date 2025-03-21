class LogFormatter{
    static format(type, message) {
        return `[${new Date().toISOString()}][${type.toUpperCase()}]: ${message}`;
    }
}

export default LogFormatter;