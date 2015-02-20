class HttpDataSourceConnection extends UrlDataSourceConnection {
    /**
     * @public
     * @return {String}
     */
    get method() {
        return this._method;
    }

    set method(method) {
        this._method = method;
    }

    constructor() {
        // Mixin PollDataSourceConnection
        Object.assign(this.prototype, PollDataSourceConnection.prototype);
        super();
    }

    request() {
        if (this.isStopped) {
            return;
        }

        fetch(this.url, { ... })
            .then(function(response) {
                if (this.isStopped) {
                    return;
                }

                this.trigger('data', response.body);
                this.delay(this.request);
            })
            .catch(function(error) {
                this.trigger('error', error);
                this.stop();
            });
    }

    startConnection() {
        this.startPolling();
        this.request();
    }

    stopConnection() {
        this.stopPolling();
    }
}

class HttpDataSource extends UrlDataSource {
    get method() {
        return this._method;
    }

    set method(method) {
        this._method = method;
    }

    constructor() {
        // Mixin PollDataSource
        Object.assign(this.prototype, PollDataSource.prototype);
        super();
    }

    getConnectionId() {
        return this.key;
    }

    createConnection() {
        var
            connection = new HttpDataSourceConnection();

        connection.method = this.method;
        connection.url = this.url;
        connection.query = this.query;
        connection.headers = this.headers;
        connection.body = this.body;
        connection.authUser = this.authUser;
        connection.authPass = this.authPass;

        return connection;
    }
}