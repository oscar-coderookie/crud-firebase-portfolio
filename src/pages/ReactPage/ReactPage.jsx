import { id } from "postcss-selector-parser";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import firebase from '../../config/firebase';


const ReactPage = () => {
  const INITIAL_STATE = {
    title: '',
    repository: '',
    deploy: '',
  }
  
  const [values, setValues]= useState(INITIAL_STATE);
  const [reactProjects, setReactProjects] = useState([]);
  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    getReactProjects();
  }, [])

  const getReactProjectById = async(id) => {
    const doc = await firebase.firestore().collection('reactjs').doc(id).get();
    setValues({...doc.data()});
  }

  useEffect(() => {
    if(currentId === ''){
      setValues({...INITIAL_STATE})
    }else{
      getReactProjectById(currentId)
    }
  }, [currentId])

  const addOrEdit = async(item) => {
    await firebase.firestore().collection('reactjs').doc().set(item);
    toast('Proyecto Agregado correctamente', {
      type: 'success',
      autoClose: 2000
    })
  
  };

  // function for get all projects in array:
  const getReactProjects = async () => {
    firebase.firestore().collection('reactjs').onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id: doc.id});
        });
        setReactProjects(docs)
    });
};
  // function to delete project:
  const deleteReactProject = async(id) => {
    if( window.confirm('estás seguro de eliminar el proyecto?')){
     await firebase.firestore().collection('reactjs').doc(id).delete();
     toast('Proyecto eliminado de la base de datos..', {
       type: 'warning',
       autoClose: 2000
     })
    }
  }
  // function for listen inputs: '',
  const handleInputchange = e => {
    const {name, value} = e.target;
    setValues({...values, [name]: value})
  }

  // function for send data to firebase:
  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEdit(values);
    setValues({...INITIAL_STATE});
  };

  return (
    <div style={{ height: "100vh" }} className="react-page d-flex align-items-start justify-content-center pt-5">
      <div className="container-xl">
        <div className="row">
          <div className="col-10 col-md-6 mx-auto">
            <div className="card p-0">
              <div className="card-body">
                <div className="card-header bg-transparent py-2">
                <h4 className="py-2">Formulario creación/edición</h4>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form-group py-2 ">
                    <input 
                    type="text" 
                    name="title"
                    className="form-control" 
                    placeholder="nombre del proyecto"
                    onChange={handleInputchange}
                    value={values.title} />
                  </div>
                  <div className="form-group py-2">
                    <input 
                    type="text" 
                    name="repository"
                    className="form-control" 
                    placeholder="url repositorio"
                    onChange={handleInputchange}
                    value={values.repository} />
                  </div>
                  <div className="form-group py-2">
                    <input 
                    type="text" 
                    name="deploy"
                    className="form-control" 
                    placeholder="url despliegue web"
                    onChange={handleInputchange}
                    value={values.deploy} />
                  </div>
                  <button type="submit" className="btn-lg btn btn-primary">
                    {currentId === '' ? 'Guardar Nuevo Proyecto' : 'Actualizar Proyecto'}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-10 col-md-6 mx-auto">
            <h2 className="py-3">Listado:</h2>
            {reactProjects.map((project)=> {
              return (
                <div className="card my-2" key={project.id}>
                  <div className="card-body">
                    <p className="p-0 m-0">{project.title}</p>
                  </div>
                  <div className="card-footer">
                  <span 
                  className="fas fa-edit"
                  style={{fontSize: 20, padding: 6, marginRight: 10}} 
                  onClick={() => setCurrentId(project.id)}>
                    Editar
                  </span>
                    <span 
                    style={{fontSize: 20, padding: 6, marginRight: 10}} 
                    className="far fa-trash-alt"
                    onClick={() => deleteReactProject(project.id)}>
                      Eliminar
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactPage;
