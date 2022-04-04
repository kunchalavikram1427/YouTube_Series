# Minikube on DigitalOcean

> In this demo, we will cover the installation of Minikube on Ubuntu 21

### Minimum system requirements
```
2 GB RAM or more
2 CPU / vCPU or more
20 GB free hard disk space or more
Docker
```
### Install dependencies
```
sudo apt update -y
sudo apt install -y curl wget apt-transport-https ca-certificates gnupg lsb-release conntrack
```

### Install docker from official repository
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt install docker-ce docker-ce-cli containerd.io -y
docker --version
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
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/bin/minikube
sudo chmod +x /usr/bin/minikube
```

### Minikube commands
```
minikube start --vm-driver=none
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

