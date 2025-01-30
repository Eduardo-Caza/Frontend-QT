import React from "react";
import "./sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import PsychologyIcon from '@mui/icons-material/Psychology';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";


const Sidebar = () => {
    const { dispatch } = useContext(DarkModeContext);
    const navigate = useNavigate(); // Hook para redirigir

    // Función para manejar el logout
    const handleLogout = () => {
        // Eliminar los datos del localStorage
        localStorage.removeItem("id_usuario");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        // Redirigir al usuario a la página de login
        navigate("/");
    };

    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/home" style={{ textDecoration: "none" }}>
                    <span className="logo">QuitoTech</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MENU</p>
                    <Link to="/home" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className="title">LISTAS</p>
                    <Link to="/moderadores" style={{ textDecoration: "none" }}>
                        <li>
                            <AdminPanelSettingsIcon className="icon" />
                            <span>Moderadores</span>
                        </li>
                    </Link>
                    <Link to="/tiendas" style={{ textDecoration: "none" }}>
                        <li>
                            <StorefrontIcon className="icon" />
                            <span>Tiendas</span>
                        </li>
                    </Link>
                    <Link to="/users" style={{ textDecoration: "none" }}>
                        <li>
                            <GroupIcon className="icon" />
                            <span>Usuarios</span>
                        </li>
                    </Link>
                    <p className="title">USUARIO</p>
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                        <li>
                            <AccountCircleIcon className="icon" />
                            <span>Perfil</span>
                        </li>
                    </Link>
                    <li onClick={handleLogout}>
                        <LogoutIcon className="icon" />
                        <span>Salir</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
