import { useState, useRef } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const handleUpload = async (url, formData) => {
  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Success:', response.data);
    return true;
  } catch (error) {
    // Visar det exakta felet från backend om det finns
    const errorMsg = error.response?.data?.message || error.response?.data || error.message;
    alert('[AddPhotoSingle]: SEVERE ERROR error: ' + errorMsg);
    return false;
  }
};

const AddPhotoSingle = (props) => {
  const [newFileNames, setNewFileNames] = useState([]);
  const fileInputRef = useRef(null);

  const getExtension = (filename) => {
    return filename.split('.').pop();
  };

  const buildFileName = (filename, ext) => {
    return filename + '.' + ext;
  };

  const uploadFiles = async (files) => {
    if (!files || files.length === 0) return;

    const formData = new FormData();
    
    if (props.subdir) formData.append('subdir', props.subdir);
    if (props.remove) formData.append('remove', props.remove);

    // Skapa en temporär array för att hålla koll på de nya namnen under denna rendering
    const updatedNames = [];

    for (let i = 0; i < files.length; i++) {
      let selectedFile = files[i];
      let newFileName = '';
      
      if (props.filename) {
        const newExt = getExtension(selectedFile.name);
        newFileName = buildFileName(props.filename, newExt);
      } else {  
        // Säkra upp så vi tar filens originalnamn om inget annat finns i state än
        newFileName = newFileNames[i] || selectedFile.name;
      }   
      
      updatedNames.push(newFileName);
      formData.append('newfile_arr[]', selectedFile, newFileName);
    } 

    // Uppdatera state EN gång efter loopen för att undvika multipla omrenderingar mitt i processen
    setNewFileNames(updatedNames);

    // Om föräldern vill ha namnet på den uppladdade bilden (t.ex. den första i listan)
    if (props.setProfileImage && updatedNames.length > 0) {
      props.setProfileImage(updatedNames[0]);
    }

    const url = apiBaseUrl + '/postImages';
    await handleUpload(url, formData);

    // Nollställ inputfaltet så att samma fil kan väljas igen om och om öppnas
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFiles(files);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        name="newfile"
        accept="image/*, application/pdf" 
        onChange={handleChange} 
        style={{ display: 'none' }}
        ref={fileInputRef} 
        // Lägg till multiple om du faktiskt loopar igenom flera filer i din kod
        multiple={props.multiple || false} 
      />
      <IconButton
        type="button"
        size="medium"
        edge="start"
        color="inherit"
        sx={{ mr: 0 }}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        <AddAPhotoIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
};

export default AddPhotoSingle;