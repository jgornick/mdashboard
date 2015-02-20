# Marionette Dashboard Framework

## Features

* Support for multiple dashboards
    * You can only view one at a time.
* Share read-only dashboard link (dashku)
    * A read-only dashboard will remove all of the widget chrome to be used for a "wallboard" scenario.
* Dashboard changes are real-time in other views (dashku)
    * When the owner of the dashboard makes a change to the dashboard or widget configuration, anyone viewing the dashboard will see the updates real-time.
* Dashboard is column based (gridster)
    * A dashboard grid will only allow 4 columns and will stretch to browser width.
* Register different widgets for use for each dashboard
    * Different custom widgets will be registered so a user can select from available widgets to add to the selected dashboard.
    * Maybe this is a case where you register a widget identifier and when a widget is added to the dashboard, the source code is lazy loaded?
* Add/remove/move widgets on dashboard
    * A user should be able to add a widget from the registered widget list, remove any widgets and rearrange them.
* Configure widgets (via modal)
    * If a widget provides settings, the user will have the ability to configure each widget via a form in a modal.
* Widgets support data source identifiers
    * For example, a widget will use an ID to know what data it should display and listen to.
* Widgets can contain multiple data source identifiers
    * A widget may display multiple data sources for widgets that may combine related data into a single widget.    
* Widgets update via different methods (e.g. pull, websocket)
    * Widget data can be scheduled to pull from a resource or be streamed (e.g. websocket, serverevents, postmessage, etc...).
    * Widgets that display time-series data will maintain their local copy of the dataset to display and updates will append to the dataset.
    * Widgets will update their views when a data source has new data. An event broker will dispatch the events to the widgets.
* Simple configuration model for dashboards and widgets
    * Keep the configuration for a dashboard and widget simple so implementation can be done very easily.
    * This also means keep configuration storage decoupled from the dashboard component.

## Domain Language

* DataSource
   * A data source provides data to consumers. The data source can be configured to:
      * Run JavaScript code at an interval
      * Request data from an HTTP service, optionally poll
      * Connect to a data streaming service (e.g. WebSocket, Socket.IO, Server-Sent Events) and subscribe to a specific event
      * Listen for postMessage events via a window
* DashboardComponent
    * The dashboard component is the main entry point for presenting dashboards and widgets.
* Dashboard
    * The dashboard represents a single dashboard with widgets.
* Widget
    *  A widget presents data source data to the user.

## Sample Dashboard

In order to cover some basics of data sources and dashboard widgets, we need to setup a sample dashboard to use as a litmus test. The follow are widgets that use different types of data sources and features required in the dashboard framework.

* Widget: Show Local Time via Client
    * Description: Displays the local time as text from the client every second.
    * DataSource: Callback
        * Interval: 1000ms
* Widget: Show GMT Time via Web Service
    * Description: Display the GMT time as text from the http://date.jsontest.com/ web service.
    * DataSource: HttpDataSource
        * Interval: 1000ms
        * Url: http://date.jsontest.com/
* Widget: Show MD5 of Text Value via Web Service
    * Description: Display an input and a button that when pressed will update the data source query parameter of "text" with the input value. The response from the service will include the original text and the MD5 value.
    * DataSource: HttpDataSource
        * Url: http://md5.jsontest.com/?text={}
* Widget: Show the last 5 messages from chat.socket.io.
    * Description: Display the last 5 messages from the chat.socket.io demo.
    * DataSource: SocketIoDataSource
        * Url: http://chat.socket.io/
        * Event: new message        
        

## Questions

* How can DataSources share connections and when does that come into play?
    * If we look at a DataSource that is stateless (Http), the only way to share a connection is when multiple DataSources are created using the exact same properties of another DataSource. This brings up the question of is this important to manage? 
    * What if we have 2 or more HttpDataSources that have the same url, header, query, message body, but has a different poll interval? I think this leads to use the existing connection, but update the poll interval to the min of the numbers. Maybe this is just useless too :P
    * A SocketIoDataSource automagically supports multiplexing of connections via the socket.io library.
    * A WebSocketDataSource, ServerSentEventDataSource, and PostMessageDataSource are event based data sources that share a single connection. This is where we'd want to use a single connection but listen for different events on that connection.
