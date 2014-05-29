'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var inquirer = require("inquirer");

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
      type: 'input',
      name: 'htmlTemplate',
      message: 'Specify your HTML template',
      default: 'https://gist.githubusercontent.com/psapir/b5c432b6982466ea0d58/raw/462510a0457d85f89d4354b237dbe53f76832448/index.html',
      validate: function (value) {
          // Trim input value
          var domain = value.replace(/^\s+/g, '').replace(/\s+$/g, '');
          // Check if domain isn't empty
          if (!domain) {
              return 'Please provide a template...';
          }
          // Check if domain is valid
          if (!domain.match(/^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)) {
              return 'Please provide a valid template...';
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
      type: 'input',
      name: 'scssTemplate',
      message: 'Specify your SCSS template',
      default: 'https://gist.githubusercontent.com/psapir/b5c432b6982466ea0d58/raw/dd92f3d2a709b82e8a28818e761266e48f4eabba/styles.scss',
      validate: function (value) {
          // Trim input value
          var domain = value.replace(/^\s+/g, '').replace(/\s+$/g, '');
          // Check if domain isn't empty
          if (!domain) {
              return 'Please provide a template...';
          }
          // Check if domain is valid
          if (!domain.match(/^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)) {
              return 'Please provide a valid template...';
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
    },
    {
      when: function( props ) {
        return props.litmus;
      },
      type: 'checkbox',
      name: 'litmusClients',
      message: 'Which clients would you like to test?',
      choices: [
      new inquirer.Separator("Mobile devices:"),
      {
        name: "Android 2.3",
        value:'"android22"',
        checked: true
      },
      {
        name: "Android 4.2",
        value:'"android4"',
        checked: true
      },
      {
        name: "Gmail App (Android)",
        value:'"androidgmailapp"',
        checked: true
      },
      {
        name: "iPhone 4s",
        value:'"iphone4"',
        checked: true
      },
      {
        name: "iPhone 5",
        value:'"iphone5"',
        checked: true
      },
      {
        name: "iPhone 5s",
        value:'"iphone5s"',
        checked: true
      },
      {
        name: "iPad (Retina)",
        value:'"ipad"',
        checked: true
      },
      {
        name: "iPad mini",
        value:'"ipadmini"',
        checked: true
      },
      {
        name: "Windows Phone 8",
        value:'"windowsphone8"',
        checked: true
      },  
      new inquirer.Separator("Web based clients:"),
      {
        name: "AOL Mail (Explorer)",
        value:'"aolonline"',
        checked: true
      },
      {
        name: "AOL Mail (Firefox)",
        value:'"ffaolonline"',
        checked: true
      },
      {
        name: "AOL Mail (Chrome)",
        value:'"chromeaolonline"',
        checked: true
      },
      {
        name: "Gmail (Explorer)",
        value:'"gmailnew"',
        checked: true
      },
      {
        name: "Gmail (Firefox)",
        value:'"ffgmailnew"',
        checked: true
      },
      {
        name: "Gmail (Chrome)",
        value:'"chromegmailnew"',
        checked: true
      },
      {
        name: "Outlook.com (Explorer)",
        value:'"outlookcom"',
        checked: true
      },
      {
        name: "Outlook.com (Firefox)",
        value:'"ffoutlookcom"',
        checked: true
      },
      {
        name: "Outlook.com (Chrome)",
        value:'"chromeoutlookcom"',
        checked: true
      },
      {
        name: "Yahoo! Mail (Explorer)",
        value:'"yahoo"',
        checked: true
      },
      {
        name: "Yahoo! Mail (Firefox)",
        value:'"ffyahoo"',
        checked: true
      },
      {
        name: "Yahoo! Mail (Chrome)",
        value:'"chromeyahoo"',
        checked: true
      },
      new inquirer.Separator("Desktop clients:"),
      {
        name: "Lotus Notes 8",
        value:'"notes8"',
        checked: true
      },
      {
        name: "Lotus Notes 8.5",
        value:'"notes85"',
        checked: true
      },
      {
        name: "Outlook 2000",
        value:'"ol2000"',
        checked: true
      },
      {
        name: "Outlook 2002",
        value:'"ol2002"',
        checked: true
      },
      {
        name: "Outlook 2003",
        value:'"ol2003"',
        checked: true
      },
      {
        name: "Outlook 2007",
        value:'"ol2007"',
        checked: true
      },
      {
        name: "Outlook 2010",
        value:'"ol2010"',
        checked: true
      },
      {
        name: "Outlook 2011 (Mac)",
        value:'"ol2011"',
        checked: true
      },
      {
        name: "Outlook 2013",
        value:'"ol2013"',
        checked: true
      },
      {
        name: "Thunderbird latest",
        value:'"thunderbirdlatest"',
        checked: true
      },
      {
        name: "Thunderbird latest",
        value:'"thunderbirdlatest"',
        checked: true
      },
      {
        name: "Apple Mail 5",
        value:'"appmail5"',
        checked: true
      },
      {
        name: "Apple Mail 6",
        value:'"appmail6"',
        checked: true
      }
    ],
    validate: function( answer ) {
      if ( answer.length < 1 ) {
        return "You must choose at least one email client.";
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
      this.litmusClients = props.litmusClients;
      this.htmlTemplate = props.htmlTemplate;
      this.scssTemplate = props.scssTemplate;
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
  },
  getEmailTemplate: function () {
      var request = require('request'),
          self    = this,
          done    = self.async();

      self.log.writeln('Fetching Email template...');

      request.get(this.htmlTemplate, function (error, response, body) {
          if (!error && response.statusCode === 200) {
              self.write('app/index.html', body);
          }
          else
          {
            self.log.writeln('Could not load template, loading local file...');
            self.template('_index.html', 'app/index.html');
          }
          done();
      });
        
  },
  getSCSSTemplate: function () {
      
      var request = require('request'),
          self    = this,
          done    = self.async();

      self.log.writeln('Fetching SCSS template...');

      request.get(this.scssTemplate, function (error, response, body) {
          if (!error && response.statusCode === 200) {
              self.write('app/css/styles.scss', body);
          }
          else
          {
            self.log.writeln('Could not load template, loading local file...');
            self.template('_styles.scss', 'app/css/styles.scss');
          }
          done();
      });
        
  },
  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = PdemailGenerator;
