'use strict';

const _= require('lodash');
const marvel = require('./marvel');
const internal = require('./internal');
const all = _.concat(marvel, internal);
normalizeHandlers(all);

/**
 * Wraps handlers to cover for irregular service calls
 *
 * After Hapi v17 upgrade, each route handler must upon success return a value (not 'undefined')
 * This wrapper fixes for routes not complying with this standard.
 * @see https://yourrentals.atlassian.net/wiki/spaces/YR/pages/791150636/System+upgrade
 * @param routes
 */
function normalizeHandlers(routes) {
  routes.forEach((route) => {
    const defaultHandler = route.handler;
    route.handler = async (request, h) => {
      const result = await defaultHandler(request, h);
      return _.isUndefined(result) ? null : result;
    };
  });
}

module.exports = all;
