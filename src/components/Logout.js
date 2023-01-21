
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function Logout ({ showModalIdle, setShowModalIdle, setPayload }){

    const handleClose = () => setShowModalIdle(false);

    const handleStop = () => {
        setPayload({})
        setShowModalIdle(false)
    }
 
    return(
        <>
            <Modal show={showModalIdle} onHide={() => setShowModalIdle(false)}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>Are you still there?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleStop}>
                    Stop
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Logout;