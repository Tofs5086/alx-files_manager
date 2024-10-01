import { promisify } from 'util';
import { createClient } from 'redis';
const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.connected = false;

    this.client.on('connect', () => {
      this.connected = true;
    });

    this.client.on('error', (err) => {
      console.error('Redis client error:', err);
    });

    // Wait for a short period to allow the client to connect
    setTimeout(() => {
      if (!this.client.connected) {
        console.error('Redis client failed to connect');
      }
    }, 1000); // Wait for 1 second
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;