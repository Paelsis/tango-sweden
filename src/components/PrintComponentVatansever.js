import React, {useState, useEffect} from 'react';
import logo from '../images/logo.png'
import moment from 'moment'
import {search} from '../services/search'
import ViewA4 from './ViewA4'

moment.locale('sv', {week:{dow : 1}})
const DEFAULT_WIDTH = 275

 
const height=0

const styles = {
    table:{
        borderCollapse:'collapse',
        padding:0,
        margin:0,
    },
    tr:lineHeight=>({
        margin:0, 
        lineHeight:lineHeight,
        margin:0,
    }),
    tdLabel:{
        width:80,
        paddingTop:0,
        paddingLeft:0,
        margin:0
    },
    tdLabelWide:{
        minWidth:80,
        paddingTop:0,
        paddingLeft:0,
        margin:0
    },
    tdValue:{
        paddingTop:0,
        marginRight:3
    },
    tdValueWide:{
        minWidth:75,
        paddingTop:0,
        paddingLeft:0,
        margin:0,
        marginRight:3
    },
    tdEmpty:{
        paddingTop:10,
        paddingLeft:3,
        marginRight:3
    },
    tdValueTextarea:{
        paddingTop:10,
        paddingLeft:3,
        marginRight:3
    },
    pre:{
        fontFamily: 'Lora',
        border:'1px solid black',
    },
    container: maxWidth =>({
        fontWeight:400,
        marginLeft:'2%',
        marginRight:'2%',
        maxWidth, 
        wordWrap:'break-word',
    }),
    dangerous:{
        lineHeight:1,
        padding:0, 
        margin:0,
    }
}



export const RenderDateAndNumber = ({value}) => {
    //const now = moment().format('YYYY-MM-DDHH:mm')
    const nowDate = moment().format('YYYY-MM-DD')
    const nowTime = moment().format('HH:mm')
    return(
            <table style={styles.table}>
                <tr style={styles.tr(1)}>
                    <td style={styles.tdLabel}>Inlämningsnummer:</td>
                    <td style={styles.tdValue}>{value.id?value.id:null}</td>
                </tr>
                <tr style={styles.tr(2)}>
                    <td style={styles.tdLabel}>{nowDate}</td>
                    <td style={styles.tdValue}>{nowTime}</td>
                </tr>
            </table>    
    )
}    

// Function to render kunduppgifter
export const RenderKunduppgifter = props => {
    const {anchor, value, lapp, flerObjekt, handleFlerObjekt} = props

    const styleValue = lapp?{...styles.tdValue, maxWidth:180, whiteSpace: 'pre-wrap', wordWrap: 'normal'}:styles.tdLabel
    const styleEmail = lapp?{...styles.tdValue, maxWidth:180, whiteSpace: 'pre-wrap', wordWrap: 'break-word'}:styles.tdLabel
    return(    
        <table style={styles.table}>
            <tr style={styles.tr(1)}>
                <td colSpan={2} style={styles.tdLabel}>Kunduppgifter</td>
            </tr>
            <tr style={styles.tr(1)}>
                <td style={styles.tdLabel}>Namn:&nbsp;</td>
                <td style={styles.styleValue}>{value.namn?value.namn:null}</td>
            </tr>
            <tr style={styles.tr(1)}>
                <td style={styles.tdLabel}>Telefonnr:&nbsp;</td>
                <td style={styles.styleValue}>{value.mobil?value.mobil:null}</td>
            </tr>
            <tr style={styles.tr(1)}>
                <td style={styles.tdLabel}>E-mail:&nbsp;</td>
                <td style={styleEmail}>
                    {anchor?<a style={styleValue} href={"mailto:" + (value.email?value.email:null)}>{value.email?value.email:null}</a>
                    :value.email?value.email:null
                    }
                </td>
            </tr>
            {value.fakturaKund?
                <>
                    <tr style={styles.tr(1)}>
                        <td style={styles.tdLabel} colSpan={1}>Organisationsnummer:&nbsp;</td>
                        <td style={styles.tdValue}>{value.orgnr}</td>
                    </tr>
                    <tr style={styles.tr(1)}>
                        <td style={styles.tdLabel} colSpan={2}>Fakturakund</td>
                    </tr>
                </>
                :
                    null
            }    
            {props.showId?
            <>
                <tr style={styles.tr(2)}>
                    <td style={styles.tdLabel}>Inlämningsnr:&nbsp;</td>
                    <td style={styles.tdValue}>{value.id}</td>
                </tr>
                <tr style={styles.tr(2)} />

            </>
            :null}
            <tr style={{height:5}}/>
            {handleFlerObjekt?
                    <tr style={styles.tr(1)}>
                        <td colSpan={2} style={{paddingTop:10, paddingBottom:10}} >
                            <input type="checkbox" value={flerObjekt} onChange={handleFlerObjekt} />
                            &nbsp;
                            <span style={{...styles.tdLabel, fontWeight:600}} >Fler objekt</span>
                        </td>
                    </tr>
                :
                    null
            }
        </table>
    )
}

