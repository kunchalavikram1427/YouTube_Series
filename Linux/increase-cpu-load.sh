#! /bin/bash

# You can create up to 100% load by running the command 

dd if=/dev/zero of=/dev/null & 

# in all the desired instances and see the instances count reach up to the maximum configured after 5-10 minutes. 
# Use top to see the CPU load and  ps aux | grep /dev/null to kill this proces



# https://levelup.gitconnected.com/implementing-and-testing-aws-ec2-auto-scaling-13db17be1161
# https://medium.com/@jawad846/amazon-ec2-auto-scaling-884ea50d2d
