class JsonDataSource extends HttpDataSource {
    static get meta() {
        return {
            name: 'JSON',
            description: 'Loads JSON data from a URL.'
        }
    }

    static get settings() {
        // TODO: Could these settings be represented as a model/view?
        return [
            {
                field: 'name',
                label: 'Name',
                description: 'Specify the name for the data source.'
                type: 'text'
            },
            {
                field: 'url',
                label: 'URL',
                description: 'URL for the data source.'
                type: 'url'
            },
            {
                field: 'method',
                label: 'Method',
                type: 'select',
                options: [
                    {
                        name: 'GET',
                        value: 'GET'
                    },
                    {
                        name: 'POST',
                        value: 'POST'
                    },
                    {
                        name: 'PUT',
                        value: 'PUT'
                    },
                    {
                        name: 'DELETE',
                        value: 'DELETE'
                    }
                ]
            }
        ];
    }

    transformData(data) {
        return JSON.parse(data);
    }
}