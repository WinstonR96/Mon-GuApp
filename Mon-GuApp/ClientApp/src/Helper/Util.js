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

  AlertaUsuarioRegistrado: () => {
    Swal.fire({
      icon: "success",
      text: "Datos registrados correctamente",
      confirmButtonText: "Ok",
      confirmButtonColor: "#0C7DED",
    });
  },

  AlertaDatosIncompletos: () => {
    Swal.fire({
      title: "Información incompleta",
      text: "Digite Campo vacio",
      icon: "error",
      confirmButtonText: "Ok",
    });
  },

  AlertaPanelDesarrollo: () => {
    Swal.fire({
      title: "Panel en desarrollo",
      text: "Este panel se encuentra en etapa de desarrollo",
      icon: "info",
      confirmButtonText: "Ok",
    });
  },

  GuardarSesion: (data) => {
    localStorage.setItem("Data", JSON.stringify(data));
  },

  ObtenerToken: () => {
    let data = JSON.parse(localStorage.getItem("Data"));
    return data.token;
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
