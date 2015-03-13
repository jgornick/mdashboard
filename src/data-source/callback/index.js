import AbstractDataSource from '../abstract';
import PollDataSource from '../poll';
import Connection from './connection';

class DataSource extends AbstractDataSource {
    get callback() {
        return this._callback;
    }

    set callback(callback) {
        this._callback = callback;
    }

    createConnection() {
        var
            connection = new Connection();

        connection.callback = this.callback;

        return connection;
    }
}

Object.assign(DataSource.prototype, PollDataSource.prototype);

export default DataSource;