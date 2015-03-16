import DataSourceRegistry from '../src/data-source/registry';
import DataSourceFactory from '../src/data-source/factory';
import DataSourcePool from '../src/data-source/pool';
import CallbackDataSource from '../src/data-source/callback';
import HttpDataSource from '../src/data-source/http';
import JsonDataSource from '../src/data-source/json';
import SocketIoDataSource from '../src/data-source/socket-io';

var registry = new DataSourceRegistry();
registry.add(CallbackDataSource);
registry.add(HttpDataSource);
registry.add(JsonDataSource);
registry.add(SocketIoDataSource);

var factory = new DataSourceFactory()
factory.registry = registry;

var pool = new DataSourcePool();

var cbDataSource = factory.create('callback');
cbDataSource.key = 'local-date-time';
cbDataSource.pollInterval = 1000;
cbDataSource.callback = (done) => {
    done(null, +new Date());
};
cbDataSource.on('data', (data) => {
    console.log('local-date-time data', data);
});

pool.add(cbDataSource);
cbDataSource.start();

var jsonDataSource1 = factory.create('json');
jsonDataSource1.key = 'gmt-date-time-1';
jsonDataSource1.url = 'http://date.jsontest.com/';
jsonDataSource1.pollInterval = 1000;
jsonDataSource1.on('data', (data) => {
    console.log('gmt-date-time-1 data', data);
});

pool.add(jsonDataSource1);
jsonDataSource1.start();

var jsonDataSource2 = factory.create('json');
jsonDataSource2.key = 'gmt-date-time-2';
jsonDataSource2.url = 'http://date.jsontest.com/';
jsonDataSource2.pollInterval = 5000;
jsonDataSource2.on('data', (data) => {
    console.log('gmt-date-time-2 data', data);
});

pool.add(jsonDataSource2);
jsonDataSource2.start();