import React, {Component} from 'react'
import axios from 'axios'

import IconButton from '@mui/material/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

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
        selectedFiles:[],
        newFileNames:[],
        imagePreviewUrls: [],
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleReset() {
      this.setState({selectedFiles:[], imagePreviewUrls:[], newFileNames:[]});
    }  

    oldExtension(filename) {
      return filename.split('.').pop()
    }

    buildFileName(filename, ext) {
      return filename + '.' + ext
    }

    handleSubmit(event) {
      event.preventDefault();
      
      if (this.state.selectedFiles.length > 0) {
        const formData = new FormData()
        //formData.append('rootdir', this.props.rootdir?this.props.rootdir:'')
        if (this.props.subdir) {
          formData.append('subdir', this.props.subdir?this.props.subdir:'/public/images')
        }
        // console.log(Object.fromEntries(formData))
        for(let i=0; i < this.state.selectedFiles.length; i++) {
          let selectedFile = this.state.selectedFiles[i]

          let newFileName = ''
          if (this.props.filename) {
            // Enforce filename with old extension
            const oldExt = this.oldExtension(this.state.newFileNames[i])
            newFileName = this.buildFileName(this.props.filename, oldExt)
          } else {  
            newFileName = this.state.newFileNames[i]
          }   

          formData.append('newfile_arr[]', selectedFile, newFileName)
        } 
        // alert(JSON.stringify(Object.fromEntries(formData)))
        console.log('formData', Object.fromEntries(formData))
        const url = apiBaseUrl+'/postImages'
        axios.post(url, formData,
            {
                onUploadProgress: progressEvent => {console.log(progressEvent.loaded / progressEvent.total); }
            }
        ).then(response => {
            // alert('AddPhotoMultiple.handleSubmit: response.data' + JSON.stringify(response.data))
            if (this.props.addImage) {
              this.state.newFileNames.forEach(it => {
                this.props.addImage(it)
              }) 
            }
            if (response.data.status ==='OK') {
              this.props.setList(response.data.result.filter(it=>this.props.matching?it.fname.includes(this.props.matching):true))
            } else {
              alert('ERROR: Posting of image failed:' + JSON.stringify(response.data))
            }
        }).catch(error => {
            alert('ERROR: Failed to post image:' + JSON.stringify(error.message));
        });
      }
    }

    handleChange(e) {
      e.preventDefault();
      const selectedFiles = e.target.files;
      let imagePreviewUrls = []
      let newFileNames = []
      for(let i = 0; i < selectedFiles.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          imagePreviewUrls = [...imagePreviewUrls, reader.result]
          newFileNames = [...newFileNames, selectedFiles[i].name]
          this.setState({selectedFiles, imagePreviewUrls, newFileNames})
        }
        reader.readAsDataURL(selectedFiles[i])
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
              onClick={()=>this.setState({selectedFiles: [], imagePreviewUrls:[], newFileNames:[]})}
            >
              <CancelIcon  />                              
            </IconButton>
        </form>
      )
  }
  render() {
    let {imagePreviewUrls} = this.state;
    return (
      <div>
        {imagePreviewUrls.length > 0?
            <div>
              <div>
                {imagePreviewUrls.map((it, ix)=>
                  <div key={'div' + ix}>            
                    <img key={'img' + ix} src={it} style={{padding:0, border:'2px dotted yellow'}}/>
                    {!this.props.filename?
                    <input 
                      key={'input' + ix}
                      type='text' 
                      style={{marginTop:0, paddingTop:0, height:20, fontSize:'x-small'}}
                      value={this.props.filename?this.props.filename:this.state.newFileNames[ix]} 
                      onChange={(e)=>this.handleFileNameChange(e, ix)}
                    />:null}
                  </div>
                )} 
              </div>
              {this.renderForm()}
            </div>
        :
          <div>
            <input 
              type="file" 
              name="newfile"
              accept="image/*, application/pdf" 
              onChange={this.handleChange} 
              style={{display:'none'}}
              ref={fileInput => this.fileInput = fileInput} 
              multiple={this.props.multiple?true:false}
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
        }
      </div>


    )
  }
}

export const AddPhotoSingle = props => <Comp multiple={undefined} {...props}/>
export const AddPhotoMultiple = props => <Comp multiple={true} {...props} />
  