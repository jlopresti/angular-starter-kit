#!/usr/bin/env node

var _ = require('lodash');
var vorpal = require('vorpal')();
var fs = require('fs');
var S = require('string');
var path = require('path');
var mkdirp = require('mkdirp');
var pkg = require(path.join(__dirname, 'package.json'));

//load config
var config = require(path.join(__dirname + '/generator.config.json'));

//get selected bundle data
var bundleIds = config.bundles.map(function(bundle) {
  return bundle.id;
});

var questions = [
  {
    type: "list",
    name: "bundle",
    message: "What template bundle do you wish to use? ",
    choices: bundleIds,
    filter: function(val) { return val.toLowerCase(); }
  },
  {
    type: "input",
    name: "name",
    message: "What is the name of your component/service? Ex. (search-bar): ",
  }
];

//get feature components list
var getDirectories = function(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

var commonComponentsPath = path.join(__dirname, '/src/common/components/');
var featureComponentsPath = path.join(__dirname, '/src/components/');
var commonComponentNames = getDirectories(commonComponentsPath);
var featureComponentNames = getDirectories(featureComponentsPath);

vorpal.command('create', 'Create a new angular service or component.')
  .action(function(args, cb) {
    var self = this;

    self.prompt([
      {
        type: "list",
        name: "context",
        message: "What context does your component/service match? ",
        choices: ["common (code which is used to compose features)", "feature (unique functionality possibly leveraging common code)"],
      },
      {
        type: "confirm",
        name: "hasParent",
        message: "Will your component/service be a child of an existing component?",
      }], function(answers) {
        if (answers.hasParent) {
          self.prompt(
            {
              type: "list",
              name: "parent",
              message: "Which component is the parent?",
              choices: (answers.context.indexOf('common (') !== -1 ? commonComponentNames : featureComponentNames ),
              filter: function(val) { return val.toLowerCase(); }
            }, function(x) {
              answers = _.assignIn(answers, x);
              self.prompt(questions, function(y) {
                answers = _.assignIn(answers, y);
                cb(undefined, answers);
              });
            });
        } else {
          self.prompt(questions, function(x) {
            answers = _.assignIn(answers, x);
            cb(undefined, answers);
          });
        }
      });

  });

vorpal
  .delimiter('')
  .show()
  .parse(process.argv)
  .exec('create').then(function(data) {
    generateBundle(data);
  });



function generateBundle(data) {
  //get selected bundle data
  var bundle = config.bundles.filter(function(bundle) {
    return bundle.id == data.bundle;
  });

  //if we found a bundle then process it
  if (bundle.length) {
    var b = bundle[0];

    //figure output location
    var outputFolder = "";
    if (data.context.indexOf('common (') !== -1) {
      outputFolder = "/src/common";
    } else {
      outputFolder = "/src/components"
    }

    //determine folder path to create based on outputFolder info
    var targetFolder = "";
    if (data.hasParent) {
      if (data.context.indexOf('common (') !== -1) {
        if (data.bundle.indexOf('service') !== -1) {
          targetFolder = path.join(__dirname, outputFolder, "/components/", data.parent, "/services/", data.name);
        } else {
          targetFolder = path.join(__dirname, outputFolder, "/components/", data.parent, "/components/", data.name);
        }
      } else {
        if (data.bundle.indexOf('service') !== -1) {
          targetFolder = path.join(__dirname, outputFolder, "/", data.parent, "/services/", data.name);
        } else {
          targetFolder = path.join(__dirname, outputFolder, "/", data.parent, "/components/", data.name);
        }
      }
    } else {
      if (data.context.indexOf('common (') !== -1) {
        if (data.bundle.indexOf('component') !== -1) {
          targetFolder = path.join(__dirname, outputFolder, "/components/", data.name);
        } else {
          targetFolder = path.join(__dirname, outputFolder, "/services/", data.name);
        }
      } else {
        if (data.bundle.indexOf('component') !== -1) {
          targetFolder = path.join(__dirname, outputFolder, data.name);
        } else {
          console.log('Aborted! You are trying to make a feature service with no parent.  Maybe it should be a common service or a child of a feature component?');
          vorpal.exec('exit');
          process.exit(0);
        }
      }
    }

    //check to make sure we are not overwriting an existing folder by mistake
    if (fs.existsSync(targetFolder)) {
      console.log(targetFolder + " already exists.  You need to delete it if you wish to create a folder with that path.");
      process.exit(0);
    } else {
      //make new folder for template output in app
      mkdirp(targetFolder, function(err) {
        if (err) {
          console.log(err);
          vorpal.exec('exit');
          process.exit(0);
        } else {
          console.log('Created Directory @ ', targetFolder);
          write(b, targetFolder, data);
        }
      });
    }
  }
}

function write(b, targetFolder, data) {
  //figure out what the output file names should be
  var outputFileNames = b.files.map(function(file) {
    var fileName = path.join(targetFolder, "/", data.name + file.slice(file.indexOf(".")));
    return fileName;
  });

  //select bundle data
  switch (data.context.indexOf('common (')) {
    case -1:
      if (data.hasParent) {
        b.data = config.featureChild.data;
      } else {
        b.data = config.feature.data;
      }
      break;
    default:b
      if (data.hasParent) {
        b.data = config.commonChild.data;
      } else {
        b.data = config.common.data;
      }
      break;
  }

  //figure out different casings templates could require
  var caseNames = {
    name: data.name,
    camelCaseName: S(data.name).camelize().s,
    captialCaseName: S(data.name).camelize().s.charAt(0).toUpperCase() + S(data.name).camelize().s.slice(1),
    lowerCaseName: S(data.name).camelize().s.charAt(0).toLowerCase() + S(data.name).camelize().s.slice(1),
    upperCaseName: S(data.name).camelize().s.toUpperCase()
  }

  var dataProps = Object.getOwnPropertyNames(b.data);
  var parsedData = {};
  dataProps.forEach(function(prop, i) {
    if (prop != 'di') {
      var parsedProp = _.template(b.data[prop]);
      parsedData[prop] = parsedProp(caseNames)
    }
  });

  //auto generated vars for templates
  //get case names
  parsedData = _.extend(parsedData, caseNames);

  //massage DI data into proper usable syntaxs for templates
  var injectors = b.data.di.map(function(di) {
    return "'" + di + "'";
  });
  parsedData.injectors = injectors.toString();
  var params = b.data.di.map(function(di) {
    return "public " + di + ": any";
  });
  parsedData.params = params.toString()

  //load each template file and parse with lodash.template using config.data
  b.files.forEach(function(file, i) {
    var contents = fs.readFileSync(path.join(__dirname, b.templateFolder, file), 'utf8');
    var parsed = _.template(contents);
    fs.writeFileSync(outputFileNames[i], parsed(parsedData));
  });

  console.log(data.name, "(", data.bundle,") Created");
  vorpal.exec('exit');
  process.exit(0);
}