* How can we keep a list of available registered data sources to be displayed in the UI, when needed.
    * Currently, I think the DataSourcePool would be object that manages registered data sources as well as connections.
    * The other thing we may want to look at here is update a DataSource to use a "key" which is used programmatically, and change the "name" to be a display name. We could also add in other properties/meta like a description, icon representation, default units of the data source value.
* How can we keep a list of registered widgets that are available to add to the dashboard?
    * Is this a WidgetRegistry and when widget files are evaluated, they add themselves to the registry?
* How will widgets subscribe to specific data sources?
    * Original thoughts on this is that a Dashboard is given the DataSourcePool and that reference is given to each Widget. Since the DataSourcePool implements Backbone.Radio, the Widget can subscribe to events, execute commands, or request information about it's configured data source.
    * Another option would be to use Radio directly in a widget with the namespace of "dataSource".
* How can a data source be updated by a widget runtime?
    * An example of this is a widget is subscribed to a data source, but wants to change the query, headers, or message body for each request. The reason for this is when there's a widget that displays a table of data based on a search parameter. The search parameter is free-form text.
    * A widget may also want to change the data source runtime via a control change inside the widget view. For example, [http://appcens.us/ibeacon-dashboard/#](http://appcens.us/ibeacon-dashboard/#) you can change the time range the graph is showing runtime.
    * It's important to note that a data source url can not be changed runtime. If a widget needs to change a URL, then a new data source needs to be created. With that being said, currently, the only types of data sources that could be changed runtime are HttpDataSources.
    * If a data source properties are changed runtime, then this means that other consumers of that data source are going to see the same updated data.
    * Something to look at in the future may be if a data source properties need to be changed runtime, that data source is cloned temporarily and the consumer is subscribed to the cloned data source.
* If a widget references a data source by only it's name, how does the widget know what options it can change runtime?
    * For example, how will a widget know the data source it's referencing by a name is an HttpDataSource vs a CallbackDataSource?    

## Dashboard Pseudo

```
DashboardCollection extends Backbone.Collection
    model DashboardModel
    mixin Backbone.SingleChooser

DashboardModel extends Backbone.Model
    mixin Backbone.Chooser
    field id String
    field name String
    field widgets WidgetCollection

WidgetCollection extends Backbone.Collection
    model WidgetModel

WidgetModel extends Backbone.Model
    field id String
    field name String
    field columnPosition Number
    field columnWidth Number
    field rowPosition Number
    field rowHeight Number
    field dataSources Array [AbstractDataSource]
    field settings Object {key: value, ...}

DasboardLayoutView extends Marionette.LayoutView
    abstract getMainRegion

DashboardWidget extends Marionette.Object
    field view DashboardWidgetView
    field settingsView DashboardWidgetSettingsView 
    field model DashboardWidgetModel
    function serialize
    function deserialize

DashboardWidgetComponent extends Marionette.Object
    
DashboardComponent extends Marionette.Object
    setLayoutView
    getLayoutView
    setCollection
    getCollection
```

## Pseudo Code Usage

```
WeatherWidget extends DashboardWidget
    dataSource: function() {
        return new HttpDataSource({
            url: 'http://weather.com/' + this.getSetting('location'),
            interval: (1000 * 60 * 5)
        });
    }

CallCenterStatusWidget extends DashboardWidget
    dataSource: function() {
        return new SocketIoDataSource({
            url: 'http://callcenter.com/status'
        });
    }
    
FooDashboardModel extends DashboardModel
   
FooDashboardCollection extends DashboardCollection
   url: '/api/dashboards'
   
FooLayoutView extends DashboardLayoutView
   regions: {
      controls: '.foo-controls',
      main: '.foo-main'
   }
   
   getMainRegion => {
      return this.getRegion('main');
   }

// within a layout view
layoutView = new FooLayoutView();
collection = new FooDashboardCollection();
dashboard = new DashboardComponent();
dashboard.setLayoutView(layoutView);
dashboard.setCollection(collection);

collection.fetch();

this.getRegion('dashboard').show(dashboard.getLayoutView());
```
