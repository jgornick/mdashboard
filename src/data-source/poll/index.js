import AbstractDataSource from '../abstract';

export default class PollDataSource extends AbstractDataSource {
    get pollInterval() {
        return this._pollInterval;
    }

    set pollInterval(interval) {
        this._pollInterval = interval;

        if (this.connection) {
            this.connection.pollInterval = interval;
        }
    }

    get isPolling() {
        return this.connection.isPolling || false;
    }
}