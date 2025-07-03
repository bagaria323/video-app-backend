import { asyncHandler } from "../utils/asysncHandler.js";
import { apiResponse } from "../utils/apiResponse.js"; 

const healthcheck = asyncHandler ( async (req, res ) => { 
    return res.status(200).json(new apiResponse(200 , "ok" , "badiya chal rha h ")) ;  

})

export {healthcheck}