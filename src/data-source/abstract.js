import Marionette from 'backbone.marionette';

/**
 * @typedef {Object} DataSourceMeta
 * @property {String} key
 * @property {String} description
 */

/**
 * @typedef {Object[]} DataSourceSettings
 * @property {String} field
 * @property {String} label
 * @property {String} description
 * @property {String} type
 */

export default class AbstractDataSource extends Marionette.Object {
    /**
     * Return meta data for the data source.
     *
     * @abstract
     * @static
     * @return {DataSourceMeta}
     *
     * @throws {Error} If missing implementation.
     */
    static get meta() {
        throw new Error('Missing DataSource.meta implementation');
    }

    /**
     * Return a list of available settings for the data source.
     *
     * These settings represent what can be configured and how they are displayed.
     *
     * @static
     * @return {DataSourceSettings}
     */
    static get settings() {
        return [];
    }

    /**
     * @public
     * @property {String} key Data source instance key.
     */
    get key() {
        return this._key;
    }

    set key(key) {
        this._key = key;
    }

    /**
     * @public
     * @property {String} name Data source instance name.
     */
    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

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

    /**
     * @abstract
     * @public
     * @return {String} The identifier for a connection.
     * @throws {Error} If missing implementation.
     */
    get connectionId() {
        throw new Error('Missing DataSource#connectionId implementation');
    }

    /**
     * @public
     * @return {DataSourceConnection}
     */
    get connection() {
        return this._connection;
    }

    set connection(connection) {
        this._connection = connection;
    }

    constructor(options) {
        this._name = options.name || null;
        this._isStarted = false;
        this._isStopped = true;
        this._connection = null;

        super();
    }

    /**
     * Create the connection for the data source.
     *
     * @abstract
     * @return {DataSourceConnection}
     *
     * @throws {Error} If missing implementation.
     */
    createConnection() {
        throw new Error('Missing DataSource#createConnection implementation');
    }

    /**
     * Custom transform of new data available.
     *
     * @param  {Mixed} data
     *
     * @return {Mixed}
     */
    transformData(data) {
        return data;
    }

    /**
     * Start the data source.
     *
     * In the case the data source isn't a polling data source or an event based data source,
     * this will make the request, trigger new data, then stop.
     *
     * @fires DataSource#start
     */
    start() {
        this.triggerMethod('beforeStart');

        this._isStarted = true;
        this._isStopped = false;

        if (this.event != null) {
            this.connection.registerEvent(this.event);
        }

        this.listenTo(this.connection, this.event || 'data', this.onConnectionData);
        this.listenTo(this.connection, 'error', this.onConnectionError);

        this.connection.start();

        /**
         * DataSource start event
         *
         * @event DataSource#start
         */
        this.trigger('start');

        this.triggerMethod('afterStart');
    }

    /**
     * Stop the data source from polling or streaming data.
     *
     * @fires DataSource#stop
     */
    stop() {
        this.triggerMethod('beforeStop');

        this.stopListening(this.connection);
        this.connection.stop();

        this.isStarted = false;
        this.isStopped = true;

        /**
         * DataSource stop event
         *
         * @event DataSource#stop
         */
        this.trigger('stop');

        this.triggerMethod('afterStop');
    }

    /**
     * Connection data handler.
     *
     * Sends data through the DataStore#transformData method.
     *
     * @param {Mixed} data
     *
     * @fires DataSource#data
     */
    onConnectionData(data) {
        /**
         * DataSource data event
         *
         * @event DataSource#data
         */
        this.trigger('data', this.transformData(data));
    }

    /**
     * Connection error handler.
     *
     * @param {Error} error
     *
     * @fires DataSource#error
     */
    onConnectionError(error) {
        /**
         * DataSource error event
         *
         * @event DataSource#error
         */
        this.trigger('error', error);
    }
}