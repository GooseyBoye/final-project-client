/*==================================================
StudentView.js

The Views component is responsible for rendering a web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const imageStyle = {
    maxWidth: '50vw',
    maxHeight: '50vh',
  };
  
  const { student } = props;
  const hasCampus = student.campus && student.campus.name;

  const defaultImageUrl = "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png";


  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h3>Email: {student.email}</h3>
      <h3>GPA: {student.gpa}</h3>
      {student.imageURL && <img src={student.imageURL || defaultImageUrl} alt={`${student.firstname} ${student.lastname}`} style={imageStyle}/>}
      <h3>Campus: {hasCampus ? (
        <Link to={`/campus/${student.campus.id}`}>
          {student.campus.name}
        </Link>
      ) : 'No Campus Assigned'}</h3>
      <Link to={'/students'}>Back to All Students</Link>
      <br>
      </br>
      <Link to={`/student/${student.id}/edit`}>
                Edit
              </Link>
    </div>
  );
};

export default StudentView;
