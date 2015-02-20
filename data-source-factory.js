class DataSourceFactory extends Marionette.Object {
    initialize() {
        this.registry = null;
    }

    /**
     * @public
     * @property {DataSourceRegistry} registry
     */
    get registry() {
        return this._registry;
    }

    set registry(registry) {
        this._registry = registry;
    }

    /**
     * Create a DataSource instance by the specified key and options.
     *
     * @param  {String} key     The DataSource.meta.key value.
     * @param  {Object} options An object of options passed to the DataSource contructor.
     *
     * @return {DataSource}
     *
     * @throws {Error} If registry has not been set.
     * @throws {Error} If specified data source key not found in registry.
     */
    create(key, options) {
        if (this.registry == null) {
            throw new Error('Registry is not available.');
        }

        var
            DataSource = this.registry.get(key);

        if (DataSource == null) {
            throw new Error('DataSource key ' + key + ' not found in registry');
        }

        return new DataSource(options);
    }
}