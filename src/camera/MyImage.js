import React, {useEffect, useRef, useReducer, useState} from "react"
import {getSrc} from '../services/functions'
import {replaceRow} from "../services/serverPost"
import AddPhotoSingle from '../camera/AddPhotoSingle'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

// MyImage
export default ({tableName, email, subdir, sharedState, setSharedState}) => {
    const time=new Date();
    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };

    const filename = sharedState?sharedState.profileImageNow?sharedState.profileImageNow:sharedState.profileImage?sharedState.profileImage:null:null
    const src = getSrc(filename)
    
    const handleSaveImage = (profileImage, reply) => {
        const data = reply.data?reply.data:reply
        const status = data.status
        if (status === 'OK') {
            const profileImageNow = profileImage + '?' + Date.now()
            setSharedState({...sharedState, profileImage, profileImageNow})
        } else {
            const message = data.message?data.message:'No message'
            if (data.message) {
              alert(data.message) 
            } else {
              alert('[handleSaveImage]: ' + status +': Failed to save image ' + profileImage)  
            }
        }
    }

    const setProfileImage = fname => {
        
        //const profileImage = apiBaseUrl + subdir + '/' + fname
        const profileImage = fname
        if (fname) {
            const active = sharedState.active == 1?1:0
            // alert('profileImage:' + profileImage)
            setSharedState({...sharedState, profileImage})

            const data = {...sharedState, 
                active, 
                email, 
                profileImage, 
                html:undefined, 
                creaTimestamp:undefined, 
                updTimestamp:undefined,
                fetchRows:true
            }
            replaceRow(tableName, data, reply=>handleSaveImage(profileImage, reply))
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
                            setProfileImage={setProfileImage}
                    />
                    <small>{sharedState?.profileImage?sharedState.profileImage:'No src:' + src }</small>
                </>
            :null}
        </>              
    )
}    