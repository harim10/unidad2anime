import React, {useState}from "react";
import './App.css';
import  {firebase} from './firebase';

function App() {
  //Constante para mostrar en el html las tareas
  const [Personajes , setpersonajes] = useState([])
  //Constante para agregar nuevo anime 
  const [nombreanime, setAnime] = useState('')
  //Constante para agregar personaje
  const [PersonajeAnime, setPersonaje] = useState('')
  //Constante para edicion obtener id
  const [id, setId] = useState('')

  //Constante bandera para swichear entre agregar y editar
  const [modoEdicion, setModoEdicion] = useState(false)
  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore()
        const data = await db.collection('Personajes').get()
        console.log(data.docs)
        const arrayData = await data.docs.map(doc => ({ id: doc.id, ...doc.data()}))
        console.log(arrayData)
        setpersonajes(arrayData)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerDatos()

  }, [])

  
   

 //funcion agregar
  const agregar = async (e) => {
  console.log("Se esta ejecutando la funcion Agregar")
  e.preventDefault()
  //Validación para saber si esta llena o vacia la tarea
  if(!nombreanime.trim() | !PersonajeAnime.trim()){
    console.log("Falta un Campo")
    return
  }

  //Colocamos un try y catch por que la funcion es async
  //Vamos a invocar a db y firestore
  try {
    const db = firebase.firestore()
    //Declaramos un objeto para enviar todos los campos que enviaremos
    const nuevoAnime = {
      Anime: nombreanime,
      Personaje: PersonajeAnime
    }

    //Codigo para agregar la tarea en firebase codigo de plataforma
    const data = await db.collection('Personajes').add(nuevoAnime)

    //Con esto actualizo la lista sin dar refres prueba antes de poner
    setpersonajes([
      
      ...Personajes,
      {...nuevoAnime, id: data.id}
    ])      

    //Limpio tarea
    setAnime('')
    setPersonaje('')

  } catch (error) {
    console.log(error)
  }

  console.log(nombreanime)
}

//Funcion eliminar registros
const eliminar = async (id) => {
  try {
    console.log(id)
    const db = firebase.firestore()
    await db.collection('Personajes').doc(id).delete()

    const arrayFiltrado = Personajes.filter(item => item.id !== id)
    
    console.log("Arreglo completo",Personajes)
    console.log("Arreglo Filtrado",arrayFiltrado)
    
    setpersonajes(arrayFiltrado)

  } catch (error) {
    console.log(error)
  }
}


//Funcion para activar la edición
const activarEdicion = (item) =>{
  setModoEdicion(true)
  console.log("Elemento Anime",item.Anime)
  setAnime(item.Anime)
  console.log("Elemento Personaje",item.Personaje)
  setPersonaje(item.Personaje)
  console.log("Elemento id",item.id)
  setId(item.id)
}

const editar = async (e) => {
  console.log("Se esta ejecutando la funcion editar")
  e.preventDefault()
  if(!nombreanime.trim() | !PersonajeAnime.trim()){
    console.log("Falta un Campo")
    return
  }

  try {
    const db = firebase.firestore()
    //Declarar un objeto para mandar los datos actualizados
    const editarAnime = {
      Anime:nombreanime,
      Personaje: PersonajeAnime
    }

    await db.collection('Personajes').doc(id).update(editarAnime)

    //Actualizar en pantalla sin refrescar
    const arrayEditado = Personajes.map(item => (
      item.id === id ? editarAnime : item
    ))

    setpersonajes(arrayEditado)

    //Limpiar constantes
    setAnime('')
    setPersonaje('')
    setId('')
    setModoEdicion(false)

  } catch (error) {
    console.log(error)
  }


}

return (
  <div className="container">
    <h1>Mi proyecto de react con firebase</h1>
    <div className="row">
      <div className="col-md-6">
          <h3>Lista de personajes de anime</h3>
          <ul className="list-group">
          {
              Personajes.map(item => (
                <li className="list-group-item list-group-item-action " key={item.id}>
                <span>{item.Anime}</span>
                <br/>
                <span>{item.Personaje}</span>
                  
                  <button 
                  className=" btn btn-success btn-sm float-right"
                  onClick={() => eliminar(item.id)}>
                      Eliminar
                  </button>
                  <button 
                  className="btn btn-info btn-sm float-right"
                  onClick={() => activarEdicion(item)}
                  >
                      Editar
                  </button>
              </li>
              ))
          }
          </ul>
      </div>
      
      <div className="col-md-6">
          <h3>{
              modoEdicion ? 'Editar Personajes de anime' : 'Agregar Personajes de anime'
            }</h3>
          <form onSubmit={
            modoEdicion ? editar : agregar
            }>
            <input 
              type="text" 
              className="form-control mb-2"
              placeholder='Ingrese el anime'
              value={nombreanime}
              onChange={e => setAnime(e.target.value)}
            />
            <input 
              type="text"
              className="form-control mb-2"
              placeholder='Ingrese el nombre del personaje'
              value={PersonajeAnime}
              onChange={e => setPersonaje(e.target.value)}
            />
            <button
              type='submit'
              className={
                modoEdicion ? "btn btn-warning btn-block btn-sm" : "btn btn-dark btn-block btn-mb"
              }
            >{
              modoEdicion ? 'Actualizar' : 'Guardar'
            }</button>
          </form>
      </div>
  </div>

  </div>
);
}

export default App;
