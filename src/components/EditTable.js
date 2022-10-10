import React from 'react';

export default ({list, setList, edit, setEdit}) => {

    const handleChange = (e, id) => setList(list.map(it=>{
            if (it.id===id) {
                return {...it,  [e.target.name]:e.target.value}
            } else {
                return it
            }    
        }
    ))
    const toggleEdit = id =>  {
        setEdit({...edit, [id]:edit[id]?!edit[id]:true})    
    }    
    return(        
        <div>
            {list.length > 0?
            <table>
                <thead>
                    <tr>    
                        {list[0]?Object.keys(list[0]).map(key=>
                            <th>{key}</th>
                        ):null}
                    </tr>
                </thead>
                <tbody>
                {list.map((li, index)=>
                    <tr>
                        {Object.entries(li).map(obj =>
                            <td>
                                {edit[li.id] && obj[0] !=='id'?
                                    <input type='text' name={obj[0]} value={obj[1]} onChange={e=>handleChange(e, li.id?li.id:0)} />
                                :
                                    obj[1]
                                }
                            </td>)
                        }
                        <td><button onClick={()=>toggleEdit(li.id)}>{edit[li.id]?'Spara':'Edit'}</button></td>
                    </tr>
                )}
                </tbody>
            </table>
            :
                <h2>No data</h2>
            }        
        </div>
    )
}
