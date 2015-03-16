import _ from 'lodash';
import PollDataSource from '../poll';
import Connection from './connection';

export default class HttpDataSource extends PollDataSource {
    /**
     * @inheritDoc
     */
    static get meta() {
        return {
            key: 'http',
            name: 'HTTP',
            description: 'Requests data from an HTTP resource.'
        };
    }

    get method() {
        return this._method;
    }

    set method(method) {
        this._method = method;
    }

    /**
     * @inheritDoc
     */
    get connectionId() {
        return 'http' + this.url;
    }

    createConnection() {
        var
            connection = new Connection();

        connection.pollInterval = this.pollInterval;
        connection.method = this.method;
        connection.url = this.url;
        connection.query = this.query;
        connection.headers = this.headers;
        connection.body = this.body;
        connection.authUser = this.authUser;
        connection.authPass = this.authPass;

        return connection;
    }
}