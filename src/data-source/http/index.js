import AbstractDataSource from '../abstract';
import PollDataSource from '../poll';
import Connection from './connection';

class DataSource extends AbstractDataSource {
    get method() {
        return this._method;
    }

    set method(method) {
        this._method = method;
    }

    getConnectionId() {
        return this.key;
    }

    createConnection() {
        var
            connection = new Connection();

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

Object.assign(DataSource.prototype, PollDataSource.prototype);

export default DataSource;