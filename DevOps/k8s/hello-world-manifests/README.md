Manifests Setup
``` 
1, Edit Values.yaml ( service , ingress )
2, Gen Sealed-secret
```
Access K8s
``` 
aws configure -> input access key, secret key
aws eks --region {region} update-kubeconfig --name {eks name}
```

Deploy to k8s

```
helm install hello-world ../hello-world-manifests
```