const OrderHeaderLapp = props => {
    const {value} = props
    const now = moment().format('YYYY-MM-DD HH:mm')
    return(
        <>
            <span style={{fontSize:72}}>{(value.id)}</span>
            {value.akutPrioritet?<span style={{fontSize:48}} ><br/>AKUT</span>:null}
            {value.garanti?<span style={{fontSize:48}} ><br/>GARANTI</span>:null}
            <br/>
            <span style={{fontSize:32}}>{now}</span>
        </>
    )
}




const OrderHeaderKvitto = props => {
    return(
        <>
            <RenderDateAndNumber {...props} />
            <br/>
            <RenderKunduppgifter {...props} lapp={true} />
        </>
    )
}



const isValueEmpty = value => value === null || value === undefined || value === false || value == 0
const isValueTrue = value => value === true || value == 1


export const addGarantiAkutPrioritet = (fields, value) => {
    const newFields = fields.map(fld => {
        if (fld.name === 'kostnad') {
            if (value['garanti']==1 && value['akutPrioritet']==1) {
                return {...fld, label:fld.label + ' (AKUT och GARANTI)'}
            } else if (value['akutPrioritet']==1) {
                return {...fld, label:fld.label + ' (AKUT)'}
            } else if (value['garanti']==1) {
                return {...fld, label:fld.label + ' (GARANTI)'}
            } else {
                return fld   
            }    
        } else {
            return fld    
        }
    })
    return newFields
}    

const stylePre = {
    fontSize:15,
    paddingLeft:0,
    marginLeft:0,
    paddingTop:4,
    paddingBottom:4,
    whiteSpace: 'pre-wrap',       
    wordWrap: 'break-word',
    backgroundColor:'transparent'
}           
    
export const RenderFields = ({wide, fields, value}) => {
    const nowDate = moment().format('YYYY-MM-DD')
    const nowTime = moment().format('HH:mm')
    return(
        <table style={styles.table}>
            {fields.filter(it => (it.ignoreIfValueEmpty===true && isValueEmpty(value[it.name])?false:true)).
                filter(it=>(it.ignoreIfValueTrue===true && isValueTrue(value[it.name]))?false:true).map(it=> 
                    it.emptyRow?
                        <tr style={styles.tr(1)}>
                            <td colSpan={2} style={styles.tdEmpty} />
                        </tr>
                    :it.dateAndTime?
                        <tr style={styles.tr(1)}>
                            <td style={styles.tdLabel}>{nowDate}</td>
                            <td style={styles.tdValue}>{nowTime}</td>
                        </tr>
                    :
                        <tr style={styles.tr(1)}>
                            {it.ignoreLabel?
                                null
                            :
                                <td colSpan={it.ignoreValue?2:1} style={it.labelStyle?it.labelStyle:styles.tdLabel}>{it.label}{it.ignoreSemicolon?null:':'}&nbsp;</td>
                            }
                            {it.ignoreValue?
                                null
                            :
                                <td 
                                    colSpan={it.ignoreLabel?2:1} 
                                    style={it.valueStyle?it.valueStyle:it.ignoreLabel?styles.tdValueWide:styles.tdValue}>
                                {
                                    it.type==='date'?moment(value[it.name]).format('YYYY-MM-DD') 
                                    :it.type==='textarea'?<pre>{value[it.name]?value[it.name]:null}</pre>
                                    :value[it.name]?value[it.name]:null                              
                                }
                                </td>
                            }
                        </tr>
            )}
        </table>
       
    )
}

const ViewKvitto =  (ref, record, fields, value) =>
<div ref={ref}>
    <img style={{width:record.breddKvitto?record.breddKvitto:DEFAULT_WIDTH}} src={logo} />
    {record?record.headerKvitto?<div style={styles.dangerous} dangerouslySetInnerHTML={{__html: record.headerKvitton}} />:null:null}
    <RenderFields fields={fields} value={value} />
    {record?record.footerKvitto?<div style={styles.dangerous} dangerouslySetInnerHTML={{__html: record.footerKvitto}} />:null:null}
