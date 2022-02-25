
# Merge Kubernetes kubectl config files

###  What is Kubernetes Config file

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
### Merge the two config files together into a new config file
```
$ KUBECONFIG=~/.kube/config:/path/to/new/config kubectl config view --flatten > /tmp/config
```
### Replace the old config file with the new merged config file
```
$ mv /tmp/config ~/.kube/config
```
### Get Clusters
```
$ kubectl config get-clusters
$ kubectl config get-users
$ kubectl config current-context
```
### Delete the backup after testing the merged config file(optional) 
```
$ rm ~/.kube/config.bak
```
