import "./datausers.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Datatable = () => {
  const [data, setData] = useState([]);

  // Función para listar los usuarios
  const listarUsuarios = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/listausuarios`;
      const respuesta = await axios.get(url);
      setData(
        respuesta.data.map((usuario) => ({
          id: usuario._id,
          nombre: `${usuario.nombre} ${usuario.apellido}`,
          email: usuario.email,
          estado: usuario.confirmEmail ? "Activo" : "Suspendido",
          propietario: usuario.propietario,
        }))
      );
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  useEffect(() => {
    listarUsuarios();
  }, []);

  // Función para suspender el usuario
  const suspenderUsuario = async (idUsuario) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/administrador/usuario/${idUsuario}`;
      const respuesta = await axios.put(url); // Esperamos la respuesta del backend

      // Solo actualizamos el estado si la respuesta es exitosa
      if (respuesta.status === 200) {
        setData(data.map((usuario) =>
          usuario.id === idUsuario
            ? { ...usuario, estado: "Suspendido" }
            : usuario
        ));
        Swal.fire("Suspendido!", "El usuario ha sido suspendido.", "success");
      } else {
        Swal.fire("Error", "No se pudo suspender al usuario", "error");
      }
    } catch (error) {
      console.error("Error al suspender el usuario:", error);
      Swal.fire("Error", "Hubo un problema al suspender el usuario", "error");
    }
  };

  // Función para confirmar la suspensión antes de proceder
  const confirmarSuspension = (idUsuario) => {
    Swal.fire({
      title: "¿Desea realmente suspender este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, suspender",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        suspenderUsuario(idUsuario);
      }
    });
  };

  // Columnas para la tabla
  const columns = [
    { field: "id", headerName: "ID de Usuario", width: 200 },
    { field: "nombre", headerName: "Nombre", width: 300 },
    { field: "email", headerName: "Correo Electrónico", width: 300 },
    { field: "estado", headerName: "Estado", width: 150 }, // Ahora se muestra 'Activo' o 'Suspendido'
    { field: "propietario", headerName: "Propietario", width: 200 },
  ];

  // Columna de acciones para suspender el usuario
  const actionColumn = [
    {
      field: "action",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">Ver</div>
          </Link>
          <div
            className="deleteButton"
            onClick={() => confirmarSuspension(params.row.id)}
          >
            Suspender
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Usuarios Registrados
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
