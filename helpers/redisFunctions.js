const Redis = require("redis");
const Client = Redis.createClient({
  url: process.env.REDIS_URL,
});

// const Client = Redis.createClient();

const serverConnect = async () => {
  if (!Client.isOpen) {
    await Client.connect();
  }
};
const serverStop = async () => {
  await Client.disconnect();
};
// PING to remote REDIS SERVER
const pingRedis = async () => {
  await serverConnect();
  let hello = await Client.ping();
  return console.log(hello);
};
const getOrSetCache = async (key, getFn, expire) => {
  await serverConnect();
  let value = await Client.GET(key);
  if (value !== null) {
    return JSON.parse(value);
  }
  value = await getFn();
  await Client.SETEX(key, expire || 3600, JSON.stringify(value));
  //   await serverStop();
  return value;
};

const deleteOneKey = async (key) => {
  await serverConnect();
  await Client.DEL(key);
};

const flushRedis = async () => {
  await serverConnect();
  await Client.FLUSHALL();
};

const getALLKeys = async () => {
  await serverConnect();
  return await Client.keys("*");
};

const getSingleValueByKey = async (key) => {
  await serverConnect();
  return await Client.GET(key);
};
const setValueWithExpiration = async (key, expire, value) => {
  await serverConnect();
  return await Client.SETEX(key, expire, value);
};

module.exports = {
  getOrSetCache,
  serverConnect,
  serverStop,
  deleteOneKey,
  pingRedis,
  flushRedis,
  getALLKeys,
  getSingleValueByKey,
  setValueWithExpiration,
};
