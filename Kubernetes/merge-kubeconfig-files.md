# Merge Kubernetes kubectl config files
### Make a copy of existing config files
$ cp ~/.kube/config ~/.kube/config.bak

### Merge the two config files together into a new config file
$ KUBECONFIG=~/.kube/config:/path/to/new/config kubectl config view --flatten > /tmp/config

### Replace the old config file with the new merged config file
$ mv /tmp/config ~/.kube/config

### (optional) Delete the backup after testing the merged config file
$ rm ~/.kube/config.bak
