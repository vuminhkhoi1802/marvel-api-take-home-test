'use strict';
require('dotenv').config();
const _ = require('lodash');
const marvelAPI = require('marvel-api');
const limitPerCall = process.env.LIMIT;
const redis = require('redis');

const marvel = marvelAPI.createClient({
  publicKey: process.env.MARVEL_PUBLIC_KEY,
  privateKey: process.env.MARVEL_PRIVATE_KEY,
});

const getAllMarvelCharactersIds = async () => {
  let ids = [];
  return marvel.characters.findAll(limitPerCall).then((result) => {
    const rawData = result.data;
    rawData.forEach((item) => {
      ids.push(item.id);
    });
    return ids;
  }).catch((err) => err);
};

const getMarvelCharacterDetailById = async (id) => {
  return marvel.characters.find(id).then((result) => {
    return _.pick(result.data[0], ['id', 'name', 'description']); // the data is returned as a Map
  }).catch((err) => err);
};

exports.getAllMarvelCharactersIds = getAllMarvelCharactersIds;
exports.getMarvelCharacterDetailById = getMarvelCharacterDetailById;
