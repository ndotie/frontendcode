import ProtectedLayout from "../layouts/protectedLayout"
import { useEffect, useState } from 'react';
import {  loadProfessors } from "../usables/http";
import { BASE_URL, Axios, getUser } from "../commons";
import moment from "moment";
import { NavLink } from "react-router-dom";

export const AddSubject = props => {
    //TODO LOAD HOUSES 
    const [ profs, setProfs ] = useState( [] );
    const [ subjectsList, setSubjectsList ] = useState( [] );
    const [ subjectIsLoading, setSubjectIsLoading ] = useState( false ); 
    const [ professor_id, setProfessorID ] = useState(); 
    const [ subject_name, setSubjectName ] = useState('')
    const [ accademic_year, setAcademicYear ] = useState( '' );
    const [ semester, setSemester ] = useState("I");
    const [isCreating, setIsCreating ] = useState( false );
    const [isLoadingRegion, setIsLoadingRegion ] = useState( false );
    const tryLoadProfessors = async () => {
        setIsLoadingRegion( true );
        try{
            let result = await loadProfessors();
            if( result.data.status ) {
                setProfs( result.data.professors );
            }
        }catch( ex ){

        }finally{
         setIsLoadingRegion( false );
        }
    }
    
   

    const CreateSubject = async () => {
        setIsCreating( true );
        try{
           let results = await Axios.post( `${BASE_URL}new-subject`, {
            user_id : professor_id,  subject : subject_name, accademic_year,semister : semester
          })
          console.log( results )
          if( results.data.status ) {
            setSubjectsList([results.data.subject, ...subjectsList])
          }
          setSubjectName("")
        }catch( ex ) {

        }finally{
            setIsCreating( false );
        }
    }

    const loadSubjects = async() => {
        setSubjectIsLoading( true );
        try{
           let results = await Axios.get(`${BASE_URL}subjects`);
           if( results.data.status ) {
            if( results.data.subjects ){
                setSubjectsList( results.data.subjects.data );
            }
           }
        }catch ( ex ) {

        }finally {
        setSubjectIsLoading( false );

        }
    }
    useEffect(() => {
        tryLoadProfessors();
        loadSubjects()
    },[]) 

    let user = getUser()
    
    return <ProtectedLayout title = "Create Subject">
        {user.admin ? <div className="card">
            <div className="card-body">
                {/* Advanced Form Elements */}
                <div className="row my-2 mt-4 align-items-end"> 
                <div className="col-auto">
                    <label htmlFor="housename" className="col-form-label">
                    Subject Name
                    </label>
                    <input
                    type="text"
                    id="housename"
                    value = {subject_name}
                    onChange = {e => setSubjectName( e.target.value )}
                    className="form-control"
                    aria-describedby="passwordHelpInline"
                    />
                </div>
                
                <div className="col-auto">
                    <label htmlFor="acc_year" className="col-form-label">
                    Accademic Year
                    </label>
                    <input
                    type="text"
                    id="acc_year"
                    value = {accademic_year}
                    onChange = {e => setAcademicYear( e.target.value )}
                    className="form-control"
                    aria-describedby="passwordHelpInline"
                    />
                </div>
                <div className="col-auto">
                    <label htmlFor="semester" className="col-form-label">
                    Semester
                    </label>
                    <select className="form-select" 
                            id = "semester"
                            aria-label="Default select example"
                            onChange = {e => setSemester( e.target.value )}
                            >
                        <option value="I">Semester I</option>
                        <option value="II">Semester II</option>
                    </select>
                </div> 
                <div className="col-auto">
                    <label htmlFor="semester" className="col-form-label">
                    Lecturer
                    </label>
                    <select className="form-select" 
                            aria-label="Default select example"
                            onChange = {e => setProfessorID( e.target.value )}
                            >
                        <option selected="">Select professor</option>
                        {profs.map(reg => <option key = {reg.id} value={reg.id}>{ reg.name }</option>)}
                    </select>
                </div>  
                <div className="col-auto mb-1">
                    <button className="btn btn-primary btn-sm" onClick = {CreateSubject}>{isCreating ? 'Saving...' : 'Save'}</button>
                </div>
                </div>
                {/* End General Form Elements */}
            </div>
        </div>:null }
        

        <div className="card">
        <div className="card-body">
            <h5 className="card-title">Subjects List</h5>
            {/* Default Table */}
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Subject</th>
                <th scope="col">Year</th>

                <th scope="col">Lecturer</th>
                <th scope="col">email</th>
                <th scope="col">Created at</th>
                <th scope="col">More</th>
                </tr>
            </thead>
            <tbody>
                
                {subjectsList.map( (h,idx) => <tr>
                <th scope="row">{idx + 1}</th>
                <td>{h.subject}</td>
                <td>{h.accademic_year}</td>

                <td>{h.user?.name }</td>
                <td>{h.user?.email}</td>
                <td>{moment(h.created_at).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td><NavLink to = {`/add-lesson/${h.id}`}><i className = "bx bx-edit-alt"></i></NavLink></td>
                </tr>)}
                
            </tbody>
            </table>
            {/* End Default Table Example */}
        </div>
</div>



    </ProtectedLayout>
}