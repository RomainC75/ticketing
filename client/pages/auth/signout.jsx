import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";

const Signout = () => {
    const [doRequest] = useRequest({
        url: '/api/users/signout',
        method: 'get',
        body: {},
        onSuccess: ()=>Router.push('/')
    })

    useEffect(()=>{
        doRequest()
    }, [])

    return <div>Signout</div>
}

export default Signout;
