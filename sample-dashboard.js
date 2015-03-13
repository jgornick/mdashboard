localDate = new CallbackDataSource();
localDate.key = 'local-date-time';
localDate.name = 'Local Date/Time';
localDate.pollInterval = 1000;
localDate.callback = function(done) {
    done(null, (new Date()).toStirng();
};

gmtDate = new JsonDataSource();
gmtDate.key = 'gmt-date-time';
gmtDate.name = 'GMT Date/Time';
gmtDate.url = 'http://date.jsontest.com';
gmtDate.pollInterval = 1000;
gmtDate.transformData = function(data) {
    return data.date + ' ' + data.time;
};

md5 = new JsonDataSource();
md5.key = 'md5-text';
md5.name = 'MD5 of Text';
md5.url = 'http://md5.jsontest.com';
md5.pollInterval = 1000;

chat = new SocketIoDataSource();
chat.key = 'chat-new-message';
chat.name = 'Chat New Messages';
chat.url = 'http://chat.socket.io/';
chat.event = 'new message';

/////////////////////////////////////////////////////

registry = new DataSourceRegistry();
registry.add(CallbackDataSource);
registry.add(HttpDataSource);
registry.add(SocketIoDataSource);

factory = new DataSourceFactory()
factory.registry = registry;
factory.create('http', { ... });

/////////////////////////////////////////////////////

pool = new DataSourcePool();

// return a data source connection for local date, null if doesn't exist
pool.get(localDate);
// or
Radio.request('dataSourcePool', 'get', localDate);

// register the localDate data source
pool.register(localDate);
// or
Radio.command('dataSourcePool', 'register', localDate);


dscFactory = DataSourceConnectionFactory();
dscFactory.create(dataSource);