
import { Axios,BASE_URL } from "../commons"

/**here he loads wards by the region_id passed as region on the function parameter */
export  const loadWards = async (region) => {
      try{
       let result = await Axios.get(`${BASE_URL}get/ward/${region}`)
       return result
      }catch( ex ){
          // ex
          throw ex; //cant handle it so we rethrow, we're going to catch it on the host
      }
}

/**here he loads wards by the region_id passed as region on the function parameter */
export  const loadKotas = async (kota) => {
    try{
     let result = await Axios.get(`${BASE_URL}get/kota/${kota}`)
     return result
    }catch( ex ){
        // ex
        throw ex; //cant handle it so we rethrow, we're going to catch it on the host
    }
}

//TODO kill this method
export const loadRegions = async () => {
    try{
        let results = await Axios.get(`${BASE_URL}get/proffesor`)
        return results
    }catch( ex ) { throw ex; }
}

export const loadProfessors = async () => {
    try{
        let results = await Axios.get(`${BASE_URL}get/proffesor`)
        return results
    }catch( ex ) { throw ex; }
}

export const loadDetails = async () => {
    try{
        let results = await Axios.get(`${BASE_URL}get/detail`);
        return results;
    }catch( ex ) {
        throw ex;
    }
}

export const loadAHouse = async ( house_id ) => {
    try {
      let results = await Axios.get(`${BASE_URL}get/house/${house_id}`);
      return results;//the results of the single house we have
    }catch ( ex ) {
        throw ex;
    }
}


export const uploadHouseImage = async ( info ) => {
    try {
         let results = await Axios.post(`${BASE_URL}house/image`, info );//mind you this info is form object
         return results;
    }catch ( ex ){
        throw ex;
    }
}

export const loadAHouseDetails = async ( house_id ) => {
    try{
        let results = await Axios.get(`${BASE_URL}get/house-detail/${house_id}`);
        return results;
    }catch( ex ){
      throw ex;
    }
}

/**Sending renting request for the house */
export const sendRentingRequest = async ( house_id ) => {
    try{
        let results = await Axios.post(`${BASE_URL}request-renting`, {
            house_id
        });
        return results
    }catch( ex ){
        throw ex;
    }
}

export const getPendingRequests = async () => {
    try{
        let results = await Axios.get(`${BASE_URL}pending-requests`);
        return results
    }catch ( ex ){
        throw ex;
    }
}

export const declineRequest = async ( request_id ) => {
    try{
     let results = await Axios.post(`${BASE_URL}decline-request`, {
        request_id 
     });
     return results;
    }catch( ex ){
        throw ex;
    }
}


export const acceptRequest = async ( request_id ) => {
    try{
     let results = await Axios.post(`${BASE_URL}accept-request`, {
        request_id 
     });
     return results;
    }catch( ex ){
        throw ex;
    }
}

export const createUser = async ( user ) => {
    try{
       return await Axios.post(`${BASE_URL}new-user`, user );
    }catch( ex ){
        throw ex;
    }
}

export const allUsers = async () => {
    try{
        return await Axios.get(`${BASE_URL}users`);
    }catch( ex ){
        throw ex;
    }
}