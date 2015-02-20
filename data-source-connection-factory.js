class DataSourceConnectionFactory extends Marionette.Object {
    /**
     * Create a DataSourceConnection instance by the specified DataSource.
     *
     * @param  {DataSource} dataSource
     *
     * @return {DataSourceConnection}
     */
    create(dataSource) {
        return dataSource.createConnection();
    }
}