</div>



export const PrintFields = React.forwardRef((props, ref) => {
    const {fields, value} = props
    const [record, setRecord] = useState()
    const handleSearchReply = list => {
        //alert(JSON.stringify(list))
        if (list.length === 0) {
            alert('Varning: Fick inget resultat vid sökning i database')
        } if (list.length === 1) {
            setRecord(list[0])
        } else {
            alert('Multiple records:' + JSON.stringify(list))
        }    
    }
    useEffect(()=>{
        // Fetch header and footer
        const tableName = 'tbl_settings'
        search(tableName, {id:1}, handleSearchReply) 
    }, []) 
    const maxWidth = record?record.breddLapp?record.breddLapp:DEFAULT_WIDTH:DEFAULT_WIDTH
    return(
        <div style={{display:'none' }}>
            <div ref={ref} style={styles.container(maxWidth)}>
                <img style={{width:record?record.breddKvitto?record.breddKvitto:DEFAULT_WIDTH:DEFAULT_WIDTH}} src={logo} />

                {record?record.headerKvitto?<div style={styles.dangerous} dangerouslySetInnerHTML={{__html: record.headerKvitto}} />:null:null}
                <RenderFields fields={fields} value={value} />
                {record?record.footerKvitto?<div style={styles.dangerous} dangerouslySetInnerHTML={{__html: record.footerKvitto}} />:null:null}
            </div>
        </div>
    )
})

export const PrintA4 = React.forwardRef((props, ref) => {
    const value = props.value
    const [record, setRecord] = useState()
    const handleSearchReply = list => {
        //alert(JSON.stringify(list))
        if (list.length === 0) {
            alert('Varning: Fick inget resultat vid sökning i database')
        } if (list.length === 1) {
            setRecord(list[0])
        } else {
            alert('Multiple records:' + JSON.stringify(list))
        }    
    }
    useEffect(()=>{
        // Fetch header and footer
        const tableName = 'tbl_settings'
        search(tableName, {id:1}, handleSearchReply) 
    }, []) 
    const maxWidth = record?record.breddA4?record.breddA4:1000:1000
    return(
        <div style={{display:'none'}}>
            <div ref={ref} style={{maxWidth}}>
                <ViewA4 value={value} />
            </div>
        </div>
    )
})

export const CompanyHeader = React.forwardRef((props, ref) => {
    const {fields, value, A4} = props
    const [record, setRecord] = useState()
    const handleSearchReply = list => {
        //alert(JSON.stringify(list))
        if (list.length === 0) {
            alert('Varning: Fick inget resultat vid sökning i database')
        } if (list.length === 1) {
            setRecord(list[0])
        } else {
            alert('Multiple records:' + JSON.stringify(list))
        }    
    }
    useEffect(()=>{
        // Fetch header and footer
        const tableName = 'tbl_settings'
        search(tableName, {id:1}, handleSearchReply) 
    }, []) 

    return(
        record?(record.headerKvitto && record.headerA4)?
            <div 
                style={styles.dangerous} 
                dangerouslySetInnerHTML={{__html: A4?record.headerKvitto:record.headerA4}}
            />
        :null:null
    )
})

export const PrintLapp = React.forwardRef((props, ref) => {
    const {value, fields} = props
    const [record, setRecord] = useState()
    const handleSearchReply = list => {
        //alert(JSON.stringify(list))
        if (list.length === 0) {
            alert('Varning: Fick inget resultat vid sökning i database')
        } if (list.length === 1) {
            setRecord(list[0])
        } else {
            alert('Multiple records:' + JSON.stringify(list))
        }    
    }
    useEffect(()=>{
        // Fetch header and footer
        const tableName = 'tbl_settings'
        search(tableName, {id:1}, handleSearchReply) 
    }, []) 
    const maxWidth = record?record.breddKvitto?record.breddKvitto:DEFAULT_WIDTH:DEFAULT_WIDTH
    return(
        <div style={{display:'none'}}>
            <div ref={ref} style={styles.container(maxWidth)}>
                <OrderHeaderLapp {...props} />
                <RenderFields fields={fields} value={value} />
            </div>
        </div>
    )
})
//<br/>Felbeskrivning:{value.felbeskrivning?<div dangerouslySetInnerHTML={{__html: value.felbeskrivning}} />:'VARNING: Felbeskrivning saknas'} 



