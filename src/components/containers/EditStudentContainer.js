// EditCampusContainer.js

import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'

import EditStudentView from '../views/EditStudentView';
import { editStudentThunk} from '../../store/thunks';
import { fetchStudentThunk } from '../../store/thunks';


class EditStudentContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props)
    this.state = {
      student: this.props.student,
      studentId: this.props.match.params.id,
      redirect: false,
      redirectId: null,
    }
  }

  // Fetch campus data when the component mounts
  componentDidMount() {
    this.props.fetchStudent(this.state.studentId)
  }

  // Capture input data when it is entered
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Take action after the user clicks the submit button
  handleSubmit = async (event) => {
    event.preventDefault(); // Prevent browser reload/refresh after submit.

    let student = {
        id: this.state.studentId,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        imageURL: this.state.imageURL,
        campusId: this.state.campusId,
        gpa: this.state.gpa,
        email: this.state.email,
    };

    await this.props.editStudent(student)
    
    // Update state, and trigger redirect to show the updated campus
    this.setState({
        firstname: '',
        lastname: '',
        imageURL: '',
        gpa: '',
        email: '',
        campusId: null,
        redirect: true,
        redirectId: this.state.studentId,
    });
  };

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  // Render the edit campus form
  render() {
    // Redirect to the updated campus's page after submit
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />
    }

    // Display the edit form via the corresponding View component
    return (
      <div>
        <Header />
        <EditStudentView
          studentInfo={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    student: state.student,
  }
}

// The following input argument is passed to the "connect" function used by "EditCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    editStudent: (student) => dispatch(editStudentThunk(student)),   
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
  };
};

EditStudentContainer.propTypes = {
  fetchStudent: PropTypes.func.isRequired,
  editStudent: PropTypes.func.isRequired,
}

// Export store-connected container by default
// EditCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);