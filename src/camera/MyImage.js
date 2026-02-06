import React, {useEffect, useRef, useReducer, useState} from "react"
import {replaceRow} from "../services/serverPost"
import AddPhotoSingle from '../camera/AddPhotoSingle'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

// MyImage
export default ({tableName, email, subdir, sharedState, setSharedState}) => {
    const [src, setSrc] = useState() 
    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };

    useEffect(()=>{
        const time=new Date();
        const lclSrc = sharedState?.urlImage?sharedState.urlImage:undefined
        if (lclSrc) {
            setSrc(lclSrc + '?time=' + time)
        }    
    }, [sharedState])
    
    const handleSaveImage = (urlImage, reply) => {
        const data = reply.data?reply.data:reply
        const status = data.status
        if (status === 'OK') {
            alert('Successful upload of ' + urlImage)
            setSharedState({...sharedState, urlImage})
        } else {
            const message = data.message?data.message:'No message'
            if (data.message) {
              alert(data.message) 
            } else {
              alert('[handleSaveImage]: ' + status +': Failed to save image ' + urlImage)  
            }
        }
    }

    const setUrlImage = fname => {
        
        const urlImage = apiBaseUrl + '/images/' + subdir + '/' + fname
        if (fname) {
            const active = sharedState.active == 1?1:0
            setSharedState({...sharedState, urlImage})

            const data = {...sharedState, 
                active, 
                email, 
                urlImage, 
                html:undefined, 
                draft_description:undefined, 
                creaTimestamp:undefined, 
                updTimestamp:undefined,
                fetchRows:true
            }
            replaceRow(tableName, data, reply=>handleSaveImage(urlImage, reply))
        } else {
            alert("ERROR: Image not loaded")
        }
    }    

    return (
        <>
            {src?<img src={src} alt={'No photo (Fill in data before uploading photo'}/>:null}
            {(src&&email)?
                <>
                    <AddPhotoSingle 
                            remove={true}
                            filename={email} 
                            matching={email} 
                            subdir={subdir}
                            setUrlImage={setUrlImage}
                    />
                    <small>{sharedState?.urlImage?sharedState.urlImage:'No url image'}</small>
                </>
            :null}
        </>              
    )
}    