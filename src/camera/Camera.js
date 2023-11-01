import React, { useState } from 'react';
import AddPhotoMultiple from './AddPhotoMultiple';
import PhotoList from './PhotoList';

// Camera
export default props => {
        const [list, setList] = useState([])
        const {subdir} = props
        
        return(
                <div style = {{marginLeft:'auto', marginRight:'auto', marginTop:50}} className='columns'>
                        <div className='is-2 column is-narrow'>
                            <AddPhotoMultiple subdir={subdir} list={list} setList={setList} />
                        </div>
                        <div className='column is-10'>
                            <PhotoList subdir={subdir} list={list} setList={setList} />
                        </div>
                </div>
        )
}
      