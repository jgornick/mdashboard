import UrlDataSource from '../url';
import Connection from './connection';

export default class DataSource extends UrlDataSource {
    /**
     * @public
     * @return {String}
     */
    get event() {
        return this._event;
    }

    set event(event) {
        this._event = event;
    }

    getConnectionId() {
        return this.url;
    }

    createConnection() {
        var
            connection = new Connection();

        connection.url = this.url;
        connection.query = this.query;
        connection.headers = this.headers;
        connection.body = this.body;
        connection.authUser = this.authUser;
        connection.authPass = this.authPass;

        return connection;
    }
}