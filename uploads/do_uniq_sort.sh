#!/bin/zsh

cat * | uniq -u | sort -t';' -g -k1 -k2 -k3 -k4 -k5 -k6 -k7
