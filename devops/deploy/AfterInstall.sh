#!/usr/bin/env bash

touch afterInstall.log
log_name="/home/ec2-user/mondi/afterInstall.log"

ROOT="/home/ec2-user/mondi"
cd $ROOT

export PATH=/home/ec2-user/.nvm/versions/node/v16.14.0/bin:$PATH

yarn &> $log_name
yarn prod-build


exit 0