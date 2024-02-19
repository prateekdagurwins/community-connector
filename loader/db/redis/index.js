// redisConfig
// Now
// import RedisStore from "connect-redis"
// import { createClient } from 'redis';
// import { privateKey } from '../../../config/privateKey.js'

// export const redisClient = createClient({socket: {host: privateKey.REDISH_HOST, port: privateKey.REDISH_PORT}});
// (async () => {
//   // Connect to redis server
//   await redisClient.connect();
// })();
// redisClient.on('connect', () => {
//   console.log('Connected!');
// });
// // Log any error that may occur to the console
// redisClient.on("error", (err) => {
//   console.log(`Error:${err}`);
// });
// export const redisConfig = {
//   store: new RedisStore({ client: redisClient}),
//   secret: privateKey.REDISH_SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false, maxAge: 3600000 }, // 1 hour in milliseconds
// };
