# HA K8s Cluster Setup  using Kubeadm
> In this demo, we will setup HA K8s Cluster on AWS using Ubuntu Instances
> https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/

### Instance requirements 
```
3 Instances with 2 CPU & 4GB RAM for MASTER NODES
2 Instances with 1 CPU & 1GB RAM for WORKER NODES
1 Instance with 1 CPU & 1GB RAM for LOADBALANCER(HA-Proxy)
```

## Install & Setup HA-Proxy
HA Proxy is needed to load balance requests to API-Server of multiple control plane nodes(masters)
```
sudo su
yum install haproxy -y
systemctl start haproxy
systemctl enable haproxy

```
vi /etc/haproxy/haproxy.cfg 
```
frontend http_front
   bind *:6443
   default_backend http_back

# Configure HAProxy to route requests to Kubernetes worker nodes 
# on NodePort of Ingress Controller
backend http_back
   balance roundrobin
   mode http
   server master1 74.220.29.223:6443
```

### What are we loadbalancing ?

We have 3 master nodes. Which means the user can connect to either of the 3 api-servers. The loadbalancer will be used to loadbalance between the 3 api-servers. 


* Login to the loadbalancer node 

* Switch as root - ` sudo -i` 

* Update your repository and your system 

```
sudo apt-get update && sudo apt-get upgrade -y

```

* Install haproxy

```
sudo apt-get install haproxy -y
```

* Edit haproxy configuration 

```
vi /etc/haproxy/haproxy.cfg
```

Add the below lines to create a frontend configuration for loadbalancer - 

```
frontend fe-apiserver
   bind 0.0.0.0:6443
   mode tcp
   option tcplog
   default_backend be-apiserver
```

Add the below lines to create a backend configuration for master1,master2 and master3 nodes at port 6443. __**Note**__ : 6443 is the default port of **kube-apiserver**

```
backend be-apiserver
   mode tcp
   option tcplog
   option tcp-check
   balance roundrobin
   default-server inter 10s downinter 5s rise 2 fall 2 slowstart 60s maxconn 250 maxqueue 256 weight 100

       server master1 172.31.38.15:6443 check
       server master2 172.31.25.18:6443 check
       server master3 172.31.31.121:6443 check
```

* Restart and Verify haproxy

```
systemctl restart haproxy
systemctl status haproxy
```

Ensure haproxy is in running status. 

Run nc command as below - 

```
nc -v localhost 6443
Connection to localhost 6443 port [tcp/*] succeeded!
```

**Note** If you see failures for master1 ,master2 and master3 connectivity, you can ignore them for time being as we have not yet installed anything on the servers. 

---
![diagram](Cluster.png)
---
## Install kubeadm,kubelet and docker on master and worker nodes

In this step we will install kubelet and kubeadm on the below nodes 

* master1
* master2
* master3
* worker1
* worker2 


The below steps will be performed on all the below nodes. 

* Log in to all the 5 machines as described above

* Switch as root - `sudo -i` 

* Update the repositories 

```
apt-get update
```

* Turn off swap 

```
swapoff -a
sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
```
* Install container runtime - **docker**

```
apt install docker.io -y
systemctl restart docker
systemctl enable docker.service
```

* Install kubeadm and kubelet

```
apt-get update && apt-get install -y apt-transport-https curl ca-certificates gnupg-agent software-properties-common

curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -

cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF

apt-get update

apt-get install -y kubelet kubeadm
apt-mark hold kubelet kubeadm 
systemctl daemon-reload 
systemctl start kubelet 
systemctl enable kubelet.service
```

---

## Configure kubeadm to bootstrap the cluster 


We will start off by initializing only one master node. For this demo, we will use master1 to initialize our first control plane. 

* Log in to **master1** 
* Switch to root account - `sudo -i` 
* Execute the below command to initialize the cluster - 

```
kubeadm init --control-plane-endpoint "LOAD_BALANCER_IP:LOAD_BALANCER_PORT" --upload-certs
```

Here, LOAD_BALANCER_IP is the IP address of the loadbalancer.

The LOAD_BALANCER_PORT is the front end configuration port defined in HAPROXY configuration. For this demo, we have kept the port as **6443**. 

The command effectively becomes - 

```
kubeadm init --control-plane-endpoint "<IPOfLoadBalancer>:6443" --upload-certs
```

Your output should look like below - 

