#! /bin/bash
echo "Updating the instance" >> /tmp/startup.log
sudo yum update –y
echo $HOSTNAME >> /tmp/startup.log
