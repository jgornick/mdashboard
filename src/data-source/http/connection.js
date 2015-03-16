import _ from 'lodash';
import PollDataSourceConnection from '../poll/connection';

export default class HttpDataSourceConnection extends PollDataSourceConnection {
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
            .then((response) => {
                if (this.isStopped) {
                    return;
                }

                return response.text();
            })
            .then((data) => {
                this.trigger('data', data);
                this.delay(_.bind(this.request, this));
            })
            .catch((error) => {
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