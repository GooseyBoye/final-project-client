// EditCampusView.js

import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles(() => ({
  formContainer: {
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none',
  },
  customizeAppBar: {
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle: {
    backgroundColor: '#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px',
  },
}));

const EditStudentView = (props) => {
  //from New Student View
  const {handleChange, handleSubmit, studentInfo } = props;
  const classes = useStyles();
  const student = studentInfo.student

  return (
    <div>
      <h1>Edit Student</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              Edit Student
            </Typography>
          </div>

          <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>

            <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
            <input required type="text" name="firstname" defaultValue={student.firstname} onChange ={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
            <input required type="text" name="lastname" defaultValue={student.lastname} onChange ={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style= {{color:'#11153e', fontWeight: 'bold'}}>campusId: </label>
            <input required type="text" name="campusId" defaultValue={student.campusId} onChange ={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Gpa: </label>
            <input required type="number" name="gpa" step="0.1" defaultValue={student.gpa} onChange ={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Email: </label>
            <input required type="text" name="email" defaultValue={student.email} onChange ={(e) => handleChange(e)} />
            <br/>
            <br/>


            <label style={{color:'#11153e', fontWeight: 'bold'}}>Picture: </label>
            <input required type="text" name="imageURL" defaultValue={student.imageURL} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <br/>
            <br/>
          </form>
          </div>
      </div>
    </div>    
  )

};

export default EditStudentView;