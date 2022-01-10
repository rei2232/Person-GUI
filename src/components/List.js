
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import * as React from 'react';
import {Component} from "react";
import Modal from "./Modal"
import SignUp from "./SignUp"
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'ssn', headerName: 'SSN', width: 130 },
    { field: 'age', headerName: 'Age', type: 'number', width: 130 },
    { field: 'salary', headerName: 'Salary', type: 'number', width: 130 },

    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) =>
    //         `${params.getValue(params.id, 'firstName') || ''} ${
    //             params.getValue(params.id, 'lastName') || ''
    //         }`,
    // },
];

const rows = [

];


export default class List extends Component{
    constructor() {
        super();
        this.state = {
            show: false
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };
    render() {
        return (
            <div className="SignUpForm">
                <Container maxWidth="lg">
                    <h1 style={{color: '0074FF'}}>Person Database</h1>
                    <div style={{height: 400, width: '100%'}}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </div>
                    <div className="btn-group">
                        <Modal show={this.state.show} handleClose={this.hideModal} class={'SignUp'}>

                        </Modal>
                        <Button variant="outlined" onClick={this.showModal} >Add new person</Button>
                        <Button variant="contained" style={{background: '#FF2D00'}}>Delete</Button>
                        <Button variant="outlined">Edit</Button>
                    </div>
                </Container>
            </div>
        );
    }

}