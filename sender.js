const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError;
        }
        const queue = 'queuee'
        const mes = 'Hello world'
        channel.assertExchange(queue, 'fanout', { durable: false });
        channel.publish(queue, "", Buffer.from(JSON.stringify(mes)));
        console.log('Message send successfully')

    })
    setTimeout(() => {
        connection.close();
    }, 500);

});