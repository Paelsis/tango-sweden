
import React, {useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import serverPost from '../services/serverPost'
import {search} from '../services/search'
import SearchTemplate from '../components/SearchTemplate'
import FormTemplate from '../components/FormTemplate'
import EditTable from '../components/EditTable'


const styles = {
    container: {
        marginTop:80,
        display:'flex',
        flexDirection:'column',
        width:'100vw',
        overflow:'auto',
    },
    item: {
        margin:'auto',
    },
    flexContainer:{
        display:'flex',
        paddingTop:20,
        flexDirection: 'row',
        flexWrap:'wrap',  
        //backgroundColor:'rgba(32,32,32,1)',
        alignItems: 'flex-start',
        //justifyContent: 'top',
        //color:'#FFFFFF',
        // height:'calc(100vh \- 50px)'
    },
    row1:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight:100

    },
    row2:{
        flex:2,
        maxWidth:500,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'pre-wrap',       
        wordWrap: 'break-word',
    },
    button:{
        marginLeft:'5px',
        marginRight:'5px',
        marginBottom:'10px',
        borderWidth:'2px',
        height:50,
        color:'#FFFFFF',
        borderColor:'#FFFF87',
        backgroundColor:'transparent'
    }

}


const formFields = [
    {
        type:'text',
        label:'Name',
        name:'name',
    },
    {
        type:'text',
        label:'Email',
        name:'email',
    },
    {
        type:'text',
        label:'Color',
        name:'color',
    },
    {
        type:'number',
        label:'Auth level',
        name:'authLevel',
    },
    {
        type:'text',
        label:'Background-color light',
        name:'backgroundColorLight',
    },
    {
        type:'text',
        label:'Background-color dark',
        name:'backgroundColorDark',
    },

]


const tableName = 'tbl_user'
const searchView = 'tbl_user'

const searchFields = [
    {label:'Name:', name:'name'},
    {label:'City', name:'city'},
    {label:'Region', name:'region'},
    {label:'E-mail', name:'email'},
    {label:'Auth level:', name:'authLevel', hiddenInSearch:true},
    {label:'Color:', name:'color', hiddenInSearch:true},
    {label:'Background-color light:', name:'backgroundColorLight', hiddenInSearch:true},
    {label:'Background-color dark:', name:'backgroundColorDark', hiddenInSearch:true},
]     	


export default () => {
    const params = useParams()
    //const navigate = useNavigate()
    const [list, setList] = useState([])
    const [value, setValue] = useState({})

    const inputRef = useRef(null)
   
    useEffect(()=>{
        inputRef.current.focus()
        if (params.id > 0) {
            search(searchView, {id:params.id}, handleSearchReply) 
        }
    }, []) 


    const handleClickLine = rec => {
        updateValueAfterSearch(rec)
    } 

    const handleSaveCallback = reply => {
        const {status, record} = reply

        if (status === 'OK') {
            const disabledSaveSr = (value.kontaktadAvhamtningAv) ?1:0
            setValue({...value, disabledSaveSr})
        } else {
            const message = 'FELMEDDELANDE: Could not be updated'
            alert(message)
        }    
    }        

    const handleSave = () => {
            const record = {...value, id:undefined}
            serverPost('/updateRow', '', '', {tableName, record, id:value.id}, handleSaveCallback)
    }

    const removeEmptyVal = val => {   
        let newVal = {}
        Object.entries(val).map(it=> {
            if (it[1]) {
                newVal = {...newVal, [it[0]]:it[1]}
            }        
        })
        return newVal
    }

    const updateValueAfterSearch = rec =>
    {
        setValue(rec)
        setList([])
    }

    const handleSearchReply = list => {
        if (list.length === 0) {
            alert('Not found')    
        } if (list.length === 1) {
            const rec = list[0]
            updateValueAfterSearch(rec)
        } else {
            setList(list)
        }    
    }

    const handleSearch = searchKeys => {
        search(searchView, searchKeys, handleSearchReply) 
    }

    const handleReset = () => {
        setValue({})
        setList([])
    }

    const buttons=[
        {
            style:{color:'black', borderColor:'black'},
            type:'button',
            label:'Spara',
            required:true,
            disabled:value.disabledSaveSr?value.disabledSaveSr==1?true:undefined:undefined,
            handleClick:()=>handleSave()
        },    
        {
            style:{color:'black', borderColor:'black'},
            type:'button',
            label:'Rensa',
            handleClick:handleReset
        },    
    ]

    // const strValue = JSON.stringify(value)

    const searchFieldsRef = searchFields.map((it, index) => index===0?{...it, inputRef}:it)
    // {JSON.stringify(value)}
    return(
       <>    
        {value.email?
            <div style={styles.container}>
                <div style={styles.item}>
                <FormTemplate
                        buttons={buttons}
                        tableName={tableName} 
                        fields={formFields} 
                        value={value} 
                        setValue={setValue}
                    >
                   <h1>Setup for user {value.email}</h1>     
                </FormTemplate> 
                </div>
            </div>
        :
            <div style={styles.container}>
                <div style={styles.item}>
                    <SearchTemplate 
                        searchView={searchView}
                        searchFields={searchFieldsRef}
                        setValue={setValue} 
                        setList={setList} 
                        handleSearch={handleSearch}
                    />
                </div>
                <div style={styles.item}>
                    <EditTable 
                        tableName={tableName}
                        searchView={searchView} 
                        searchFields={searchFields}
                        list={list} 
                        setList={setList} 
                        handleClickLine={handleClickLine}
                    />
                </div>
            </div>
    }    
    </>
    )
} 
