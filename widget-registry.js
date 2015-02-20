class WidgetRegistry extends Marionette.Object {
    initialize() {
        this.widgets = [];
    }

    /**
     * Add a Widget class to the registry.
     *
     * @param {Widget} Widget
     *
     * @fires WidgetRegistry#add
     */
    add(Widget) {
        if (this.get(Widget.meta.key)) {
            throw new Error('Widget with key already exists');
        }

        this.widgets.push(Widget);

        /**
         * Registry add event.
         *
         * @event WidgetRegistry#add
         * @type {Widget} Widget The Widget class added.
         */
        this.trigger('add', Widget);
    }

    /**
     * Returns a Widget class defined by it's meta key.
     *
     * @param  {String} key
     *
     * @return {Widget}
     */
    get(key) {
        return _.find(
            this.widgets,
            function(Widget) {
                return Widget.meta.key == key;
            }
        );
    }

    /**
     * Returns a list of Widget classes in the registry.
     *
     * @return {Array} Returns an array of Widget.meta objects.
     */
    list() {
        return _.map(
            this.widgets,
            function(Widget) {
                return Widget.meta;
            }
        );
    }
}