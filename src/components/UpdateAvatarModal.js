import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { authActions } from '../redux/actions'
import { useDispatch } from 'react-redux'

export default function UpdateAvatarModal({ showModal, setShowModal, img }) {
    const dispatch = useDispatch()
    const [url, setUrl] = useState(img)
    const [selectedFile, setSelectedFile] = useState(null)
    const handleOnClickSubmit = () => {
        dispatch(authActions.uploadAvatar(selectedFile))
        setShowModal(false)
    }
    const handleChangeImage = (e) => {
        console.log('handleChangeImage:', e.target.files[0])
        var tmppath = URL.createObjectURL(e.target.files[0]);
        console.log('tmppath:', tmppath)
        setSelectedFile(e.target.files[0])
    }
    return (
        <div>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Change your profile</Modal.Title>
                </Modal.Header>

                <Modal.Body className="avatar-body-area">
                    <img className="modal-avatar content-center" src={url} alt="" />
                    <br></br>
                    <input
                        className="col-sm-12"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/gif"
                        // value={url}
                        onChange={(e) => handleChangeImage(e)}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="light" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="dark" onClick={() => handleOnClickSubmit()}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
