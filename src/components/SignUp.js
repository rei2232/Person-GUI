import {TextField} from "@mui/material";
import "./signup.css"
import Button from "@mui/material/Button";
import {useState} from "react";
const SignUp = ({onAdd}) => {
    const [name, setName] = useState('')
    const [ssn, setSsn] = useState('')
    const [age, setAge] = useState('')
    const [salary, setSalary] = useState('')
    const onSubmit = (e) => {
        e.preventDefault()

        if (!name) {
            alert('Please add a name')
            return
        }
        if (!ssn) {
            alert('Please add a SSN')
            return
        }
        if (!age) {
            alert('Please add a age')
            return
        }
        if (!salary) {
            alert('Please add a salary')
            return
        }
        onAdd({name,ssn,age,salary})

        setName('')
        setAge('')
        setSsn('')
        setSalary('')

    }
    return(
        <div className="signup-container">
            <h1 style={{color: '#2980b9'}}>Create Person</h1>
            <form onSubmit={onSubmit}>
                <TextField id="outlined-basic" fullWidth label="Name" variant="outlined" type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                <TextField id="outlined-basic" fullWidth label="SSN" variant="outlined" type='text' value={ssn} onChange={(e) => setSsn(e.target.value)}/>
                <TextField id="outlined-basic" fullWidth label="Age" variant="outlined" type='number' value={age} onChange={(e) => setAge(e.target.value)}/>
                <TextField id="outlined-basic" fullWidth label="Salary" variant="outlined" type='number' value={salary} onChange={(e) => setSalary(e.target.value)}/>
                <Button variant="outlined" size="large" type='submit'>Create</Button>
            </form>

        </div>
    )
}
export default SignUp;