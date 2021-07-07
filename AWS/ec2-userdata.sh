# Example - 01

#! /bin/bash
echo "Updating the instance" >> /tmp/startup.log
sudo yum update -y
echo $HOSTNAME >> /tmp/startup.log

# Example - 02

#! /bin/bash
sudo yum install -y httpd 
echo "Response from Host `hostname`" > /var/www/html/index.html
sudo systemctl enable --now httpd
