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
                className="logo-container"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}
            >
                <Div 
                    className={`div--profile-picture usercard blue`}
                    style={{padding: '3em', fontSize: '1.2em'}}    
                >
                    {user.name.substring(0, 1)}
                </Div>
                <Div
                    style={{
                        width: "95%",
                        margin: "5% 0 0 0",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <P style={{ fontWeight: "600", margin: '0 0 3% 1.5%' }}>
                        {user.name} {user.surname}
                    </P>
                </Div>
                <P style={{ margin: '0 0 0 1.5%'}}>{user.email}</P>
                <Div
                    className="div--usercard-role"
                    style={{
                        backgroundColor: user.role === 1 ? "#FFDDDF" : "#E8EEF7",
                        color: user.role === 1 ? "#DE0051" : "#003C54",
                        margin: '3% 0 0 0.5%',
                        alignSelf: 'flex-start'
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