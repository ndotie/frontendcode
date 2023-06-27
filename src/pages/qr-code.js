import ProtectedLayout from "../layouts/protectedLayout"
import { useEffect, useState } from 'react'; 
import { BASE_URL, Axios } from "../commons";
import moment from "moment";
import {  useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";


export const Qrcode = props => {
    //TODO LOAD HOUSES 
     
    const { lesson_id } = useParams();
    const [ isLoading, setIsLoading ] = useState( false );
    const [ lesson, setLesson ] = useState()

    const loadTheLesson = async () => {
        setIsLoading( true );
        try{
           let results = await Axios.get(`${BASE_URL}get-lession/${lesson_id}`);
           console.log( results );
           if( results.data.status ) {
            //in here we should load a code alone
            setLesson( results.data.lesson )
           }
        }catch( ex ) {
            setLesson();
        }finally {
            setIsLoading( false );

        }
    }

    
    useEffect(() => { 
        loadTheLesson();
    },[]) 
    
    return <ProtectedLayout title = "Scan to attend">
        
        <div className="card">
        <div className="card-body">
        <h5 className="card-title">Students Scan Code</h5>

            <div className="row">
                <div className="col-6">
                {isLoading ? <h2>Loading...</h2> : <QRCodeCanvas
                    id="qrCode"
                    value={lesson ? lesson.code : '--'}
                    size={300}
                    bgColor={"#FAFAC6"}
                    level={"H"}
                    />}
                </div>
                <div className="col-6">
                    <h3>{lesson?.subject?.subject}</h3>
                    <strong>Accademic year: </strong> { lesson?.subject?.accademic_year } <br />
                    <strong>Semister: </strong> { lesson?.subject?.semister } <br />

                    <strong>Start time: </strong> { lesson ? lesson.starts_at : "--" } <br />
                    <strong>End time: </strong> { lesson ? lesson.ends_at : "--" } <br />

                </div>

            </div>
            
        </div>
</div>



    </ProtectedLayout>
}