
# Kubernetes cluster Setup on AWS Using Kubeadm and Containerd

## Prerequisites

- A compatible Linux hosts:  2 GB or more of RAM per machine and 2 CPUs or more 
- 3 - Ubuntu 20.04 LTS Serves:  1x Manager (4GB RAM, 2 vCPU)t2.medium type, 2x Workers (1 GB, 1 Core) t2.micro type 
- Full network connectivity between all machines in the cluster 
- Unique hostname for each host. Change hostname of the machines using hostnamectl. For master nodes, run`hostnamectl set-hostname master`. For slaves, run `hostnamectl set-hostname slave` 
- Swap disabled. You MUST disable swap in order for the kubelet to work properly 
	```
	swapoff -a
	sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
	```
- Certain ports are open on your machines(https://kubernetes.io/docs/reference/ports-and-protocols/)
  - On Master Node
	```
	6443/tcp for Kubernetes API Server
	2379-2380 for etcd server client API
	6783/tcp,6784/udp for Weavenet CNI
	10248-10260 for Kubelet API, Kube-scheduler, Kube-controller-manager, Read-Only Kubelet API, Kubelet health
	80,8080,443 Generic Ports
	30000-32767 for NodePort Services
	```
  - On Slave Nodes
	```
	6783/tcp,6784/udp for Weavenet CNI
	10248-10260 for Kubelet API etc
	30000-32767 for NodePort Services
	```


## References
- https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/
- https://kubernetes.io/docs/setup/production-environment/container-runtimes/#containerd
- https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/
- https://www.mirantis.com/blog/how-install-kubernetes-kubeadm/
- https://www.mankier.com/1/kubeadm-init
- https://kubernetes.io/docs/setup/production-environment/container-runtimes/#docker
- https://github.com/containerd/containerd/blob/main/docs/getting-started.md
- https://kubernetes.io/docs/reference/networking/ports-and-protocols/
- https://www.weave.works/docs/net/latest/kubernetes/kube-addon/#install
- https://github.com/skooner-k8s/skooner
- https://www.weave.works/docs/net/latest/kubernetes/kube-addon/#eks
- https://github.com/kubernetes-sigs/cri-tools/blob/master/docs/crictl.md
