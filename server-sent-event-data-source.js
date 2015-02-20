class ServerSentEventDataSourceConnection extends UrlDataSourceConnection {
    startConnection() {
        this.eventSource = new EventSource(this.url);
        // TODO: Capture connection errors and dispatch error
    }

    stopConnection() {
        this.eventSource.close();
    }

    registerEvent(eventName) {
        this.eventSource.addEventListener(
            eventName,
            _.bind(this.onEventSourceEvent, this, eventName)
        );
    }

    onEventSourceEvent(eventName, data) {
        this.trigger(eventName, data);
    }

    onEventSourceError(error) {
        this.trigger('error', error);
    }
}

class ServerSentEventDataSource extends UrlDataSource {
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
            connection = new ServerSentEventDataSourceConnection();

        connection.url = this.url;
        connection.query = this.query;
        connection.headers = this.headers;
        connection.body = this.body;
        connection.authUser = this.authUser;
        connection.authPass = this.authPass;

        return connection;
    }
}