```
To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now join any number of the control-plane node running the following command on each as root:

  kubeadm join 172.31.42.74:6443 --token cnslau.kd5fjt96jeuzymzb \
    --discovery-token-ca-cert-hash sha256:871ab3f050bc9790c977daee9e44cf52e15ee37ab9834567333b939458a5bfb5 \
    --control-plane --certificate-key 824d9a0e173a810416b4bca7038fb33b616108c17abcbc5eaef8651f11e3d146

Please note that the certificate-key gives access to cluster sensitive data, keep it secret!
As a safeguard, uploaded-certs will be deleted in two hours; If necessary, you can use 
"kubeadm init phase upload-certs --upload-certs" to reload certs afterward.

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 172.31.42.74:6443 --token cnslau.kd5fjt96jeuzymzb \
    --discovery-token-ca-cert-hash sha256:871ab3f050bc9790c977daee9e44cf52e15ee37ab9834567333b939458a5bfb5 
```


The output consists of 3 major tasks - 

1. Setup kubeconfig using - 

```
  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

```

2. Setup new control plane (master) using 

```
  kubeadm join 172.31.42.74:6443 --token cnslau.kd5fjt96jeuzymzb \
    --discovery-token-ca-cert-hash sha256:871ab3f050bc9790c977daee9e44cf52e15ee37ab9834567333b939458a5bfb5 \
    --control-plane --certificate-key 824d9a0e173a810416b4bca7038fb33b616108c17abcbc5eaef8651f11e3d146

```

3. Join worker node using 

```
kubeadm join 172.31.42.74:6443 --token cnslau.kd5fjt96jeuzymzb \
    --discovery-token-ca-cert-hash sha256:871ab3f050bc9790c977daee9e44cf52e15ee37ab9834567333b939458a5bfb5 
```

**NOTE** 

**While you are setting up the cluster ensure that you are executing the command provided by your output and dont copy and paste from here.**

Save the output in some secure file for future use. 

---

* Log in to master2 & master 3
* Switch to root - `sudo -i` 
* Check the command provided by the output of master1 

You can now use the below command to add another node to the control plane - 

```
kubeadm join 172.31.42.74:6443 --token cnslau.kd5fjt96jeuzymzb \
    --discovery-token-ca-cert-hash sha256:871ab3f050bc9790c977daee9e44cf52e15ee37ab9834567333b939458a5bfb5 \
    --control-plane --certificate-key 824d9a0e173a810416b4bca7038fb33b616108c17abcbc5eaef8651f11e3d146

```

* Execute the kubeadm join command for control plane on master2 & master3

Your output should look like - 

```
 This node has joined the cluster and a new control plane instance was created:

* Certificate signing request was sent to apiserver and approval was received.
* The Kubelet was informed of the new secure connection details.
* Control plane (master) label and taint were applied to the new node.
* The Kubernetes control plane instances scaled up.
* A new etcd member was added to the local/stacked etcd cluster.

```

Now that we have initialized both the masters - we can now work on bootstrapping the worker nodes. 

* Log in to **worker1** and **worker2**
* Switch to root on both the machines - ` sudo -i` 
* Check the output given by the init command on **master1** to join worker node - 

```
kubeadm join 172.31.42.74:6443 --token cnslau.kd5fjt96jeuzymzb \
    --discovery-token-ca-cert-hash sha256:871ab3f050bc9790c977daee9e44cf52e15ee37ab9834567333b939458a5bfb5 
```

* Execute the above command on both the nodes - 

* Your output should look like - 

```
This node has joined the cluster:
* Certificate signing request was sent to apiserver and a response was received.
* The Kubelet was informed of the new secure connection details.

```

--- 

## Configure kubeconfig on loadbalancer node 

Now that we have configured the master and the worker nodes, its now time to configure Kubeconfig (.kube). It is up to you if you want to use the loadbalancer node to setup kubeconfig. kubeconfig can also be setup externally on a separate machine which has access to loadbalancer node. For the purpose of this demo we will use loadbalancer node to host kubeconfig and kubectl. 

* Log in to loadbalancer node
* Switch to root - `sudo -i` 
* Create a directory - .kube at $HOME of root 

```
mkdir -p $HOME/.kube
```

* SCP configuration file from any one **master** node to **loadbalancer** node or manually cat the content from master1 create config file in client machine.

* Provide appropriate ownership to the copied file 

```
chown $(id -u):$(id -g) $HOME/.kube/config
```
* Install kubectl binary 

```
snap install kubectl --classic
```

* Verify the cluster 

```
kubectl get nodes 

```

---

## Install CNI and complete installation 

From the loadbalancer(Where u have kubectl configured) node execute - 

```
kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"

```

This installs CNI component to your cluster. 

You can now verify your HA cluster using - 

```
kubectl get nodes 

```
### Authors
Vikram K