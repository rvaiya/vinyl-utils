var q = require('q');
var through = require('through2');

// =================================================================================
// Custom Streams
// =================================================================================

// Streams with side effects (don't hurt me please)

function passiveStreamGenerator(func) {
  return function() {
    return through.obj(function(file, enc, cb) {
      this.push(file);
      cb();
      if(func)
        func();
    });
  };
}

// Returns a promise which resolves to an array containing all files output by
// a given stream

function collect(stream) {
  var p = q.defer();
  var result = [];
  stream
    .on('data', function(file) {
      result.push(file);
    })
    .on('end', function() {
      p.resolve(result);
    });
  return p.promise;
}


module.exports = {
  passiveStreamGenerator: passiveStreamGenerator,
  collect: collect,
};
