# Minikube on AWS

> In this demo we will cover the installation of Minikube on Ubuntu 21

### Minimum system requirements
```
2 GB RAM or more
2 CPU / vCPU or more
20 GB free hard disk space or more
Docker / Virtual Machine Manager – KVM & VirtualBox
```
### Install dependencies
```
sudo apt update -y
sudo apt install -y curl wget apt-transport-https ca-certificates gnupg lsb-release
```

### Install docker
```
sudo yum update -y
sudo yum install docker -y
sudo systemctl status docker
sudo systemctl enable --now docker
```

### Install Kubectl
```
https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/
```
```
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
mv kubectl /bin/kubectl
chmod a+x /bin/kubectl
```

### Install Minikube
```
https://aws.plainenglish.io/running-kubernetes-using-minikube-cluster-on-the-aws-cloud-4259df916a07
https://minikube.sigs.k8s.io/docs/start/
```
```
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/bin/minikube
sudo chmod +x /usr/bin/minikube
```

### Minikube commands
```
minikube start --vm-driver=none
minikube start --driver=docker
minikube addons list
minikube addons enable ingress
minikube dashboard
minikube stop
```
### Start Minikube with higher resources
```
minikube config set cpus 2
minikube config set memory 8192
minikube start
```

### Test the setup
```
kubectl run hello-minikube --image=gcr.io/google_containers/echoserver:1.4 --port=8080
kubectl expose pod hello-minikube --type=NodePort
```

