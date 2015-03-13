import AbstractDataSource from '../abstract';

export default class DataSource extends AbstractDataSource {
    /**
     * @public
     * @return {String}
     */
    get url() {
        return this._url;
    }

    set url(url) {
        this._url = url;
    }

    /**
     * @public
     * @return {Array}
     */
    get query() {
        return this._query;
    }

    set query(query) {
        this._query = query;
    }

    /**
     * @public
     * @return {Array}
     */
    get headers() {
        return this._headers;
    }

    set headers(headers) {
        this._headers = headers;
    }

    /**
     * @public
     * @return {String}
     */
    get body() {
        return this._body;
    }

    set body(body) {
        this._body = body;
    }

    /**
     * @public
     * @return {String}
     */
    get authUser() {
        return this._authUser;
    }

    set authUser(authUser) {
        this._authUser = authUser;
    }

    /**
     * @public
     * @return {String}
     */
    get authPass() {
        return this._authPass;
    }

    set authPass(authPass) {
        this._authPass = authPass;
    }
}