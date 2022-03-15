import React from "react";

const Filt = ({filter, filterChange,del})=>{
    return(
        <div>
            Filter <input value = {filter} onChange = {filterChange}/> <button onChange = {del} >delete</button>
        </div>
    )
}

export default Filt;