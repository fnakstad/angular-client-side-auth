#!/bin/bash

export NODE_ENV=test mocha
mocha --recursive -R list server/tests/