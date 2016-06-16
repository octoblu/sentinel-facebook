#!/usr/bin/env casperjs

var system = require('system');
var casper = require('casper').create();


var FACEBOOK_USERNAME = system.env.FACEBOOK_USERNAME;
var FACEBOOK_PASSWORD = system.env.FACEBOOK_PASSWORD;

if(!FACEBOOK_USERNAME || !FACEBOOK_PASSWORD) casper.die('Missing required env: FACEBOOK_USERNAME or FACEBOOK_PASSWORD')

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
  this.die("failure")
})

casper.run();
