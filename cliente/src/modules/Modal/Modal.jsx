import React, {Fragment} from 'react';
import ModalOverlay from '../../components/ModalOverlay/ModalOverlay'
import ConetenedorModal from '../../components/ContenedorModal/ContenedorModal'
import EncabezadoModal from '../../components/EncabezadoModal/EncabezadoModal';
import BotonCerrar from '../../components/BotonCerrar/BotonCerrar';

const Modal = ({children, state, changeState, titulo , mostrarHeader, mostrarOverlay, posicionModal}) => {

    return (
        <Fragment>
            { state && 
                <ModalOverlay 
                    mostrarOverlay={mostrarOverlay} 
                    posicionModal ={posicionModal} 
                    // onClick={()=> changeState(false)}
                >
                    <ConetenedorModal>
                        {
                            mostrarHeader &&
                            <EncabezadoModal>
                                <h3>{titulo}</h3>
                            </EncabezadoModal>
                        }
                        <BotonCerrar onClick={()=> changeState(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </BotonCerrar>
                        {children}
                    </ConetenedorModal>
                </ModalOverlay> 
            }
        </Fragment>
    )


}

export default Modal;