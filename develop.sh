#!/bin/bash


compass watch d >> dev.log &
coffee -w -c d/javascripts/bone/ >> dev.log &
hamlpy-watcher . >> dev.log &
livereload >> dev.log &

tail -f dev.log