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
        func(file);
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

//Consumes an array of stream generators and returns a single stream

function createPipeline(generators) {
    if(!generators || !generators.length) {
      return passiveStreamGenerator()();
    }
    var pipeline = generators.map(function(f) { return f(); });
    pipeline.reduce(function(a,b) { return a.pipe(b); });
    return pipeline[0];
};

// 'Black hole' which consumes all of its input and produces no output (useful for
// draining the last passiveStream in a chain)

function drain() {
  return through.obj(function(f,e,d) { d(); });
}

module.exports = {
  passiveStreamGenerator: passiveStreamGenerator,
  sideeffect: passiveStreamGenerator,
  passive: passiveStreamGenerator,
  createPipeline: createPipeline,
  collect: collect,
  drain: drain
};
