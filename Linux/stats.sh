#!/bin/bash
echo "Displaying System Infotmation" >> /var/log/stats.log
while :
do
        echo "--->Time:" `date`  >> /var/log/stats.log
        echo "Disk Free:"  >> /var/log/stats.log
        df -h  >> /var/log/stats.log
        echo "Memory information:"  >> /var/log/stats.log
        free -mh  >> /var/log/stats.log
        sleep 2
done
