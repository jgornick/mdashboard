class CallbackDataSourceConnection extends DataSourceConnection {
    get callback() {
        return this._callback;
    }

    set callback(callback) {
        this._callback = callback;
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

        this.callback(function(error, data) {
            if (this.isStopped) {
                return;
            }

            if (error != null) {
                this.trigger('error', error);
                this.stop();
                return;
            }

            this.trigger('data', data);

            this.delay(this.request);
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

class CallbackDataSource extends DataSource {
    get callback() {
        return this._callback;
    }

    set callback(callback) {
        this._callback = callback;
    }

    constructor() {
        // Mixin PollDataSource
        Object.assign(this.prototype, PollDataSource.prototype);
        super();
    }

    createConnection() {
        var
            connection = new CallbackDataSourceConnection();

        connection.callback = this.callback;

        return connection;
    }
}