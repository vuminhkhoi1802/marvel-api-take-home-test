'use strict';
require('dotenv').config();
const marvelController = require('../controllers/marvel');

module.exports = [
  {
    method: 'GET',
    path: '/characters',
    handler: marvelController.getAllMarvelCharactersIds,
    options: {
      tags: ['api'],
        cache: {
          expiresIn: 30 * 1000,
          privacy: 'private'
        }
    }
  },
  {
    method: 'GET',
    path: '/characters/{characterId}',
    handler: marvelController.getMarvelCharacterById,
    options: {
      tags: ['api'],
    }
  }
];
