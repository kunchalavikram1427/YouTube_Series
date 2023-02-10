
# Kubernetes cluster Setup on AWS Using Kubeadm and Containerd

## Prerequisites

- A compatible Linux hosts:  2 GB or more of RAM per machine and 2 CPUs
   or more 
- 3 - Ubuntu 20.04 LTS Serves:  1x Manager (4GB RAM, 2 vCPU)
   t2.medium type, 2x Workers (1 GB, 1 Core) t2.micro type 
- Full network connectivity between all machines in the cluster 
- Unique hostname for each host. Change hostname of the machines using hostnamectl. For master nodes, run`hostnamectl set-hostname master`. For slaves, run `hostnamectl set-hostname
   slave` 
- Swap disabled. You MUST disable swap in order for the kubelet to work properly 
	> swapoff -a
	> sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
