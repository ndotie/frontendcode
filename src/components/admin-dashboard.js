import { useEffect, useState } from "react";
import { BASE_URL, getUser } from "../commons"
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('access_token');
export default function MainDashboard(){
  const [ stats, setStats ] = useState({});

  let loadStats = async () => {
      try{
          let results = await axios.get(`${BASE_URL}dashboard`)
          // console.log( results )
          if( results.data.status ) {
            setStats( results.data.dashboard );
          }
      }catch( ex ) {
          console.log( ex );
          setStats({})
      }finally{

      }
  }

  useEffect(() => {
     loadStats();
  },[])
 
    return <section className="section dashboard">
    <div className="row">
      {/* Left side columns */}
       
          {/* Sales Card */}
          <div className="col-xxl-4 col-md-4">
            <div className="card info-card sales-card">
             
              <div className="card-body">
                <h5 className="card-title">
                  Classes <span>| All</span>
                </h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-book" />
                  </div>
                  <div className="ps-3">
                    <h6>{stats.lessonsToday}</h6>
                    {/* <span className="text-success small pt-1 fw-bold">
                      12%
                    </span>
                    <span className="text-muted small pt-2 ps-1">attended</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Sales Card */}
          {/* Revenue Card */}
          <div className="col-xxl-4 col-md-4">
            <div className="card info-card revenue-card">
              <div className="card-body">
                <h5 className="card-title">
                  Lecturer <span>| All</span>
                </h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-pen" />
                  </div>
                  <div className="ps-3">
                    <h6>{stats.lecturers}</h6>
                    {/* <span className="text-success small pt-1 fw-bold">
                      20%
                    </span>{" "}
                    <span className="text-muted small pt-2 ps-1">On duty</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Revenue Card */}
          {/* Customers Card */}
          <div className="col-xxl-4 col-xl-4">
            <div className="card info-card customers-card">
              <div className="card-body">
                <h5 className="card-title">
                  Attendance <span>| to day</span>
                </h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-people" />
                  </div>
                  <div className="ps-3">
                    <h6>{stats.attendence}</h6>
                    {/* <span className="text-danger small pt-1 fw-bold">
                      94%
                    </span>{" "}
                    <span className="text-muted small pt-2 ps-1">Of all</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-4">
            <div className="card info-card customers-card">
              <div className="card-body">
                <h5 className="card-title">
                  Subjects. <span>| this semester</span>
                </h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-book" />
                  </div>
                  <div className="ps-3">
                    <h6>{stats.subjects}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-4 col-xl-4">
            <div className="card info-card customers-card">
              <div className="card-body">
                <h5 className="card-title">
                  Students. <span>| This year</span>
                </h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-people" />
                  </div>
                  <div className="ps-3">
                    <h6>{stats.students}</h6>
                    {/* <span className="text-danger small pt-1 fw-bold">
                      12%
                    </span>{" "}
                    <span className="text-muted small pt-2 ps-1">suspended</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          
           
      {/* End Left side columns */}
      {/* Right side columns */}
      
      {/* End Right side columns */}
    </div>
  </section>  
}