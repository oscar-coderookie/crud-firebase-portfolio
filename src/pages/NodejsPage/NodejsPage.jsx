import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import firebase from "../../config/firebase";

const db = firebase.firestore();

export const addOrEditLink = async (linkObject) => {
  await db.collection("nodejs").doc().set(linkObject);
};

const NodejsPage = () => {
  const INITIAL_STATE = {
    title: "",
    repository: "",
    deploy: "",
    thumb: "",
  };

  const [values, setValues] = useState(INITIAL_STATE);
  const [nodejsProjects, setNodejsProjects] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    getNodejsProjects();
  }, []);

  const getNodejsProjectById = async (id) => {
    try {
      const doc = await firebase.firestore().collection("nodejs").doc(id).get();
      setValues({ ...doc.data() });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentId === "") {
      setValues({ ...INITIAL_STATE });
    } else {
      getNodejsProjectById(currentId);
    }
  }, [currentId]);

  const addOrEdit = async (item) => {
    try {
      if (currentId === "") {
        await firebase.firestore().collection("nodejs").doc().set(item);
        toast("Proyecto Agregado correctamente", {
          type: "success",
          autoClose: 2000,
        });
      } else {
        await firebase.firestore().collection("nodejs").doc(currentId).update(item);
        toast("Proyecto actualizado correctamente", {
          type: "info",
          autoClose: 2000,
        });
        setCurrentId("");
        setValues(INITIAL_STATE);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // function for get all projects in array:
  const getNodejsProjects = async () => {
    try {
      firebase
        .firestore()
        .collection("nodejs")
        .onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setNodejsProjects(docs);
        });
    } catch (error) {
      console.error(error);
    }
  };
  // function to delete project:
  const deleteNodejsProject = async (id) => {
    try {
      if (window.confirm("estás seguro de eliminar el proyecto?")) {
        await firebase.firestore().collection("nodejs").doc(id).delete();
        toast("Proyecto eliminado de la base de datos..", {
          type: "warning",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // function for upload img:
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // function for firestorage:
  const handleUploadImg = () => {
    const uploadImg = firebase.storage().ref(`images/${image.name}`).put(image);
    uploadImg.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        firebase
          .storage()
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
          });
      }
    );
  };

  // function for listen inputs: '',
  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // function for send data to firebase:
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUploadImg(image);
    addOrEdit(values);
    setValues({ ...INITIAL_STATE });
  };

  return (
    <div style={{ height: "100vh" }} className="nodejs-page d-flex align-items-start justify-content-center pt-5">
      <div className="container-xl">
        <h1>Proyectos de Nodejs</h1>
        <div className="row">
          <div className="col-11 col-md-6 mx-auto">
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
                      className="form-control mt-3"
                      placeholder="nombre del proyecto"
                      onChange={handleInputchange}
                      value={values.title}
                    />
                  </div>
                  <div className="form-group py-2">
                    <input
                      type="text"
                      name="repository"
                      className="form-control"
                      placeholder="url repositorio"
                      onChange={handleInputchange}
                      value={values.repository}
                    />
                  </div>
                  <div className="form-group py-2">
                    <input
                      type="text"
                      name="deploy"
                      className="form-control"
                      placeholder="url despliegue web"
                      onChange={handleInputchange}
                      value={values.deploy}
                    />
                  </div>
                  {currentId ?  <div className="form-group py-2">
                    <input
                      type="file"
                      name="thumb"
                      className="form-control"
                      onChange={handleImageChange}
                      value={values.thumb}
                    />
                    <button className="btn btn-secondary w-100 my-2" onClick={handleUploadImg} >
                        Subir imagen de perfil
                    </button>
                  </div> : null }
                 
                  <button type="submit" className="btn btn-secondary w-100 my-2">
                    {currentId === "" ? "Guardar Nuevo Proyecto" : "Actualizar Proyecto"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-11 col-md-6 mx-auto">
            <h2 className="py-3">Listado:</h2>
            {nodejsProjects.map((project) => {
              return (
                <div className="card my-2" key={project.id}>
                  <div className="card-body">
                    <p className="p-0 m-0">{project.title}</p>
                  </div>
                  <div className="card-footer">
                    <span
                      className="fas fa-edit"
                      style={{ fontSize: 20, padding: 6, marginRight: 10, cursor: "pointer" }}
                      onClick={() => setCurrentId(project.id)}
                    >
                      Editar
                    </span>
                    <span
                      style={{ fontSize: 20, padding: 6, marginRight: 10, cursor: "pointer" }}
                      className="far fa-trash-alt"
                      onClick={() => deleteNodejsProject(project.id)}
                    >
                      Eliminar
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodejsPage;
