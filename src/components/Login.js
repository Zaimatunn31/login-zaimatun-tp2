import data from '../data/data.json'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';


function Login ({ showModal, setShowModal, setPayload }){

    const [show, setShow] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [counter, setCounter] = useState(0)
    const [countdown, setCountdown] = useState(30)
    const [errMsg, setErrMsg] = useState('')
    const [errClass, setErrClass] = useState('')

    useEffect(() => {

        if(counter === 3){
            setDisabled(true)
            setErrMsg(`You Have Wrong Login for 3 Times. Please wait ${countdown} seconds`)
            setShow(false)

            if(countdown > 0) {
                setTimeout(() => {
                setCountdown(countdown - 1);
                }, 1000)
            }else{
                setDisabled(false)
                setCounter(0)
                setCountdown(30)
            }
        }

    }, [counter, countdown])


    const checkLogin = (payload) => {

        const checkUser = data.data.find(item => item.email === payload.email && 
                                                 item.password === payload.password) 
                        
        if(checkUser != undefined){
            setPayload(checkUser)
            setShow(false)
            setShowModal(false)
        }else{   
            setShow(true)
            setCounter(counter + 1)
            setErrMsg('Email or Password Incorrect')
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        let formObject = Object.fromEntries(data.entries());

        if(formObject.email && formObject.password){
           checkLogin(formObject)     
        }else{
            setShow(true)
            setErrMsg('Email or password empty')
            setErrClass('is-invalid')
        }

    }
    
    return(
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                { show && 
                    <Alert variant="danger">
                        <Alert.Heading>{errMsg}</Alert.Heading>
                    </Alert>
                }

                { disabled && 
                    <Alert variant="danger">
                        <Alert.Heading>{errMsg}</Alert.Heading>
                    </Alert>
                }   
                
                <form onSubmit={onSubmit} >
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className={`form-control ${errClass}`} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter Email"/>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className={`form-control ${errClass}`} id="password" name="password" placeholder="Enter Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={disabled}>Submit</button>
                </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Login;