const Eureka = require('eureka-js-client').Eureka;

const eurekaClient = new Eureka({
    instance: {
        app: 'order-management-service',
        hostName: process.env.HOSTNAME || 'order-service',
        ipAddr: process.env.HOST_IP || '127.0.0.1',
        statusPageUrl: `http://${process.env.HOSTNAME || 'order-service'}:${process.env.PORT || 3000}/health`,
        healthCheckUrl: `http://${process.env.HOSTNAME || 'order-service'}:${process.env.PORT || 3000}/health`,
        port: {
            '$': process.env.PORT || 3000,
            '@enabled': 'true',
        },
        vipAddress: 'order-management-service',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    eureka: {
        host: process.env.EUREKA_HOST || 'eureka-server',
        port: process.env.EUREKA_PORT || 8761,
        servicePath: '/eureka/apps/',
        maxRetries: 10,
        requestRetryDelay: 2000,
    },
});

module.exports = eurekaClient;