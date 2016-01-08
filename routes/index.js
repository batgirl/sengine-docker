var express = require('express');
var router = express.Router();

var Promise = require('promise');
var execPromise = require('child-process-promise').exec;

var fs = require('fs');
var exec = require('child_process').exec,
    child;

var randomString = function(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
var randomDirName = new Promise(function (resolve, reject) {
  resolve(randomString(Math.floor(Math.random() * (12 - 2 + 1)) + 2));
});

//random port
var portArray = [];  //should be env variable
var initializePortArray = function (min, max) {
  for (var i = min; i < max; i++) {
    portArray.push(i);
  }
  return (portArray);
};
initializePortArray(3000, 5000);
var randomizePort = function (portArray) {
  return (Math.floor(Math.random() * (portArray.length)));
};

function executionEnvironment (language, command, fileName, req, res) {
  randomDirName.then(function (dirResponse) {
    return execPromise('mkdir public/' + String(language) + '/' + String(dirResponse))
      .then(function (response) {
        console.log(response)
        return execPromise('touch public/' + String(language) + '/' + String(dirResponse) + '/' + String(fileName))
          .then(function (response) {
            console.log(response)
            return dirResponse;
          })
      })
  })
  .then(function (dirResponse) {
    fs.writeFile('public/' + String(language) + '/' + String(dirResponse) + '/' + String(fileName), req.body.data, function (err) {
      if(err) throw err;
      console.log('wrote to file');
      console.log(dirResponse);
      execPromise('docker run --read-only --rm -v `pwd`/public/' + String(language) + '/' + String(dirResponse) + '/:/data:ro sengine/' + String(language) + ' ' + String(command) + ' ' + String(fileName))
        .then(function (response) {
          console.log('stderr:  ' + response.stderr)
          console.log("stdout:  " + response.stdout)
          res.send(response);
          return response;
        })
        .fail(function (err) {
          res.send(err);
        })
        .then(function (response) {
          console.log("about to delete");
          execPromise('docker rm `docker ps --no-trunc -aq`');
          execPromise('rm -rf public/' + String(language) + '/' + String(dirResponse));
        });
    });
  });
}

function hostEnvironment (language, fileName, req, res) {
  randomDirName.then(function (dirResponse) {
    return execPromise('mkdir public/' + String(language) + '/' + String(dirResponse))
      .then(function (response) {
        console.log(response)
        return execPromise('touch public/' + String(language) + '/' + String(dirResponse) + '/' + String(fileName))
          .then(function (response) {
            console.log(response)
            return dirResponse;
          })
      })
  })
  .then(function (dirResponse) {
    fs.writeFile('public/' + String(language) + '/' + String(dirResponse) + '/' + String(fileName), req.body.data, function (err) {
      if(err) throw err;
      console.log('wrote to file');
      console.log(dirResponse);
      var randomNum = randomizePort(portArray);
      var randomPort = portArray[randomNum];
      execPromise('docker run --read-only -v `pwd`/public/' + String(language) + '/' + String(dirResponse) + '/:/usr/src/static-host/public/:ro -p ' + Number(randomPort) + ':8080 -d kevgary/static-host')
        .then(function (response) {
          // console.log('stderr:  ' + response.stderr)
          // console.log("stdout:  " + response.stdout)
          // res.send(response);
          // return response;
          console.log('yoo0000999991111------')
          res.send('http://104.236.15.225:' + String(randomPort));
          return response;
        })
        .fail(function (err) {
          res.send(err);
        })
        // .then(function (response) {
        //   console.log("about to delete");
        //   execPromise('docker rm `docker ps --no-trunc -aq`');
        //   execPromise('rm -rf public/' + String(language) + '/' + String(dirResponse));
        // });
    });
  });
}

router.post('/javascript', function(req, res, next) {
  executionEnvironment('javascript', 'node', 'sample.js', req, res);
});

router.post('/ruby', function(req, res, next) {
  executionEnvironment('ruby', 'ruby', 'sample.rb', req, res);
});

router.post('/python', function(req, res, next) {
  executionEnvironment('python', 'python', 'sample.py', req, res);
});

router.post('/html', function(req ,res, next) {
  hostEnvironment('html', 'index.html', req, res);
})

// router.post('/php', function(req, res, next) {
//   executionEnvironment('php', 'php', 'sample.php', req, res);
// });

// router.post('/perl', function(req, res, next) {
//   executionEnvironment('perl', 'perl', 'sample.pl', req, res);
// });


module.exports = router;
