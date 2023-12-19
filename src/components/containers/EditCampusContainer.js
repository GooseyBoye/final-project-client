// EditCampusContainer.js

import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk} from '../../store/thunks';
import { fetchCampusThunk } from '../../store/thunks';


class EditCampusContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      campus: this.props.campus,
      campusId: this.props.match.params.id,
      redirect:false,
      redirectId:null,
    };
  }

  // Fetch campus data when the component mounts
  componentDidMount() {
    this.props.fetchCampus(this.state.campusId)
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

    let campus = {
      id:this.state.campusId,
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      imageURL: this.state.imageURL,
    };

    await this.props.editCampus(campus)
    
    // Update state, and trigger redirect to show the updated campus
    this.setState({
      name: '',
      address: '',
      description: '',
      imageURL: '',
      redirect: true,
      redirectId: this.state.campusId,
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
      return <Redirect to={`/campus/${this.state.redirectId}`} />;
    }

    // Display the edit form via the corresponding View component
    return (
      <div>
        <Header />
        <EditCampusView
          campusInfo={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus,
  }
}

// The following input argument is passed to the "connect" function used by "EditCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
    fetchCampus: (campusId) => dispatch(fetchCampusThunk(campusId)),
  };
};

EditCampusContainer.propTypes = {
  fetchCampus: PropTypes.func.isRequired,
  editCampus: PropTypes.func.isRequired,
}

// Export store-connected container by default
// EditCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);