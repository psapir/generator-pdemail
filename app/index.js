'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var PdemailGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the wonderful PD Email generator!'));

    var prompts = [
    {
      type: 'input',
      name: 'appname',
      message: 'What\'s the project name?',
      default: this.appname,
      validate: function (value) {
          // Trim input value and check if it's not empty
          if (!value.replace(/^\s+/g, '').replace(/\s+$/g, '')) {
              return 'Please provide a project name...';
          }
          return true;
      }
    },
    {
      type: 'input',
      name: 'productionDomain',
      message: 'What\'s your production domain? i.e: http://image.s4.exct.net/lib/fe9b157073640c7e77/m/1/',
      default: 'http://www.mydomain.com/',
      validate: function (value) {
          // Trim input value
          var domain = value.replace(/^\s+/g, '').replace(/\s+$/g, '');
          // Check if domain isn't empty
          if (!domain) {
              return 'Please provide a production domain...';
          }
          // Check if domain is valid
          if (!domain.match(/^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)) {
              return 'Please provide a valid production domain...';
          }
          return true;
      },
      filter: function (value) {
          // Make sure domain ends with a trailing slash
          if (value[value.length - 1] !== '/') {
              return value + '/';
          }
          return value;

      }
    },
    {
      type: 'confirm',
      name: 'litmus',
      message: 'Care for some litmus testing today?',
      default: true
    },
    {
      when: function( response ) {
        return response.litmus;
      },
      type: 'input',
      name: 'litmusDomain',
      message: 'What\'s your litmus domain? (Empty defaults to PD\'s domain)',
      default: 'https://metrics.litmus.com'
    },
    {
      when: function( props ) {
        return props.litmus;
      },
      type: 'input',
      name: 'litmusUser',
      message: 'What\'s your litmus user?',
      validate: function (value) {
          // Trim input value and check if it's not empty
          if (!value.replace(/^\s+/g, '').replace(/\s+$/g, '')) {
              return 'Please provide a litmus user...';
          }
          return true;
      }
    },
    {
      when: function( props ) {
        return props.litmus;
      },
      type: 'password',
      name: 'litmusPassword',
      message: 'What\'s your litmus password?',
      validate: function (value) {
          // Trim input value and check if it's not empty
          if (!value.replace(/^\s+/g, '').replace(/\s+$/g, '')) {
              return 'Please provide a litmus password...';
          }
          return true;
      }
    }
    ];

    this.prompt(prompts, function (props) {
      this.appname = props.appname;
      this.productionDomain = props.productionDomain;
      this.syntax = 'scss';
      this.litmus = props.litmus;
      this.litmusDomain = props.litmusDomain;
      this.litmusUser = props.litmusUser;
      this.litmusPassword = props.litmusPassword;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/img');
    this.mkdir('app/css');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_Gruntfile.js', 'Gruntfile.js');

    this.template('_index.html', 'app/index.html');
    this.copy('css/styles.'+this.syntax,'app/css/styles.'+this.syntax);
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = PdemailGenerator;
