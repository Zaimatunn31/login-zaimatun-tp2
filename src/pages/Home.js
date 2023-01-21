import {useState, useEffect} from "react";
import Login from "../components/Login";
import Logout from "../components/Logout";

import { useIdleTimer } from 'react-idle-timer'

function Home (){

    const [payload, setPayload] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [showModalIdle, setShowModalIdle] = useState(false);

    const handleOnIdle = (event) => {
        if(payload.email){
            console.log('user is idle', event)
            console.log('last active', getLastActiveTime())
            setShowModalIdle(true)
        }
    }

    const handleOnActive = (event) => {
        console.log('user is active', event)
        console.log('time remaining', getRemainingTime())
    }

    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: 1000 * 5,
        onIdle: handleOnIdle,
        onActive: handleOnActive,
        debounce: 500
    })

    return(
        <>  

            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <h1>Logged User</h1>
                <h2>{payload.email}</h2>
                { !payload.email &&
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}> Login</button>
                }
            </div>
            <Login showModal={showModal} setShowModal={setShowModal} setPayload={setPayload} />
            <Logout showModalIdle={showModalIdle} setShowModalIdle={setShowModalIdle} setPayload={setPayload}/>
        </>
    )
}

export default Home;