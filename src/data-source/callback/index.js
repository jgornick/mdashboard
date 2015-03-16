import _ from 'lodash';
import PollDataSource from '../poll';
import Connection from './connection';

export default class CallbackDataSource extends PollDataSource {
    /**
     * @inheritDoc
     */
    static get meta() {
        return {
            key: 'callback',
            name: 'Callback',
            description: 'Calls the specified callback.'
        };
    }

    /**
     * @inheritDoc
     */
    get connectionId() {
        return +new Date();
    }

    get callback() {
        return this._callback;
    }

    set callback(callback) {
        this._callback = callback;
    }

    createConnection() {
        var
            connection = new Connection();

        connection.pollInterval = this.pollInterval;
        connection.callback = this.callback;

        return connection;
    }
}