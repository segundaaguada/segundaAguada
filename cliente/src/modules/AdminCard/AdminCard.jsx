import React from 'react'
import Div from '../../components/Div/Div'
import Span from '../../components/Span/Span'
import P from '../../components/P/P'
import Label from '../../components/Label/Label'
import Input from '../../components/Input/Input'

const AdminCard = ({content, color, handleClick, isChecked, type}) => {
    return (
        <Div
            className='div--usercard'
        >
            <Label>
                <Input 
                    id={content.id}
                    type='checkbox'
                    checked={isChecked}
                    onClick={handleClick}
                    className='admin-checkbox'
                />
            </Label>
            <Div className={`div--profile-picture usercard ${color}`}>
                {content.name.substring(0, 1)}
            </Div>
            {
                type === 'users' ?
                <>
                    <P className='p--usercard-name'>
                        {content.name} {content.surname}
                    </P>
                    <P className='p--usercard-entity'>
                        {content.association?.name}
                    </P>
                
                    <Div 
                        className='div--usercard-role'
                        style={{
                            backgroundColor: content.role === 1 ? '#FFDDDF' : '#E8EEF7',
                            color: content.role === 1 ? '#DE0051' : '#003C54'
                        }}
                    >
                        <Span>
                            {content.role === 1 ? 'Admin' : 'Usuario'}
                        </Span>
                    </Div>
                </>
                :
                <>
                    <P className='p--usercard-name'>
                        {content.name}
                    </P>
                </>
            }
        </Div>
    )
}

export default AdminCard