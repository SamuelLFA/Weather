function injectSocketIO (io) {
    return (req, _, next) => {
        req.socketio = io;
    
        return next();
    };
}

module.exports = injectSocketIO;