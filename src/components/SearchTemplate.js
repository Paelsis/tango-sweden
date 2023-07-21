import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import SearchLineField from './SearchLineField';

export default props => {
    const [searchValue, setSearchValue] = useState({})
    const {searchFields, setList, handleSearch} = props

    const handleRensa = () => {
        setList([])
        setSearchValue({})
    }    

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            handleSearch(searchValue)
        }
    }
    
    return(
        <>
        {searchFields?
            <form>
                    {searchFields.filter(fld=> !fld.hiddenInSearch).map(fld => 
                        <SearchLineField fld={fld} value={searchValue} setValue={setSearchValue} handleKeyPress={handleKeyPress} />
                    )}
                    <p/>
                    <div style={{marginTop:20, marginBotton:20}}>
                    <Button type="button" color="inherit" variant="outlined" onClick={()=>handleSearch(searchValue)} >Sök</Button>
                    &nbsp;&nbsp;
                    <Button type="button" color="inherit" variant="outlined" onClick={handleRensa}>Rensa</Button>
                    </div>
            </form>
        :
            <h3>Sökfält saknas</h3>            
        }
        </>
    )
}

