#!/bin/zsh

cat * | sort -t';' -g -k1 -k2 -k3 -k4 -k5 -k6 -k7 | uniq -u
