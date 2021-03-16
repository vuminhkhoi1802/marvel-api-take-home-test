module.exports = [
  {
    method: 'GET',
    path: '/health',
    handler: () => {
      return 'OK';
    }
  },
];
