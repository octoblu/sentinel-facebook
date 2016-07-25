#!/usr/bin/env casperjs

var system  = require('system');
var helpers = require('./helpers');
var Casper  = require('casper');
var casper  = helpers.buildCasper(Casper, 'sentinel-facebook');

var FACEBOOK_USERNAME = system.env.FACEBOOK_USERNAME;
var FACEBOOK_PASSWORD = system.env.FACEBOOK_PASSWORD;

if(!FACEBOOK_USERNAME || !FACEBOOK_PASSWORD) {
  console.log('Missing required env: FACEBOOK_USERNAME or FACEBOOK_PASSWORD')
  this.exit(1)
}

helpers.thenWithErrors(casper, function() {
  casper.click('.auth__button--facebook');
})

casper.waitForSelector("#login_form");

helpers.thenWithErrors(casper, function() {
  casper.fill('#login_form', {
    'email': FACEBOOK_USERNAME,
    'pass': FACEBOOK_PASSWORD
  })

  // Wait for JS maybe? Not sure if this makes a difference
  casper.wait(2000, function(){
    casper.click("#loginbutton")
  })
})

helpers.assertOnOctobluDashboard(casper);
helpers.thenWithErrors(casper, function(){
  helpers.logout(casper);
});
helpers.thenWithErrors(casper, function(){
  casper.echo("success");
  casper.exit(0);
})

casper.run();
