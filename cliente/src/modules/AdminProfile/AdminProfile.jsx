import React, { useState, useEffect } from 'react'
import deleteUser from '../../services/deleteUser'
import Modal from '../../modules/Modal/Modal'
import DeleteConfirmation from '../../modules/DeleteConfirmation/DeleteConfirmation'
import { useSelector } from 'react-redux'
import Div from '../../components/Div/Div'
import Button from '../../components/Button/Button'
import Span from '../../components/Span/Span'
import P from '../../components/P/P'

const AdminProfile = () => {

    const [deleteModalState, setDeleteModalState] = useState(false)
    const user = useSelector(state => state.user)


    return (
      <>
        <Div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "2%",
          }}
          className='admin-button--div'
        >
          <Button
            delete
            onClick={() => {
              setDeleteModalState(!deleteModalState);
            }}
          >
            <Span>Eliminar cuenta</Span>
          </Button>
        </Div>
        <Div>
            <Div
                className="logo-container admin-profile"
            >
                <Div 
                    className={`div--profile-picture usercard blue`}
                    style={{padding: '3em', fontSize: '1.2em'}}    
                >
                    {user.name.substring(0, 1)}
                </Div>
                <Div
                    className='admin-profile--name'
                >
                    <P style={{ fontWeight: "600", margin: '0 0 3% 1.5%' }}>
                        {user.name} {user.surname}
                    </P>
                </Div>
                <P style={{ margin: '0 0 0 1.5%'}}>{user.email}</P>
                <Div
                    className="div--usercard-role admin-profile--role"
                    style={{
                        backgroundColor: user.role === 1 ? "#FFDDDF" : "#E8EEF7",
                        color: user.role === 1 ? "#DE0051" : "#003C54"
                    }}
                >
                    <Span>{user.role === 1 ? "Admin" : "Usuario"}</Span>
                </Div>
            </Div>
        </Div>
        <Modal
          titulo="Eliminar cuenta"
          state={deleteModalState}
          changeState={setDeleteModalState}
          mostrarHeader={true}
          mostrarOverlay={true}
          posicionModal={"center"}
        >
          <DeleteConfirmation
            type="user"
            changeModalState={() => setDeleteModalState(!deleteModalState)}
            contentId={user?.id}
            deleteContent={deleteUser}
          />
        </Modal>
      </>
    );
}

export default AdminProfile