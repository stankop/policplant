import { Fragment } from 'react'
import classes from './OrderModal.module.css'
import ReactDom from 'react-dom'

const Backdrop = props  => {

    return <div className={classes.backdrop} onClick={props.onClose}></div>
}
const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const portalelement= document.getElementById("overlays")

const Modal = (props) => {

    return <Fragment>
        {ReactDom.createPortal(<Backdrop onClose={props.onClose}></Backdrop>,portalelement )}
        {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalelement)}

    </Fragment>

}

export default Modal