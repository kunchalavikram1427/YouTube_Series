# HA K8s Cluster Setup  using Kubeadm
> In this demo, we will setup HA K8s Cluster on AWS using Ubuntu Instances. Refer https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/

### Instance requirements 
```
3 Instances with 2 CPU & 4GB RAM for MASTER NODES
2 Instances with 1 CPU & 1GB RAM for WORKER NODES
1 Instance with 1 CPU & 1GB RAM for LOADBALANCER(HA-Proxy)
```
### Setup Master and Worker Nodes
## Install & Setup HA-Proxy
HA Proxy is needed to load balance requests to API-Server of multiple control plane nodes(masters)
```
sudo su
yum install haproxy -y
systemctl start haproxy
systemctl enable haproxy

```
Edit `/etc/haproxy/haproxy.cfg` file and add all Master servers IPs. 6443 is the default port on which
API Server listens on
```
frontend http_front
   bind *:6443
   default_backend api_servers

# Configure HAProxy to route requests to Kubernetes API server of all master servers
# on port 6443
backend api_servers
   balance roundrobin
   mode http
   server k8s-master01 <MASTER-01-IP>:6443
   server k8s-master02 <MASTER-02-IP>:6443
   server k8s-master03 <MASTER-03-IP>:6443
```
### Authors
Vikram K