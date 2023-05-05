#!/usr/bin/env bash

cd /home/ec2-user/mondi

export PATH=/home/ec2-user/.nvm/versions/node/v16.14.0/bin:$PATH

log_name="/home/ec2-user/mondi/applicationStart.log"

pm2 reload mondi &> $log_name

exit 0

