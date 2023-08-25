

## Errors !
    sync : throw Error
    async : next()
    "express-async-errors" package : let the dev use "throw Error()" in an async function 


## Create Secret
    kubectl create secret generic jwt-secret --from-literal=JWT_KEY=mysecretkey