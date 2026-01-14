#!/usr/bin/env node

// Simple Redis connectivity and basic set/get test
const { createClient } = require('redis');

const url = process.env.REDIS_URL;

if (!url) {
  console.error('REDIS_URL not set. Export REDIS_URL and try again. Example: redis://localhost:6379');
  process.exit(2);
}

async function main() {
  const client = createClient({ url });
  client.on('error', err => console.error('Redis client error', err));
  await client.connect();
  console.log('Connected to Redis');

  // ping
  const pong = await client.ping();
  console.log('PING:', pong);

  // set/get
  await client.set('hrms:test', 'ok', { EX: 10 });
  const v = await client.get('hrms:test');
  console.log('GET hrms:test =', v);

  // del
  await client.del('hrms:test');

  await client.quit();
  console.log('Done.');
}

main().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
