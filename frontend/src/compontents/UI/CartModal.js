import { Fragment } from 'react'
import classes from './CartModal.module.css'
import ReactDom from 'react-dom'
import React, { useEffect , useState, useRef, useMemo} from 'react'



const Backdrop = props  => {

    return <div className={classes.backdrop} onClick={props.onClose}></div>
}
const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}


const Modal = (props) => {

    const [portalelement, setPortal] =  useState('')
    useEffect(() => {
        setPortal(document.getElementById("overlays"))
        
      }, []);

    return <Fragment>
        {ReactDom.createPortal(<Backdrop onClose={props.onClose}></Backdrop>,portalelement )}
        {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalelement)}
        
    </Fragment>

}

export default Modal