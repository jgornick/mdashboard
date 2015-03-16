import Marionette from 'backbone.marionette';

export default class AbstractDataSourceConnection extends Marionette.Object {
    /**
     * @public
     * @property {Boolean} isStarted
     */
    get isStarted() {
        return this._isStarted;
    }

    /**
     * @public
     * @property {Boolean} isStopped
     */
    get isStopped() {
        return this._isStopped;
    }

    initialize() {
        this._isStarted = false;
        this._isStopped = true;
    }

    /**
     * Start the data source connection.
     *
     * @fires DataSourceConnection#start
     */
    start() {
        if (this._isStarted) {
            return;
        }

        this.triggerMethod('beforeStart');

        this._isStarted = true;
        this._isStopped = false;

        this.startConnection();

        /**
         * DataSourceConnection start event
         *
         * @event DataSourceConnection#start
         */
        this.trigger('start');

        this.triggerMethod('afterStart');
    }

    /**
     * Stop the data source connection from polling or streaming data.
     *
     * @fires DataSourceConnection#stop
     */
    stop() {
        if (this._isStopped) {
            return;
        }

        this.triggerMethod('beforeStop');

        this._isStarted = false;
        this._isStopped = true;

        this.stopConnection();

        /**
         * DataSourceConnection stop event
         *
         * @event DataSourceConnection#stop
         */
        this.trigger('stop');

        this.triggerMethod('afterStop');
    }

    /**
     * Registers an event with the connection.
     *
     * This will monitor the specified event for the underlying connection
     * and trigger the event from the data source connection.
     *
     * @param {String} eventName
     */
    registerEvent(eventName) {
        throw new Error('Missing DataSourceConnection#registerEvent implementation');
    }

    /**
     * Extended classes should implement this method to start a connection or request.
     *
     * @throws {Error} If missing implementation.
     */
    startConnection() {
        throw new Error('Missing DataSourceConnection#startConnection implementation');
    }

    /**
     * Extended classes should implement this method to stop a connection or request.
     *
     * @throws {Error} If missing implementation.
     */
    stopConnection() {
        throw new Error('Missing DataSourceConnection#stopConnection implementation');
    }
}