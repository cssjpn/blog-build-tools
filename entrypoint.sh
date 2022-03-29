#!/bin/sh

umask 0000

if [ "$PWD" != "/blog" ]; then
  [ ! -e "$PWD/gulpfile.js" ] && cp /blog/gulpfile.js $PWD
  [ ! -e "$PWD/package.json" ] && cp /blog/package.json $PWD
  [ ! -e "$PWD/package-lock.json" ] && cp /blog/package-lock.json $PWD
  [ ! -e "$PWD/node_modules" ] && cp -r /blog/node_modules $PWD
  [ ! -e "$PWD/lib" ] && cp -r /blog/lib $PWD
fi

exec "$@"
