'use strict';

var Promise = require('bluebird'),
    exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile,
    promisifiedReadFile = exerciseUtils.promisifiedReadFile,
    blue = exerciseUtils.blue,
    magenta = exerciseUtils.magenta;

var args = process.argv.slice(2).map(function(st){ return st.toUpperCase(); });

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE,
  problemF: problemF
};

// runs every problem given as command-line argument to process
args.forEach(function(arg){
  var problem = module.exports['problem' + arg];
  if (problem) problem();
});

function problemA () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. log poem one stanza one (ignore errors)
   *
   */

  // callback version
  // readFile('poem-one/stanza-01.txt', function (err, stanza) {
  //   console.log('-- A. callback version --');
  //   blue(stanza);
  // });

  // promise version
  // ???

   const readingStanza1 = promisifiedReadFile('poem-one/stanza-01.txt');
   readingStanza1.then(function(stanza){
        console.log('-- A. callback version --');
        blue(stanza);
   }, function(err){
        console.log(err);
   });

}

function problemB () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. log poem one stanza two and three, in any order
   *    (ignore errors)
   *
   */

  // callback version
  // readFile('poem-one/stanza-02.txt', function (err, stanza2) {
  //   console.log('-- B. Promise version (stanza two) --');
  //   blue(stanza2);
  // });
  // readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //   console.log('-- B. Promise version (stanza three) --');
  //   blue(stanza3);
  // });

  // promise version
  // ???

  const readingStanza2 = promisifiedReadFile('poem-one/stanza-02.txt');

   readingStanza2.then(function(stanza){
        console.log('-- B. Promise version (stanza two) --');
        blue(stanza);
   }, function(err){
        console.log(err);
   });

  const readingStanza3 = promisifiedReadFile('poem-one/stanza-03.txt');

   readingStanza3.then(function(stanza){
        console.log('-- B. Promise version (stanza three) --');
        blue(stanza);
   }, function(err){
        console.log(err);
   });


}

function problemC () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. read & log poem one stanza two and *then* read & log stanza three
   *    log 'done' when both are done
   *    (ignore errors)
   *
   */

  // callback version
  // readFile('poem-one/stanza-02.txt', function (err, stanza2) {
  //   console.log('-- C. callback version (stanza two) --');
  //   blue(stanza2);
  //   readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //     console.log('-- C. callback version (stanza three) --');
  //     blue(stanza3);
  //     console.log('-- C. callback version done --');
  //   });
  // });

  // promise version (hint: don't need to nest `then` calls)
  // ???
  const readingStanza2 = promisifiedReadFile('poem-one/stanza-02.txt');
  const readingStanza3 = promisifiedReadFile('poem-one/stanza-03.txt');

  const readingAllStanzas = Promise.all([readingStanza2, readingStanza3]);

   readingAllStanzas
          .then(function(content){
                blue(content[0]);
                blue(content[1]);
          },function(err){
                console.log(err);
          });


}

function problemD () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. log poem one stanza four or an error if it occurs
   *
   */

  // callback version
  // readFile('poem-one/wrong-file-name.txt', function (err, stanza4) {
  //   console.log('-- D. callback version (stanza four) --');
  //   if (err) magenta(err);
  //   else blue(stanza4);
  // });

  // promise version
  // ???

  const readingStanza4 = promisifiedReadFile('poem-one/wrong-file-name.txt');
  
  readingStanza4.then(function(stanza){
        console.log('-- D. callback version (stanza four) --');
        blue(stanza);
   }, function(err){
        magenta(err);
   });

}

function problemE () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. read & log poem one stanza three and *then* read & log stanza four
   *    or log an error if it occurs for either file read
   *
   */

  // callback version
  // readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //   console.log('-- E. callback version (stanza three) --');
  //   if (err) return magenta(err);
  //   blue(stanza3);
  //   readFile('poem-one/wrong-file-name.txt', function (err2, stanza4) {
  //     console.log('-- E. callback version (stanza four) --');
  //     if (err2) return magenta(err2);
  //     blue(stanza4);
  //   });
  // });

  // promise version
  // ???

  const readingStanza3 = promisifiedReadFile('poem-one/stanza-03.txt');
  const readingStanza4 = promisifiedReadFile('poem-one/stanza-04.txt');

  const readingAllStanzas = Promise.all([readingStanza3, readingStanza4]);

   readingAllStanzas
          .then(function(content){
                blue(content[0]);
                blue(content[1]);
          },function(err){
                magenta(err);
          });

}

function problemF () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * F. read & log poem one stanza three and *then* read & log stanza four
   *    or log an error if it occurs for either file read
   *    always log 'done' when everything is done
   *
   */

  // callback version
  // readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //   console.log('-- F. callback version (stanza three) --');
  //   if (err) {
  //     magenta(err);
  //     console.log('-- F. callback version done --');
  //     return;
  //   }
  //   blue(stanza3);
  //   readFile('poem-one/wrong-file-name.txt', function (err2, stanza4) {
  //     console.log('-- F. callback version (stanza four) --');
  //     if (err2) magenta(err2);
  //     else blue(stanza4);
  //     console.log('-- F. callback version done --');
  //   });
  // });

  // promise version
  // ???


  const readingStanza3 = promisifiedReadFile('poem-one/stanza-03.txt');
  const readingStanza4 = promisifiedReadFile('poem-one/stanza-04.txt');

  const readingAllStanzas = Promise.all([readingStanza3, readingStanza4]);

   readingAllStanzas
          .then(function(content){
                blue(content[0]);
                return readingAllStanzas();
          })
          .then(function(content){
                blue(content[1]);
          })
          .then(function(){
                blue("done");
          })
          .catch(function(err){
                magenta(err);
          });

}
