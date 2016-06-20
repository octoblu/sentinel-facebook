#!/usr/bin/env casperjs

var system = require('system');
var casper = require('casper').create({
  waitTimeout: (10 * 1000),
  onError: (function(error){
    console.log("failure due to error: " + error)
    console.log(this.echo(casper.captureBase64('png')))
    casper.exit(1)
  })
});


var FACEBOOK_USERNAME = system.env.FACEBOOK_USERNAME;
var FACEBOOK_PASSWORD = system.env.FACEBOOK_PASSWORD;

if(!FACEBOOK_USERNAME || !FACEBOOK_PASSWORD) {
  console.log('Missing required env: FACEBOOK_USERNAME or FACEBOOK_PASSWORD')
  this.exit(1)
}

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36');
casper.start('https://app.octoblu.com/');

casper.waitForText("Facebook")

casper.then(function() {
  this.click('.auth__button--facebook');
})

casper.waitForText("Log into Facebook")

casper.then(function(){
  this.fill('#login_form', {
    'email': FACEBOOK_USERNAME,
    'pass': FACEBOOK_PASSWORD
  })
  this.click("#loginbutton")
})

casper.waitForText("dashboard", function(){
  this.echo("success");
  this.exit()
}, function(){
  console.log("failure")
  console.log(this.echo(casper.captureBase64('png')))
  this.exit(1)
})

casper.run();
