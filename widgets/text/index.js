var
    WidgetRegistry = require('../../widget-registry'),
    Widget = require('../../widget'),
    Model = require('./model'),
    View = require('./view'),
    SettingsView = require('./settingsView');

var TextWidget = Widget.extend(
    {
        model: Model,
        view: View,
        settingsView: SettingsView
    },
    {
        getMeta() {
            return {
                key: 'text',
                name: 'Text',
                description: 'Display a value as text.'
            };
        }
    }
);

WidgetRegistry.register(TextWidget);

export default TextWidget;