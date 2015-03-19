import _ from 'lodash';
import Marionette from 'backbone.marionette';

export default class DataSourceRegistry extends Marionette.Object {
    initialize() {
        this.dataSources = [];
    }

    /**
     * Add a DataSource class to the registry.
     *
     * @param {DataSource} DataSource
     *
     * @fires DataSourceRegistry#add
     */
    add(DataSource) {
        if (this.get(DataSource.meta.key)) {
            throw new Error('DataSource with key already exists');
        }

        this.dataSources.push(DataSource);

        /**
         * Registry add event.
         *
         * @event DataSourceRegistry#add
         * @type {DataSource} DataSource The DataSource class added.
         */
        this.trigger('add', DataSource);
    }

    /**
     * Returns a DataSource class defined by it's meta key.
     *
     * @param  {String} key
     *
     * @return {DataSource}
     */
    get(key) {
        return _.find(this.dataSources, { meta: { key: key } });
    }

    /**
     * Returns a list of DataSource classes in the registry.
     *
     * @return {Array} Returns an array of DataSource.meta objects.
     */
    list() {
        return _.map(this.dataSources, 'meta');
    }
}