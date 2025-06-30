import React, {Component} from 'react'
import axios from 'axios'
import Tooltip from '@mui/material/Tooltip';

import IconButton from '@mui/material/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import {STATUSLINE_STYLE} from '../services/const'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL


const styles={
  preview: {
    padding:1, 
    border:2, 
    borderStyle: 'dotted',
    borderColor:'red'
  }
}

class Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newFileNames:[],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleReset() {
    this.setState({newFileNames:[]});
  }  

  oldExtension(filename) {
    return filename.split('.').pop()
  }

  buildFileName(filename, ext) {
    return filename + '.' + ext
  }

  handleSubmit(event) {
    event.preventDefault();
    
    if (event.target.files.length > 0) {
      const formData = new FormData()
      //formData.append('rootdir', this.props.rootdir?this.props.rootdir:'')
      if (this.props.subdir) {
        formData.append('subdir', this.props.subdir?this.props.subdir:'')
      }
      
      if (this.props.remove) {
        formData.append('remove', this.props.remove?this.props.remove:'')
      }

      console.log('Submitting image to disk ...', STATUSLINE_STYLE.PROCESSING, 10000)

      // console.log(Object.fromEntries(formData))
      for(let i=0; i < event.target.files.length; i++) {
        let selectedFile = event.target.files[i]
        let newFileName = ''
        if (this.props.filename) {
          // Enforce filename with old extension
          const oldExt = this.oldExtension(event.target.files[i].name)
          newFileName = this.buildFileName(this.props.filename, oldExt)
        } else {  
          newFileName = this.state.newFileNames[i]
        }   

        formData.append('newfile_arr[]', selectedFile, newFileName)
      } 
      // alert(JSON.stringify(Object.fromEntries(formData)))
      console.log('formData', Object.fromEntries(formData))
      const url = apiBaseUrl + '/postImages'
      console.log('[AddPhotoSingle]:Posting image to disk with axios ...')
      axios.post(url, formData,
          {
              onUploadProgress: progressEvent => {console.log(progressEvent.loaded / progressEvent.total); }
          }
      ).then(response => {
          if (response.data.status ==='OK') {
            const fname = response.data.result.find(it=>this.props.matching?it.fname.includes(this.props.matching):true).fname
            if (fname) {
              console.log('[AddPhotoSingle]:Successful loading of image ' + fname)
              this.props.setUrlImage(fname)
            } else {
              alert('[AddPhotoSingle]: ERROR: No fname returnedSuccerssful load of image', STATUSLINE_STYLE.ERROR, 3000)
            } 
          } else {
            alert('[AddPhotoSingle]: ERROR: Posting image failed:' + JSON.stringify(response.data))
          }
      }).catch(error => {
          alert('[AddPhotoSingle]: ERROR: Failed to post image:' + error?.message?error.message:'<No message>');
      });
    }
  }

  handleChange(e) {
    e.preventDefault();
    for(let i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // When loaded submit to disk
        this.handleSubmit(e)
      }
      reader.readAsDataURL(e.target.files[i])
    }  
  }

  handleFileNameChange (e, ix) {
    // 1. Make a shallow copy of the items
    this.setState({
      newFileNames: [...this.state.newFileNames.slice(0,ix), e.target.value, ...this.state.newFileNames.slice(ix+1)]
    })
  }

  renderForm() {    
    return(
      <form className='columns is-centered' onSubmit={this.handleSubmit}>
          <IconButton
            //className='column is-narrow'
            type='submit'
            size="small"
            edge="start"
            color="inherit"
            sx={{ mr: 0 }}
          >
          <p/>  
            <SaveIcon display='none' />
          </IconButton>
          <IconButton
            //className='column is-narrow'
            type='button'
            size="small"
            edge="start"
            color="inherit"
            sx={{ mr: 0 }}
            onClick={()=>this.setState({newFileNames:[]})}
          >
            <CancelIcon  />                              
          </IconButton>
      </form>
    )
}
render() {
  return (
    <div>
        <div>
          <input 
            type="file" 
            name="newfile"
            accept="image/*, application/pdf" 
            onChange={this.handleChange} 
            style={{display:'none'}}
            ref={fileInput => this.fileInput = fileInput} 
          />
          <IconButton
            //className='column is-narrow'
            type='button'
            size="medium"
            edge="start"
            color="inherit"
            sx={{ mr: 0 }}
            onClick={()=>this.fileInput.click()}
          >
            <AddAPhotoIcon fontSize="inherit" />
          </IconButton>
        </div>
    </div>


  )
}
}

export default props => <Comp {...props}/>
  