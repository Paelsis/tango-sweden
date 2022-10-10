import React, {useState, useEffect} from 'react';

const ShowTable = ({list, handleClick}) =>
  <div>
  {list.length > 0?  
  <table style={{border:'1px solid lightGrey', margin:10}} >
      <thead>
         {Object.entries(list[0]).filter(it =>typeof it[1] !== 'object').map(key=><th>{key}</th>)}
      </thead>          
      <tbody>
          {list.map(row => 
              <tr>
                {Object.values(row).filter(it =>typeof it !== 'object').map(val=><th>{val}</th>)}
                <td><button onClick={()=>handleClick(row)}>ShowEntry</button></td>
              </tr>            
          )}      
      </tbody>    
  </table>
  :<h1>No table</h1>}
</div>

export default ShowTable