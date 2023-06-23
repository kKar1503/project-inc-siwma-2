module.exports = (opts) =>
  require('pino-pretty')({
    ...opts,
    useOnlyCustomProps: false,
    customColors: 'event:magenta',
    customLevels: 'event:35',
  });
