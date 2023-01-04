```
kubeseal --secret-file ./secret.yaml --sealed-secret-file sealed-secret-example.yaml

kubectl create -f sealed-secret-example.yaml
```
