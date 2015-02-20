var Widget = Marionette.Object.extend(
    {
        model: null,
        view: null,
        settingsView: null,
        dataSources: [],

        registerDataSource(dataSource) {
            this.listenTo(dataSource, 'data', this.onDataSourceData);
            this.dataSources.push(dataSource);
        },

        onDataSourceData(data) {}
    },
    {
        getMeta() {
            return {
                key: null,
                name: null,
                description: null
            };
        }
    });

export default Widget;