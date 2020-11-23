# Full Stack Deployment in Kubernetes (Angular, IdentityServer4, Dotnet Core, MongoDB, CIVO)
This document is a guide for my learning to deploy an angular app connecting to a set of dotnet core microservice for authentication and other services. 

## Prologue: 
If knowledge = money, I belong to the middle class, this guide is to be a mirror for my own progress toward digital transformation and sharing it, so others can become my friends.

## Flashback: 
I ended up using k8s after trying [different platforms](https://www.loom.com/embed/cf9e37ca04224034b3cd989b2cd0c799) and tried to build a local environment for delivering my ideas in no time. While attempting it on my laptop with win.10 having 8GB RAM and reasonable HDD space I installed VirtaulBox and Vagrant following [Just me and Opensource channel](https://www.youtube.com/watch?v=YzaYqxW0wGs&list=PL34sAs7_26wNBRWM6BDhnonoA5FMERax0).

## Present: 
I was so excited to learn all the tools that could be tried out in K8s like Istio, Traefik etc. All of a sudden the system started to slow down and came to know about k3s, k3d from the video [here](https://www.youtube.com/watch?v=-HchRyqNtkU&t=33m37s). Civo service with k3s is mind blowing to me, I don't have to take care of the infrastructure complexity anymore. Following the learning guide [here](https://www.civo.com/learn/deploying-applications-through-the-civo-kubernetes-marketplace), I did some of the experiments in CIVO, to install a docker, dotnet core - web api using faas cli docker image, also trying to push a full stack app using Angular + .net core + mongodb + identity server 4. I am a web application developer trying to be a [data scientist by 2025](https://rajeshradhakrishnanmvk.github.io/). I don't know whether its ambitious but I want to try. On its way, trying to experiment and create an eco system in CIVO with all the tools for my ideas having microservices, web apps, machine learning models. I hope one day I will be proud to run a production ready idea, that has revolutionized the world :-). I will create a series of blog post having most of the commands into and mention whether its failure or success. 

1.	DotCore
2.	Angular
3.	MongoDB
4.	Python
5.	Java Spring Boot

## Design:
!["PROJECT".png](https://github.com/rajeshradhakrishnanmvk/rajeshradhakrishnanmvk.github.io/blob/master/images/2020-11-23-Full_Stack_Deployment_in_Kuberentes/media/image1.png?raw=true)
## Prerequisites:
1.	Use WSL in windows
2.	Install Docker, Windows Terminal
3.	Use VS Code with Dotnet Core and Angular framework essentials
4.	Remove "TAG" with you Docker ID
5.	Remove "PROJECT" with your Project Name

I followed the instructions [here](https://docs.microsoft.com/en-us/windows/wsl/wsl-config#configure-global-options-with-wslconfig), following are the commands used:


---------------------
WSL2 install & update
```
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```
Install docker desktop and enable WSL

NOTE: I am doing the export import because there was no enough space in my default WSL drive

```
wsl --list -v
wsl --export docker-desktop-data "K:\Kubernetes\ubuntu-wsl\Docker\wsl\docker-desktop-data.tar"
wsl --unregister docker-desktop-data
wsl --import docker-desktop-data "K:\Kubernetes\ubuntu-wsl\Docker\wsl\data" "K:\Kubernetes\ubuntu-wsl\Docker\wsl\docker-desktop-data.tar" --version 2
```
NOTE: Don’t forget to change the local path “K:\Kubernetes\ubuntu-wsl\Docker\wsl\data” which refers to my local path

---------------------
## Docker Setting > Enable “use the WSL 2 based engine”
 ![dockersetting.png](https://github.com/rajeshradhakrishnanmvk/rajeshradhakrishnanmvk.github.io/blob/master/images/2020-11-23-Full_Stack_Deployment_in_Kuberentes/media/image2.png)
## 1. Civo Setup
- [Get the command line](https://github.com/civo/cli) for Civo cluster, you can create a civo cluster, follow the instructions [here](https://www.civo.com/learn/deploying-applications-through-the-civo-kubernetes-marketplace).
- Get Kubectl installed and working

```
civo kubernetes ls
civo kubernetes config  "PROJECT"-infra --save --merge

kubectl config get-contexts
kubectl config set-context "PROJECT"-infra
kubectl config use-context "PROJECT"-infra
```

## 2. Development:
- VS Code
   1. task.json - setup the tasks for local integrated environment
   2. launch.json - to run the entire project locally as an integrated project
- Dotnet Core
   1. Create a web api project for book service
   2. Create another for chapter service

### Setup identity server

I have followed this blog [here](https://www.blexin.com/en-US/Article/Blog/Angular-Microservices-and-Authentication-with-IdentityServer-MongoDB-and-Docker-86) to setup mongodb as backend for identity server, there were some update required besides the blog.

```
>npm i oidc-client
>ng new angular-client
>dotnet new webapi
>dotnet new -i IdentityServer4.Templates
>mkdir PROJECT-idserver
>cd .\ PROJECT-idserver\
>dotnet new is4ef 
>dotnet new is4inmem
```

## 3. Dockerization
### Running Mongo db Locally
```
docker run --rm -d -p 27017:27017 -v /civolab/lab/"PROJECT":/data/db mongo
```
## 4. Managing Secrets
```
kubectl delete secret secret-idserver-appsettings -n openfaas-fn
kubectl create secret generic secret-idserver-appsettings --from-file=secret-appsettings=appsettings.secrets.json -n openfaas-fn
```
## 5. Deployment:
#### Docker Build:

```
docker build . -f Dockerfile -t PROJECT-web:local
docker tag "PROJECT"-web:local <tag>/ "PROJECT"-web:v.0.2
docker push <TAG>/ PROJECT-web:v.0.2
```

# Open Faas Setup & Deploy

```
curl -sLSf https://cli.openfaas.com | sudo sh
export OPENFAAS_PREFIX="<tag>/"
export DNS="<YOUR_CIVO_CLUSTER_ID>.k8s.civo.com" # As per dashboard
export OPENFAAS_URL=http://$DNS:31112
PASSWORD=$(kubectl get secret -n openfaas basic-auth -o jsonpath="{.data.basic-auth-password}" | base64 --decode; echo)
echo -n $PASSWORD | faas-cli login --username admin --password-stdin

faas-cli new --lang dockerfile api
faas-cli build
faas-cli push -f stack.yml # Contains all the image deployment
faas-cli deploy -f stack.idserver.yml # individual deployment
faas-cli deploy -f stack.web.yml
```
# Helm Install
I have used the helm installation for identity server 4 dotnet microservice because the open faas url was not idel to resolve the host path, if we install it using helm we can setup the ingress.

```
helm upgrade --install "PROJECT"-frontend /"PROJECT"-web/conf/charts/"PROJECT"-ui --namespace PROJECT --set app.image=<TAG>/"PROJECT"-web:latest
helm uninstall "PROJECT"-frontend -n "PROJECT"
```
---------------------
### Testing & Monitoring:
I followed the monitoring guide [here](https://www.civo.com/learn/monitoring-k3s-with-the-prometheus-operator-and-custom-email-alerts)

```
docker run --rm -p 5000:8080 -ti  -e ASPNETCORE_ENVIRONMENT=Development "PROJECT"-idserver:local

kubectl get all -o wide -n "PROJECT"
kubectl get all -o wide -n openfaas-fn

kubectl port-forward svc/prometheus-operator-grafana 8080:80  -n monitoring
kubectl port-forward svc/prometheus-operator-operator 8082:8080 -n monitoring
kubectl port-forward svc/prometheus-operator-alertmanager 9093 -n monitoring
```
Get into the pod running in the cluster and verify the files.
```
kubectl exec --stdin --tty <podname> -n openfaas-fn -- sh
```
## Challenges & Solutions:
1.	Setting up local system – (  8GB RAM)
2.	Dotnet Core
3.	Angular
    Error: because its MIME type ('text/pain') is not supported  stylesheet MIME type, and strict MIME checking is enabled.
    ![Error.png](https://github.com/rajeshradhakrishnanmvk/rajeshradhakrishnanmvk.github.io/blob/master/images/2020-11-23-Full_Stack_Deployment_in_Kuberentes/media/image3.png)
    - I resolved it by adding  'base href="/function/"PROJECT"-web.openfaas-fn/"' in index.html
4.	IdentityServer setup
- Q: I am trying to deploy a dotnet core identityserver4 into my cluster using openfaas. When my angular client hit the pod for authentication the url resolves to mysever.openfass-fn.svc.cluster.local:8080 instead of the external url. Any idea?
- A: I fixed it by hosting it separately using helm and configured traefik ingress.
- Q: Unable to connect to mongodb in the civo cluster from compass ?
- A: Open firewall to port 27017
5.	Microservice Architecture
6.	Ployglot implementation
