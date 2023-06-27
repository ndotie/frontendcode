import ProtectedLayout from "../layouts/protectedLayout"
import { useEffect, useState } from 'react'; 
import { BASE_URL, Axios } from "../commons";
import moment from "moment";
import { NavLink,useParams } from "react-router-dom";


export const AddLession = props => {
    //TODO LOAD HOUSES 
    const [ profs, setProfs ] = useState( [] );
    const [ lessionList, setLessonList ] = useState( [] );
    const [ subjectIsLoading, setSubjectIsLoading ] = useState( false ); 
    const [ starts_at, setStartAt ] = useState(); 
    const [ ends_at, setEndAt ] = useState(); 
    const [ error, setError ] = useState();

    const [ subject_name, setSubjectName ] = useState('')
    const [ accademic_year, setAcademicYear ] = useState( '' );
    const [ semester, setSemester ] = useState('');
    const [isCreating, setIsCreating ] = useState( false );
    const [isLoadingRegion, setIsLoadingRegion ] = useState( false );
    const { subject_id } = useParams();


    const CreateLession = async () => {
        setIsCreating( true );
        setError()
        try{
           let results = await Axios.post( `${BASE_URL}new-lession`, {
              subject_id ,  starts_at, ends_at
          }) 
          if( results.data.status ) {
            setLessonList([results.data.lession, ...lessionList])
          }
          setSubjectName("")
        }catch( ex ) {
            setError( ex.response.data.errors );

        }finally{
            setIsCreating( false );
        }
    }

    const loadLessons = async() => {
        setSubjectIsLoading( true );
        try{
           let results = await Axios.get(`${BASE_URL}all-lession/${subject_id}`);
           if( results.data.status ) {
            if( results.data.lessions ){
                setLessonList( results.data.lessions.data );
            }
           }
        }catch ( ex ) {

        }finally {
        setSubjectIsLoading( false );

        }
    }
    useEffect(() => { 
        loadLessons()
    },[]) 
    
    return <ProtectedLayout title = "Start New Lession">
        <div className="card">
            <div className="card-body">
                {/* Advanced Form Elements */}
                <div className="row my-2 mt-4 align-items-end"> 
                <div className="col-auto">
                    <label htmlFor="start_time" className="col-form-label">
                      Start Time
                    </label>
                    <input
                    type="time"
                    id="start_time"
                    value = {starts_at}
                    onChange = {e => setStartAt( e.target.value )}
                    className="form-control"
                    aria-describedby="passwordHelpInline"
                    />
                </div>

                <div className="col-auto">
                    <label htmlFor="end_time" className="col-form-label">
                      End Time
                    </label>
                    <input
                    type="time"
                    id="end_time"
                    value = {ends_at}
                    onChange = {e => setEndAt( e.target.value )}
                    className="form-control"
                    aria-describedby="passwordHelpInline"
                    />
                </div>
                
                  
                <div className="col-auto mb-1">
                    <button className="btn btn-primary btn-sm" onClick = {CreateLession}>{isCreating ? 'Saving...' : 'Save'}</button>
                </div>
                {error ? <div className="col-sm-12">
                    <p className="text-danger">{error}</p>
                </div>:null}
                </div>
                {/* End General Form Elements */}
            </div>
        </div>

        <div className="card">
        <div className="card-body">
            <h5 className="card-title">Lessions List</h5>
            {/* Default Table */}
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Subject</th>
                <th scope="col">Year</th>

                <th scope="col">Lecturer</th>
                <th scope="col">Start At</th>
                <th scope="col">Ends At</th>

                <th scope="col">Created at</th>
                <th scope="col">QR-code</th>
                <th scope="col">Attendence</th>


                </tr>
            </thead>
            <tbody>
                
                {lessionList.map( (h,idx) => <tr>
                <th scope="row">{idx + 1}</th>
                <td>{h.subject?.subject}</td>
                <td>{h.subject?.accademic_year}</td>

                <td>{h.subject?.user?.name }</td>
                <td>{ h.starts_at }</td>
                <td>{ h.ends_at }</td> 
                <td>{moment(h.created_at).format('ddd, MM Do YYYY')}</td>
                <td><NavLink to = {`/scan-code/${h.id}`}><i className = "bi bi-code-slash"></i></NavLink></td>
                <td><NavLink to = {`/lesson-attendence/${h.id}`}><i className = "bx bx-list-ul"></i></NavLink></td>

                </tr>)}
                
            </tbody>
            </table>
            {/* End Default Table Example */}
        </div>
</div>



    </ProtectedLayout>
}