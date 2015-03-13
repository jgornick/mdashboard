import AbstractDataSourceConnection from '../connection/abstract';
import PollDataSourceConnection from '../poll/connection';

class Connection extends AbstractDataSourceConnection {
    get callback() {
        return this._callback;
    }

    set callback(callback) {
        this._callback = callback;
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

Object.assign(Connection.prototype, PollDataSourceConnection.prototype);

export default Connection;