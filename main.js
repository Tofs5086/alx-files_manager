import redisClient from './utils/redis';

(async () => {
    // Wait for a short period to allow the client to connect
    setTimeout(async () => {
        console.log(redisClient.isAlive());
        console.log(await redisClient.get('myKey'));
        await redisClient.set('myKey', 12, 5);
        console.log(await redisClient.get('myKey'));

        setTimeout(async () => {
            console.log(await redisClient.get('myKey'));
        }, 1000 * 10);
    }, 1000); // Wait for 1 second before running the test
})();
