import _ from 'lodash';
import PollDataSourceConnection from '../poll/connection';

class CallbackDataSourceConnection extends PollDataSourceConnection {
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

        this.callback((error, data) => {
            if (this.isStopped) {
                return;
            }

            if (error != null) {
                this.trigger('error', error);
                this.stop();
                return;
            }

            this.trigger('data', data);

            this.delay(_.bind(this.request, this));
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

export default CallbackDataSourceConnection;