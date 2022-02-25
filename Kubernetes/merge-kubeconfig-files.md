
# Merge Kubernetes kubectl config files

###  Kubectl Config file(man page)

    Modify kubeconfig files using subcommands like "kubectl config set current-context my-context"
    
     The loading order follows these rules:
    
      1.  If the --kubeconfig flag is set, then only that file is loaded. The flag may only be set once and no merging takes
    place.
      2.  If $KUBECONFIG environment variable is set, then it is used as a list of paths (normal path delimiting rules for
    your system). These paths are merged. When a value is modified, it is modified in the file that defines the stanza. When
    a value is created, it is created in the first file that exists. If no files in the chain exist, then it creates the
    last file in the list.
      3.  Otherwise, ${HOME}/.kube/config is used and no merging takes place.
    
    Available Commands:
      current-context Display the current-context
      delete-cluster  Delete the specified cluster from the kubeconfig
      delete-context  Delete the specified context from the kubeconfig
      delete-user     Delete the specified user from the kubeconfig
      get-clusters    Display clusters defined in the kubeconfig
      get-contexts    Describe one or many contexts
      get-users       Display users defined in the kubeconfig
      rename-context  Rename a context from the kubeconfig file
      set             Set an individual value in a kubeconfig file
      set-cluster     Set a cluster entry in kubeconfig
      set-context     Set a context entry in kubeconfig
      set-credentials Set a user entry in kubeconfig
      unset           Unset an individual value in a kubeconfig file
      use-context     Set the current-context in a kubeconfig file
      view            Display merged kubeconfig settings or a specified kubeconfig file
    
    Usage:
      kubectl config SUBCOMMAND [options]
    
    Use "kubectl <command> --help" for more information about a given command.
    Use "kubectl options" for a list of global command-line options (applies to all commands).

### Make a copy of existing config files
```
$ cp ~/.kube/config ~/.kube/config.bak
```
### Merge the two config files together into a new config file as save it as a new file
```
$ KUBECONFIG=~/.kube/config:/path/to/new/config kubectl config view --flatten > /tmp/config
```
### Replace the old config file with the brand new merged config file from the previous step
```
$ mv /tmp/config ~/.kube/config
```
### Delete the backup after testing the merged config file(optional) 
```
$ rm ~/.kube/config.bak
```
### Kubectl commands to manage Clusters & Contexts
```
$ kubectl config --help
$ kubectl config view
$ kubectl config view --minify
$ kubectl config get-clusters
$ kubectl config get-users
$ kubectl config current-context
$ kubectl config set-context <CONTEXT_NAME> --namespace=dev
$ kubectl config set-context $(kubectl config current-context) --namespace=dev
$ kubectl config use-context <CONTEXT_NAME>
```
### Example outputs
```
C:\Users\vikram>kubectl config get-users
NAME
minikube
test

C:\Users\vikram>kubectl config get-clusters
NAME
minikube
test

C:\Users\vikram>kubectl config get-contexts
CURRENT   NAME       CLUSTER    AUTHINFO   NAMESPACE
*         minikube   minikube   minikube   default
          test       test       test

C:\Users\vikram>kubectl config current-context
minikube
```

### Test Applications
```
kubectl run hello-minikube-01 --image=gcr.io/google_containers/echoserver:1.4 --port=8080
kubectl expose pod hello-minikube --type=NodePort
```
