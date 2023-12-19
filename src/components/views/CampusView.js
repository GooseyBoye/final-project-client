/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";


const imageStyle = {
  maxWidth: '50vw',
  maxHeight: '50vh',
}



// Take in props data to construct the component
const CampusView = (props) => {
  const {campus} = props;
  const hasStudents = campus.students && campus.students.length > 0;
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      {campus.imageURL && <img src={campus.imageURL} alt={`${campus.name}`} style={imageStyle}/>}
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <h2> List of Students </h2>
      {!hasStudents && <p>There are no students enrolled in this campus.</p>}
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>             
          </div>
        );
      })}
       <Link to={'/campuses'}>Back to All Campuses</Link>
       <br></br>
       <br></br>


       <Link to={`/campus/${campus.id}/edit`}>
          Edit
        </Link>
        <br></br>

        <br></br>

        <br></br>


    </div>
  );
};

export default CampusView;