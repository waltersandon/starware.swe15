#!/bin/sh
# Kill servers
kill  `lsof -t -i:3000`