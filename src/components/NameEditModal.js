import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { authActions } from '../redux/actions'
import { useDispatch } from 'react-redux'

export default function NameEditModal({ showModal, setShowModal }) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const handleOnClickSubmit = () => {
        dispatch(authActions.updateUser(name))
        setShowModal(false)
    }
    return (
        <div>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Change your name</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input className="col-sm-12" type="text" placeholder="Type your new name" value={name} onChange={(e) => setName(e.target.value)} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="light" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="dark" onClick={() => handleOnClickSubmit()}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
