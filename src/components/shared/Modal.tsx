import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Avatar from './Avatar';

type ModaleProps = {
  name: string;
  Component: React.ReactElement; // contenu du modal
  icon: string ; // avatar ou icône
};

function Modale({ name, Component, icon }: ModaleProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* ✅ Avatar cliquable */}
      <Avatar img={icon} onClick={handleShow} size ={"xxl"}/>

      {/* ✅ Modal dynamique */}
      <Modal show={show} onHide={handleClose} centered animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{Component}</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modale;
