import { Error } from "mongoose";

class ApiError extends Error {
     constructor (statuscode , message = "something went wrong " , errors =[] ,stack = "" )
     {
           super(message)
           this.statuscode =statuscode  ; 
           this.data = null ; 
           
           this.success = false ; 
           this.errors = errors ; 

           if(stack)
           {
            this.stack = stack ;
           }
           else { 
            
            Error.captureStackTrace(this, this.constructor) ;
         
           }
     }
}

export {ApiError}