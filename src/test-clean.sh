#!/bin/sh
# Kill servers
kill 9 `lsof -t -i:3000`
kill 9  `lsof -t -i:4444`
