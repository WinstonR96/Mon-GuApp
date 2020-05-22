import Swal from "sweetalert2";

const Util = {
  getProp: (obj, key) =>
    key
      .split(".")
      .reduce(
        (o, x) => (typeof o == "undefined" || o === null ? o : o[x]),
        obj
      ),

  AlertaDatosIncorrectos: () => {
    Swal.fire({
      title: "Información incorrecta",
      text: "Digite datos válidos",
      icon: "error",
      confirmButtonText: "Ok",
    });
  },

  GuardarSesion: (data) => {
    localStorage.setItem("Data", JSON.stringify(data));
  },

  CerrarSesion: () => {
    localStorage.removeItem("Data");
  },

  ComprobarSesionActiva: () => {
    let data = JSON.parse(localStorage.getItem("Data"));
    if (data) {
      return true;
    } else {
      return false;
    }
  },
};

export default Util;
