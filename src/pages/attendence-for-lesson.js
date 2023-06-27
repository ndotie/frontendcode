import { useEffect, useState } from "react"
import ProtectedLayout from "../layouts/protectedLayout"
import moment from 'moment';
import { NavLink, useParams } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "../commons";
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('access_token');

export const LessonAttendence = () => {
    const { lesson_id } = useParams()
    const [ studentList, setStudentList ] = useState( [] );
    const getAttendence = async () => {
        try{
            let results = await axios.get(`${BASE_URL}attendence/${lesson_id}`);
            if( results.data.status ) {
                setStudentList( results.data.attendence)
            }
        }catch( ex ){

        }finally{}
    }
    useEffect(() => {
        getAttendence();
    }, [] );
    return <ProtectedLayout title = "Attendence">
         <div className="card">
        <div className="card-body">
            {/* <h5 className="card-title">Subjects List</h5> */}
            {/* Default Table */}
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Student</th>
                <th scope="col">Acc.Year</th>

                <th scope="col">Semester</th>
                <th scope="col">Created at</th>
                </tr>
            </thead>
            <tbody>
                
                {studentList.map( (h,idx) => <tr>
                <th scope="row">{idx + 1}</th>
                <td>{h?.student?.name}</td>
                <td>{h?.lesson?.subject?.accademic_year}</td>

                <td>{h?.lesson?.subject?.semister }</td>
                <td>{moment(h.created_at).format('MMMM Do YYYY, h:mm:ss a')}</td>
                {/* <td><NavLink to = {`/add-lesson/${h.id}`}><i className = "bx bx-edit-alt"></i></NavLink></td> */}
                </tr>)}
                
            </tbody>
            </table>
            {/* End Default Table Example */}
        </div>
</div>
    </ProtectedLayout>
}