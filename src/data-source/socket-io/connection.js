import _ from 'lodash';
import io from 'socket.io-client';
import UrlDataSourceConnection from '../url/connection';

export default class SocketIoDataSourceConnection extends UrlDataSourceConnection {
    startConnection() {
        this.socket = io(this.url);
        // TODO: Capture connection errors and dispatch error
    }

    stopConnection() {
        this.socket.close();
    }

    registerEvent(eventName) {
        this.socket.on(eventName, _.bind(this.onSocketEvent, this, eventName));
    }

    onSocketEvent(eventName, data) {
        this.trigger(eventName, data);
    }

    onSocketError(error) {
        this.trigger('error', error);
    }
}