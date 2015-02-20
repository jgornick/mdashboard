/**
 * Class that manages instances of data sources.
 *
 * @extends {Marionette.Object}
 */
class DataSourcePool extends Marionette.Object {
    initialize() {
        this.dataSources = [];
        this.dataSourceConnections = [];
    }

    /**
     * Add a data source instance.
     *
     * @param {DataSource} dataSource
     *
     * @fires DataSourcePool#add
     *
     * @throws {Error} If data source instance with the same key is already registered.
     */
    add(dataSource) {
        if (this.get(dataSource.key)) {
            throw new Error('Data source with key is already registered.');
        }

        // Setup the data source connection either from an existing connection, or create a new one.
        if (dataSource.connection == null) {
            var
                connection = this.getConnection(dataSource.connectionId);

            if (connection == null) {
                connection = this.createConnection(dataSource);
                dataSource.connection = connection;

                this.dataSourceConnections[dataSource.connectionId] = connection;
            } else {
                dataSource.connection = connection;
            }
        }

        this.dataSources.push(dataSource);

        /**
         * Pool add event.
         *
         * @event DataSourcePool#add
         * @type {DataSource} dataSource
         */
        this.trigger('add', dataSource);
    }

    /**
     * Returns a data source instance defined by it's key.
     *
     * @param {String} key
     *
     * @return {DataSource}
     */
    get(key) {
        return _.find(
            this.dataSources,
            function(dataSource) {
                return dataSource.key == key;
            }
        );
    }

    /**
     * Return an already registered connection.
     *
     * @param  {String} connectionId
     *
     * @return {DataSourceConnection}
     */
    getConnection(connectionId) {
        return this.dataSourceConnections[connectionId];
    }

    createConnection(dataSource) {
        return DataSourceConnectionFactory.create(dataSource);
    }
}