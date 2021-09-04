var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel(function (err, channel) {
        if (err) {
            throw err;
        }
        const exchange = 'queuee'
        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });
        channel.assertQueue('', { exclusive: true }, function (err, q) {
            if (err) {
                throw err;
            }
            channel.bindQueue(q.queue, exchange, '');
            channel.consume(q.queue, function (msg) {
                if (msg.content) {
                    console.log(msg.content.toString());
                }
            },
                {
                    noAck: false
                });
        });
    });
});