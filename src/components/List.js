import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SignUp from './SignUp'
import Update from './Update'
import './modal.css'
import CloseIcon from '@mui/icons-material/Close';
import {useEffect, useState} from "react";

const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'ssn', headerName: 'SSN', width: 130 },
    { field: 'age', headerName: 'Age', type: 'number', width: 130 },
    { field: 'salary', headerName: 'Salary', type: 'number', width: 130 },
];

const List = () => {
    const [people, setPeople] = useState([])
    const [selectedPerson, setSelectedPerson] = useState(null)

    // get all people from server
    useEffect(() => {
        const getPeople = async () => {
            const peopleFromServer = await fetchPeople()
            setPeople(peopleFromServer)
        }
        getPeople()
    }, [])
    // delete person from server
    const deletePeople = async (id) => {
        const URL = '/api/' + decodeURI(id)
        const res = await fetch(URL, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log(res)
        if (res.status === 200) {
            setPeople(people.filter((person) => person.id !== id))
            window.location.reload(false);
        } else
            alert('Error deleting person')

    }
    // fetch data
    const fetchPeople = async () => {
        const res = await fetch('/api')
        const data = await res.json()
        return data
    }
    // add person to server
    const addPerson = async (person) => {
        const res = await fetch ('/api', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        })
        const data = res.json()
        console.log(data)
        setPeople([...people, data]) // sets data instead of people
        window.location.reload(false);
    }
    // update person
    const updatePerson = async (person) => {

    }
    const saveSelectedPerson = (person) => {

    }

    // modal open or close
    const [open, setOpen] = React.useState(false);
    // modal passed data
    const [modalData, setModalData] = React.useState(null);
    const handleOpen = (modalType, person) => {
        setOpen(true);
        if(modalType === 'create') {
            setModalData(<SignUp onAdd={addPerson}/>)
        }
        if(modalType === 'update') {

            console.log(person)
            setModalData(<Update onUpdate={updatePerson} currentPerson={person} person='person'/>)
        }
    }
    const handleClose = () => setOpen(false);

    const func = (person) => {
        console.log('person ', person)
        setSelectedPerson(person)
        console.log(selectedPerson)
    }
    return(
        <div className="SignUpForm">
            <Container maxWidth="lg">
                <h1 style={{color: '0074FF'}}>Person Database</h1>
                <div style={{height: 400, width: '100%'}}>
                    <DataGrid
                        rows={people}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        onCellClick={person => {
                            func(person)
                            handleOpen('update', person)
                        }}
                        checkboxSelection
                        onSelectionModelChange={person => {
                            setSelectedPerson(person)
                        }}
                    />
                </div>
                <div className="btn-group">
                    <Button variant="outlined" onClick={() => handleOpen('create')}>Add new person</Button>
                    <Button variant="contained" style={{background: '#FF2D00'}} onClick={() => deletePeople(selectedPerson)}>Delete</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx className="modalBox">
                            <CloseIcon className="close-icon" onClick={handleClose}/>
                            {modalData}
                        </Box>

                    </Modal>
                </div>
            </Container>
        </div>

    )
}
export default List
