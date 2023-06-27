import { useEffect, useState } from "react"
import moment from "moment"
import ProtectedLayout from "../layouts/protectedLayout"
import { allUsers, createUser } from "../usables/http"
import {  BASE_URL, getUser } from "../commons"
import axios from 'axios';
import { IsAdmin } from "../components/isadmin"
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('access_token');
export const UsersPage = () => {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ level, setLevel ] = useState(1);
    const [ password, setPassword ] = useState('')
    const [isCreating, setIsCreating] = useState( false );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ usersList, setUsersList ] = useState( [] );

     
    const tryCreateUser = async () => {
        if( !name.length || !email.length || !password.length ) return
        setIsCreating( true );
        try{
          await createUser( { name,email,password,level } );
          //All we can do is refreshing this up!!
          await tryLoadUsers();
        }catch( ex ){
            //ex
        }finally{
        setIsCreating( false );
        }
    }

    const tryLoadUsers = async () => {
        setIsLoading( true );
        try{
         let users = await allUsers();
         if( users.data.status ){
            setUsersList( users.data.users.data )
         }
        }catch( ex ){
        //  console.log( ex );
        }finally{
        setIsLoading( false );
        }
    }
    useEffect(() => {
        tryLoadUsers()
    },[])
    return <ProtectedLayout title = "Users">
            <IsAdmin>
                <div className="card">
                    <div className="card-body">
                        {/* Advanced Form Elements */}
                        <div className="row my-2 mt-4 align-items-center">
                        
                        <h4 className="my-1 col-sm-12">Create New User</h4>
                        
                        <div className="col-auto">
                        <label htmlFor="housename" className="col-form-label">
                            Full Names
                            </label>
                            <input
                            type="text"
                            id="housename"
                            value = {name}
                            onChange = {e => setName( e.target.value )}
                            className="form-control"
                            aria-describedby="passwordHelpInline"
                            />
                        </div>
                        <div className="col-auto">
                        <label htmlFor="email" className="col-form-label">
                            Email
                            </label>
                            <input
                            type="email"
                            id="email"
                            value = {email}
                            onChange = {e => setEmail( e.target.value )}
                            className="form-control"
                            aria-describedby="passwordHelpInline"
                            />
                        </div>
                        <div className="col-auto">
                        <label htmlFor="password" className="col-form-label">
                            Password
                            </label>
                            <input
                            type="password"
                            id="password"
                            value = {password}
                            onChange = {e => setPassword( e.target.value )}
                            className="form-control"
                            aria-describedby="passwordHelpInline"
                            />
                        </div>
                        <div className="col-auto">
                        <label htmlFor="role" className="col-form-label">
                            Role
                            </label>
                            <select onChange = {(e) => {setLevel(e.target.value)}} 
                                    id = "role"
                                    className="form-control">
                                <option value = {1}>Student</option>
                                <option value = {2}>Professor</option>

                            </select>
                        </div>
                        <div className="col-auto">
                        <label  className="col-form-label">
                            <span className="text-light">.</span>
                            </label><br/>
                            <button className="btn btn-primary btn-sm" onClick = {tryCreateUser}>{isCreating ? 'Saving...' : 'Save'}</button>
                        </div>
                        </div>
                        {/* End General Form Elements */}
                    </div>
                </div> 
            </IsAdmin> 

        <div className="card">
        <div className="card-body">
            <h5 className="card-title">Users List</h5>
            {/* Default Table */}
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>

                <th scope="col">Status</th>
                <th scope="col">Role</th>
                <th scope="col">Created at</th>
                <IsAdmin>
                  <th scope="col">More</th>
                </IsAdmin>
                </tr>
            </thead>
            <tbody>
                
                {usersList.map( (h,idx) => <UserRow key = {h.id} user = {h} idx = {idx} />)}
                
            </tbody>
            </table>
            {/* End Default Table Example */}
        </div>
</div>
    </ProtectedLayout>
}

const UserRow = ({user,idx}) => {
    const [ isChanging, setIsChanging ] = useState( false );
    const [ suspended,setSuspended ] = useState( false )
    const suspend = async () => {
        setIsChanging( true );
        try{
          await axios.post(`${BASE_URL}suspend`,{
            user_id : user.id
         });
         setSuspended( true )
        }catch( ex ){

        }finally{
        setIsChanging( false );
        }
    }

    const activate = async () => {
        setIsChanging( true );
        try{
         await axios.post(`${BASE_URL}activate`,{
            user_id : user.id
         });
         setSuspended( false )

        }catch( ex ){

        }finally{
        setIsChanging( false );
        }
    }
    return <tr>
    <th scope="row">{idx + 1}</th>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>{isChanging ? <span className="badge bg-info">changing...</span> : user.status && !suspended ? <span className="badge bg-info">active</span> : <span className="badge bg-warning">suspended</span>}</td>
    <td>{user.level === 1 ? <span className="badge text-warning">Student</span> : <span className="badge text-danger">Professor</span>}</td>
    <td>{moment(user.created_at).format('MMMM Do YYYY, h:mm:ss a')}</td>
    <IsAdmin>
         <td >{user.status && !suspended ? <button type = "button"
                                onClick = {suspend}
                                className="btn btn-warning btn-sm p-0 px-1">suspend</button> : <button type = "button"
                                onClick = {activate}
                                className="btn btn-success btn-sm p-0 px-1">activate</button> }</td>
    </IsAdmin>
    </tr>
}