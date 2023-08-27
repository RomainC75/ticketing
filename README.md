

## Errors !
    sync : throw Error
    async : next()
    "express-async-errors" package : let the dev use "throw Error()" in an async function 


## Create Secret
    ```kubectl create secret generic jwt-secret --from-literal=JWT_KEY=mysecretkey```

## details

    mongo-db-memory : create a MongoDB memory server or an instance of Mongo in memory, rather than having all thes different services connecting to the same test instance of Mongo => speed

    next.config.js : make the chances to view the changes higher (but still not 100%)

    ```kubectl get services -n ingress-nginx```

## common : publish package
### package.json
        1 - "name": "@mychnrdorg/common" 
        -> ```npm publish --access public```

        2 - "main": the 1 file to import with "import ... from '@mychnrdorg/common'"

        3 - "types"/"files" : make sure with include theses files inside the package 

    don't hesitate to clean ./common/build before building another version of the library -> see package.json

### commands
    ***npm version patch*** : update the version number in the package.json
    ```npm publish```

    npm run pub (package.json) : NOT GOOD in production

    update the libray :
        ```npm update @mychnrdorg/common```
    
