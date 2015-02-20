class SocketIoDataSourceConnection extends UrlDataSourceConnection {
    startConnection() {
        this.socket = io(this.url);
        // TODO: Capture connection errors and dispatch error
    }

    stopConnection() {
        this.socket.close();
    }

    registerEvent(eventName) {
        this.socket.on(eventName, _.bind(this.onSocketEvent, this, eventName));
    }

    onSocketEvent(eventName, data) {
        this.trigger(eventName, data);
    }

    onSocketError(error) {
        this.trigger('error', error);
    }
}

class SocketIoDataSource extends UrlDataSource {
    /**
     * @public
     * @return {String}
     */
    get event() {
        return this._event;
    }

    set event(event) {
        this._event = event;
    }

    getConnectionId() {
        return this.url;
    }

    createConnection() {
        var
            connection = new SocketIoDataSourceConnection();

        connection.url = this.url;
        connection.query = this.query;
        connection.headers = this.headers;
        connection.body = this.body;
        connection.authUser = this.authUser;
        connection.authPass = this.authPass;

        return connection;
    }
}