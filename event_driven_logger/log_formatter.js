class LogFormatter{
    static format(type, message) {
        return `[${new Date().toISOString()}][${type.toUpperCase()}]: ${message}\n`;
    }
}

export default LogFormatter;