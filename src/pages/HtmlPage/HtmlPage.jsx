import { useState } from "react";
import firebase from "../../config/firebase";

const HtmlPage = () => {
  const [image, setImage] = useState({});

  const onImageChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    let file = e.target.files[0]; // get the supplied file
    // if there is a file, set image to that file
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          console.log(file);
          setImage(file);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    // if there is no file, set image back to null
    } else {
      setImage(null);
    }
  };


  const uploadToFirebase = () => {
    //1.
    if (image) {
      //2.
      const storageRef = firebase.storage().ref('images');
      //3.
      const imageRef = storageRef.child(image.name);
      //4.
      imageRef.put(image)
     //5.
     .then(() => {
        alert("Image uploaded successfully to Firebase.");
    });
    } else {
      alert("Please upload an image first.");
    }
  };

  return (
    <div className="html d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <div className="container-xl">
        <div className="row">
          <div className="col-10 col-md-6 mx-auto">
            <form className="card">
              <h1>Crear proyecto Html</h1>
              <fieldset className="mb-3 my-2">
                <input
                  className="form-control my-2"
                  type="file"
                  onChange={(e) => {onImageChange(e); }}
                  accept="image/png, image/gif, image/jpeg"
                />
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" onClick={uploadToFirebase}>
                    Subir imágenes
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtmlPage;
