import { useEffect, useState } from 'react';
import Saxelebi from './Saxelebi';
import Filt from "./Filt";
import axios from "axios"
import Book from './Book';
import './Style.css'


const baseUrl = 'http://localhost:3002/persons/'

const App = () => {



//axios.get('http://localhost:3002/persons').then((resp)=>console.log(resp))

// comment

  const [persons, setPersons] = useState([ { name: 'Arto Hellas' , number: "0973553" } ])  
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [ filter, setFilter] = useState('');
  const [message, setMessage] = useState('');

  useEffect(()=>  { axios.get('http://localhost:3002/persons').then((response) => setPersons(response.data))},[])






  const handleName = (event) => setNewName(event.target.value);
  const handleNumber = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);


  const addPerson = (event) => {
    event.preventDefault()
    let listObject = {
      name: newName,
      number: newNumber
    }
        let nameString = `${newName}`
        

    

    if (persons.find( ({ name }) => name === nameString )) {
      const person = persons.find((p) => p.name === newName)
        const id = person.id
      window.confirm(`${newName} is already added.` + ' replace the old number with a new one?')
      axios.put(`${baseUrl}/${id}`, listObject)
      axios.get('http://localhost:3002/persons').then((response) => setPersons(response.data))
      setMessage(
        `${newName} was successfully updated`
      )
      setTimeout(() => {
        setMessage('')
      }, 5000)

    } else {
      axios.post(baseUrl, listObject).then((response)=>{
        setNewName('')    //clear input field
        setNewNumber('')
        axios.get('http://localhost:3002/persons').then((response) => setPersons(response.data))
        setMessage(
          `${newName} was successfully added`
        )
        setTimeout(() => {
          setMessage('')
        }, 5000)
      })

    
      }
      



      
    }




// delete

const remove = (id) => {

  

  const deletedPerson= persons.find( person => person.id==id ).name

  console.log(deletedPerson)

setMessage(
    ` ${deletedPerson} was already deleted from server`
  )
  setTimeout(() => {
    setMessage('')
  }, 5000)


   axios.delete(`${baseUrl}${id}`).then((resp)=>   axios.get('http://localhost:3002/persons').then((response) => setPersons(response.data))
   )

  

};

// change



console.log(message)

//test

/* {persons !=="" && <div></div>} */

//test
let color = ""


  return (
    <div>
      <h2>Phonebook</h2>

     {message.includes ("successfully") ? <h2 className='Green'> {message} </h2> : message.includes ("deleted") ? <h2 className='Red'> {message} </h2> : <h2></h2> }

      <Filt filter={filter} filterChange={handleFilterChange} del = {remove}/>
      <Saxelebi 
      submitClick = {addPerson}
      name = {newName}
      nameChange = {handleName}
      number = {newNumber}
      numberChange = {handleNumber}
      
      />

      <h2>Numbers</h2>
      
     <div>
      <ul>
        
      {persons.filter(person=>person.name.includes(filter)).map(function newList (el){return(<div key={el.name}>  <li> {el.name}  {el.number} </li> <button onClick={()=>remove(el.id)} >delete</button> </div>)})}
        
      </ul>
    
      
      ...

    </div>
    </div>
  )
}

export default App