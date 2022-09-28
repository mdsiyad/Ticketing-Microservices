import axios from 'axios'
import React, { useState } from 'react'

export default function useRequest({url,method,body,onSuccess}) {
    const [errors,setErrors] = useState(null)


    const doRequest = async (props = {}) =>{
        try {
            setErrors(null)
            const response = await axios[method](url,{...body,...props});
            if(onSuccess){
                onSuccess(response.data)
            }
        } catch (error) {
            setErrors(
                <div
                className="alert alert-danger mt-5"
          >
           <ul className="my-0">
           {error?.response?.data?.errors.map((err,indx) => <li key={indx}>{err.message}</li> )}
           </ul>
          </div>
            )

         
        }
        
    }
  return {doRequest,errors}
}
