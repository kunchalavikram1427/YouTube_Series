# Managed Kubernetes on DigitalOcean

> In this demo, we will cover how to use managed kubernetes on DigitalOcean

### Links
```
https://docs.digitalocean.com/products/kubernetes/
http://assets.digitalocean.com/white-papers/running-digitalocean-kubernetes.pdf
https://github.com/digitalocean/csi-digitalocean
https://docs.digitalocean.com/reference/api/api-reference
```
### Test the setup
```
kubectl run web-server --image=nginx:latest --port=80
kubectl expose pod web-server --type=LoadBalancer

kubectl delete po web-server
kubectl delete svc web-server
```
### Install Jenkins
```
helm repo add jenkinsci https://charts.jenkins.io/
helm pull --untar jenkinsci/jenkins
helm install jenkins jenkins/

kubectl get secret jenkins --namespace=default -o go-template='
{{range $k,$v := .data}}{{printf "%s: " $k}}{{if not $v}}{{$v}}{{else}}{{$v | base64decode}}{{end}}{{"\n"}}{{end}}'

```
### Authors
Vikram K

 