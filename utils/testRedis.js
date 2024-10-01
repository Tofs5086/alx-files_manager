const redisClient = require('./redis');

// Wait for a short period to allow the client to connect
setTimeout(() => {
  // Test the isAlive method
  console.log('Is Redis alive:', redisClient.isAlive());

  // Test the set method
  redisClient.set('testKey', 'testValue', 10)
    .then(() => {
      console.log('Value set successfully');

      // Test the get method
      return redisClient.get('testKey');
    })
    .then((value) => {
      console.log('Value retrieved:', value);

      // Test the del method
      return redisClient.del('testKey');
    })
    .then(() => {
      console.log('Value deleted successfully');

      // Verify deletion
      return redisClient.get('testKey');
    })
    .then((value) => {
      console.log('Value after deletion (should be null):', value);
    })
    .catch((err) => {
      console.error('Error:', err);
    });
}, 1000); // Wait for 1 second before running the test