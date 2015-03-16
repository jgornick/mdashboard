import HttpDataSource from '../http';

export default class JsonDataSource extends HttpDataSource {
    static get meta() {
        return {
            key: 'json',
            name: 'JSON',
            description: 'Loads JSON data from a URL.'
        }
    }

    transformData(data) {
        return JSON.parse(data);
    }
}