import _ from 'lodash';
import UrlDataSourceConnection from '../url/connection';

export default class ServerSentEventDataSourceConnection extends UrlDataSourceConnection {
    startConnection() {
        this.eventSource = new EventSource(this.url);
        // TODO: Capture connection errors and dispatch error
    }

    stopConnection() {
        this.eventSource.close();
    }

    registerEvent(eventName) {
        this.eventSource.addEventListener(
            eventName,
            _.bind(this.onEventSourceEvent, this, eventName)
        );
    }

    onEventSourceEvent(eventName, data) {
        this.trigger(eventName, data);
    }

    onEventSourceError(error) {
        this.trigger('error', error);
    }
}