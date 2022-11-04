import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import Search from '../Search'

const setSearchValue = () => {

}
export default function SearchModal( {onSearch}) {
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  return (
    <>
      <MDBBtn onClick={toggleShow}>Pretraga   <i className="fa fa-bars fa-large"></i></MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' animationDirection="left">
        <MDBModalDialog position="top-right" size="sm" scrollable dialogClassName={{ width: '75%' }} >
          <MDBModalContent>
            <MDBModalHeader >
              <MDBModalTitle>Pretraga Biljaka</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <Search onSearch={ onSearch}></Search> 
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}