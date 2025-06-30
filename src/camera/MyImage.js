import React, {useEffect, useRef, useReducer, useState} from "react"
import {replaceRow} from "../services/serverPost"
import AddPhotoSingle from '../camera/AddPhotoSingle'
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

// MyImage
export default ({tableName, email, subdir, value, setValue}) => {

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };
    const src = value?.urlImage?value.urlImage + '?' + randomNumberInRange(1,1000000):undefined
    
    const handleSaveImage = (urlImage, reply) => {
        const data = reply.data?reply.data:reply
        if (data.status === 'OK') {
            const row = data.list.find(it=>it.email === email)
            if (row) {
                /* No action required
                setTimeout(()=>{
                    URL.revokeObjectURL(value.urlImage)
                    window.location.reload(false);
                }, 
                500);
                */
            } else {
                setValue({...row, urlImage: undefined})
            }
        } else {
            if (data.message) {
              alert(JSON.stringify(data.message))  
            } else {
              alert('[handleSaveImage]: ERROR: Failed to save image ' + urlImage)  
            }
        }
    }

    const setUrlImage = fname => {
        const urlImage = apiBaseUrl + '/' + subdir + '/' + fname
        if (fname) {
            const active = value.active == 1?1:0
            const record = {...value, active, email, urlImage, html:undefined, draft_description:undefined, creaTimestamp:undefined, updTimestamp:undefined}
            const data = {...record, fetchRows:true}
            setValue({...value, urlImage})
            replaceRow(tableName, data, reply=>handleSaveImage(urlImage, reply))
        } else {
            alert("ERROR: Image not loaded")
        }
    }    

    return (
        <>

            {src?<img src={src} alt={'No photo (Fill in data before uploading photo'}/>:null}
            {email?
                <>
                    <AddPhotoSingle 
                            remove={true}
                            filename={email} 
                            matching={email} 
                            subdir={subdir}
                            setUrlImage={setUrlImage}
                    />
                    <small>{value?.urlImage?value.urlImage:'No url image'}</small>
                </>
            :
                <h2>No email to fetch the image</h2>
            }  
        </>              
    )
}    