DashboardComponent extends Marionette.Object {
    get layout() {
        return this._layout;
    }

    set layout(layout) {
        this._layout = layout;
    }

    get dashboards() {
        return this._dashboards;
    }

    set dashboards(dashboards) {
        this._dashboards = dashboards;
    }

    initialize() {
        this._layout = null;
        this._dashboards = null;
    }
}
