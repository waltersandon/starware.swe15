#!/bin/sh
# Run the unit and e2e tests and server test start
node server-test.js &
node_modules/karma/bin/karma start tests/client/karma.conf.js --single-run &
webdriver-manager start &
protractor tests/client/protractor-conf.js &
