

## Errors !
    sync : throw Error
    async : next()
    "express-async-errors" package : let the dev use "throw Error()" in an async function 


## Create Secret
    kubectl create secret generic jwt-secret --from-literal=JWT_KEY=mysecretkey

## details

    mongo-db-memory : create a MongoDB memory server or an instance of Mongo in memory, rather than having all thes different services connecting to the same test instance of Mongo => speed

    next.config.js : make the chances to view the changes higher (but still not 100%)

    kubectl get services -n ingress-nginx