export default class DataSource {
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