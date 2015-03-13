import fetch from 'whatwg-fetch';
import AbstractDataSourceConnection from '../connection/abstract';
import PollDataSourceConnection from '../poll/connection';

class Connection extends AbstractDataSourceConnection {
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

    request() {
        if (this.isStopped) {
            return;
        }

        fetch(this.url, {})
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

Object.assign(Connection.prototype, PollDataSourceConnection.prototype);

export default Connection;