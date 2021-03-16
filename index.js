'use strict';
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const CatboxRedis = require('@hapi/catbox-redis');
const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');



const routes = require('./routes');
const init = async () => {

  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: process.env.HOST || 'localhost',
    cache: [
      {
        name: 'my_cache',
        provider: {
          constructor: CatboxRedis,
          options: {
            partition: 'my_cached_data',
            host: 'localhost',
            port: 6379
          },
        }
      }
    ]
  });

  const swaggerOptions = {
    info: {
      'title': 'Test API Documentation',
      'version': '0.0.1',
    }
  };
  await server.register([
    Inert,
    Vision,
  ]);
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  server.route(routes);
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();
