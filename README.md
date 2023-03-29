# nodejs-app
Create Nodejs App

Dockerize Application 

Push to Docker hub 

Create Deployment and Service 

Test Application in Browser 

npm init -y 

> package.json file 
npm install express 
touch index.mjs 

import express from "express"

import os from "os"

const app = express()

const PORT = 3000 

app.get("/",(req,res)=>{

    const message =`Hello Word i Am pod ${os.hostname()}`

    res.send(message)

})


app.listen (PORT,()=>{

    console.log(`Web Serve is lisen @ port ${PORT}`)

    console.log(os.hostname())

})


## node index.mjs 
# to test the app 

Touch Dockerfile 
# Write the Docker File 

FROM node:alpine

WORKDIR /app

EXPOSE 3000

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

CMD ["npm","start"]


-----------------------------

edit the package.json file 
#replace test with start and command "node index.mj"

npm start 


----------------------------

docker build . -t repos/k8s 

docker login 

docker push repos/k8s 


kubectl create deployment k8s-web-server --image=repos/k8s

Troubleshoot steps 

kubectl describe pod k8s-web-server-6b68cc85-7hxx8
kubectl logs pod k8s-web-server-6b68cc85-7hxx8  

kubectl logs pod k8s-web-server-6b68cc85-q4g6t 


## Expose Service 

kubectl expose deployment k8s-web-server --port=3000 

kubectl scale deployment k8s-web-server --replicas=6 

#get IP 

kubectl get pods  -o wide 

minikube ssh 


curl 10.244.0.8:3000 # IP to connect to specific pod 

kubectl delete svc k8s-web-server 

kubectl expose deployment k8s-web-server --type=NodePort --port=3000 

minikube service k8s-web-server 

____________________________________________________________________________________________

##Updating Application 

Edit the Index.mjs file 

#building the new image
docker build . -t name/repo:tag
docker push name/repo:tag 
kubectl set image deploy k8s-web-server k8s-web-server=cadgetboy/k8s-web-server:1.2.0
#kubectl set image deploy k8s-web-server k8s-web-server=cadgetboy/k8s-web-server:Tagneeded

kubectl get pods 
# pods start replacing  by Rolling Update Deployment 
kubectl rollout status deployment/k8s-web-server
# to view the rollout deployment 

-----------------------------------------
# Updating using Recreate startegy 
#Deployment.yaml

apiVersion: apps/v1

kind: Deployment

metadata:

  name: recreate-deployment

  labels:

    apps: helloserver

spec:

apiVersion: apps/v1

kind: Deployment

metadata:

  name: recreate-deployment

  labels:

    apps: helloserver

spec:

  replicas: 8

  selector:

   matchLabels: 

      app: helloserver

  strategy:

    type : Recreate

  template:

    metadata:

      labels:

        app: helloserver

    spec:  

      containers:

      - name : helloserver

        image: cadgetboy/k8s-web-server

        ports:

        - containerPort: 3000

--------------------------------------
Service.yaml 

apiVersion: v1

kind : Service

metadata:

  name: recreate-service

spec:

  selector:

    app: helloserver

  ports:

    - port: 80

      targetPort : 3000

  type: NodePort

---------------------------------------

kubectl apply -f .\Deployment.yaml

