class PollDataSourceConnection {
    get pollInterval() {
        return this._pollInterval;
    }

    set pollInterval(interval) {
        this._pollInterval = interval;
    }

    get isPolling() {
        return this._isPolling || false;
    }

    startPolling() {
        if (this.pollInterval != null) {
            this._isPolling = true;
        }
    }

    stopPolling() {
        this._isPolling = false;
    }

    delay(callback) {
        if (this.isPolling == false || this.pollInterval == null) {
            this.stop();
        }

        _.delay(callback, this.pollInterval);
    }
}

class PollDataSource {
    get pollInterval() {
        return this.connection.pollInterval;
    }

    set pollInterval(interval) {
        this.connection.pollInterval = interval;
    }

    get isPolling() {
        return this.connection.isPolling || false;
    }
}