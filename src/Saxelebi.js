import React from "react"



const Saxelebi = ({submitClick, name, nameChange,number,numberChange,})=>{
    return(
    <>
    <form onSubmit= {submitClick}>
        <div>
            name:<input value = {name} onChange = {nameChange}/>   
        </div>
        <div>
          number: <input value={number} onChange={numberChange}/>
        </div>
        <button type="submit">add</button>



    </form>
    </>
    )
}

export default Saxelebi