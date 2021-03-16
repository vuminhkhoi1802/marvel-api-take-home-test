const marvelService = require('../services/marvel');

const getAllMarvelCharactersIds = async () => {
  try {
      return await marvelService.getAllMarvelCharactersIds();
  } catch (err) {
    console.log('ERROR WHEN FETCHING MARVEL CHARACTERS IDS', {
      error: err,
    });
    throw err;
  }
};

const getMarvelCharacterById = async (request) => {
  try {
    return await marvelService.getMarvelCharacterDetailById(request.params.characterId);
  } catch (err) {
    console.log('ERROR WHEN FETCHING MARVEL CHARACTER DETAIL', {
      error: err,
    });
    throw err;
  }
};
exports.getAllMarvelCharactersIds = getAllMarvelCharactersIds;
exports.getMarvelCharacterById = getMarvelCharacterById;
