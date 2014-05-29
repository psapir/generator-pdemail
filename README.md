# Precision Dialogue HTML Emails Yeoman generator

This is a [Yeoman](http://yeoman.io) generator to create HTML emails SCSS support, image optimization, CSS inlining and litmus testing.

Based on Javier Villanueva's [generator-htmlemail](https://github.com/jahvi/generator-htmlemail) and Jeremy Peter's [grunt-litmus](https://github.com/jeremypeter/grunt-litmus/).

## Features

* SCSS stylesheets with [Compass](http://compass-style.org/)
* Image optimization with [jpegtran](http://jpegclub.org/jpegtran/) and [OptiPNG](http://optipng.sourceforge.net/)
* Inlining CSS styles with [Premailer](http://premailer.dialect.ca/)
* Test email delivery with [Litmus](https://litmus.com)

## Requirements

* Node.js >= 0.8.11 ([install wiki](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager))
* Yeoman >= 1.0.0 (`npm install -g yo`)
* Ruby >= 1.8.7 ([installers](http://www.ruby-lang.org/en/downloads/))
* Compass >= 0.12.2 (`gem install compass`)
* Nokogiri >= (`gem install nokogiri`)
* Premailer >= 1.7.3 (`gem install premailer`)

## Getting Started

To install generator-pdemail from npm, run:

```
$ npm install -g generator-pdemail
```

Then, initiate the generator in an empty directory with:

```
$ yo pdemail
```

## Documentation

### Prompts

This generator will ask you a few questions about your project before scaffolding the file structure. Here's a summary of what each question is used for:

#### [?] What's the project name?

Used in the generated `package.json` file as the name of the project, by default this is the folder name.

#### [?] What's your production domain?

Used by the premailer task to rewrite your assets url, e.g:

```
<img src="/img/sample.jpg" />
```

Becomes:

```
<img src="http://www.yourdomain.com/img/sample.jpg" />
```

#### [?] Specify your HTML template

Used to retrieve the HTML template to use as your start up code. You can provide any URL that is accesible via the interwebs. If the URL can't be retrieved the generator will use a default index.html file. 

If not specified [Marvin's super duper email template](https://gist.githubusercontent.com/psapir/b5c432b6982466ea0d58/raw/5ef129e59e2f0705e38557696bcf433b3ceabc46/index.html) will be used.


#### [?] Specify your SCSS template

Used to retrieve the SCSS template to use as your start up code. You can provide any URL that is accesible via the interwebs. If the URL can't be retrieved the generator will use a default styles.scss file. 

If not specified [Marvin's super duper SCSS template](https://gist.githubusercontent.com/psapir/b5c432b6982466ea0d58/raw/dd92f3d2a709b82e8a28818e761266e48f4eabba/styles.scss) will be used.

Note: You can use simple CSS if you are not familiar with the Sassy CSS format.

#### [?] Litmus testing options

If you have a Litmus account, you can specify your litmus domain, user name, password and testing platforms that your email will be sent to.

### Sources

Sources are located in the `app` folder:

* `index.html`: HTML boilerplate
* `css/`: CSS folder
    * `style.scss`: main stylesheet

### Grunt Tasks


#### `grunt dev`

This task runs a watch trigger for changes to the `css` folder and starts a static HTTP server at `http://localhost:8000` pointing to the `app` folder. The browser will reload automatically (thanks to the `livereload` task) upon changes to your SCSS or HTML files.

#### `grunt build`

This task creates a build from your sources. It creates a folder named `dist` next to `app`, then compiles your SCSS file and inlines the resulting stylesheet in the HTML source through Premailer. Finally it starts a static HTTP server at `http://localhost:8000` pointing to the `dist` folder.

Images are optimized with jpegtran and OptiPNG.

This task can be used when you are ready to put your email in your favorite ESP. 

#### `grunt test`

This task sends the compiled email to Litmus. This basically performs the same actions as the `build` task only that instead of running a static HTTP server it'll send the test to your litmus account.

### Tasks Customization

See `Gruntfile.js` source for more options and customizations.

## Contributing

Feel free to submit bugs or pull requests! 

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)