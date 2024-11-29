import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import TablaProductosAdmin from '../components/TablaProductosAdmin';

const Listarproductosadmin = () => {
    const { tiendaId } = useParams(); // Obtén el ID de la tienda de los parámetros de la URL

    return (
        <div className="min-h-screen w-full flex justify-between items-start bg-[url('/public/images/Moderador.png')] bg-no-repeat bg-cover bg-center">
            {/* Contenido de la barra lateral */}
            <div className="bg-yellow-200 bg-opacity-90 p-6 rounded-lg shadow-lg w-11/12 max-w-md min-h-screen flex flex-col justify-start space-y-4">
                <h2 className='text-4xl font-black text-center text-gray-800'>QuitoTech</h2>
                <hr className="border-yellow-400" />
                <ul className="mt-5 flex flex-col space-y-4">
                    <li className="text-center">
                        <div className="text-gray-800 bg-yellow-600 px-3 py-2 rounded-md text-xl hover:bg-yellow-700 transition duration-300 ease-in-out">
                            <Link to="/dashboardadmin">Inicio</Link>
                        </div>
                    </li>
                    <li className="text-center">
                        <div className="text-gray-800 bg-yellow-600 px-3 py-2 rounded-md text-xl hover:bg-yellow-700 transition duration-300 ease-in-out">
                            <Link to="/dashboard/buscar">Productos</Link>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Contenedor principal */}
            <div className="flex-grow flex justify-center items-center p-10">
                <div className="bg-yellow-200 bg-opacity-90 p-10 rounded-lg shadow-lg w-11/12 border border-yellow-300">
                    <h1 className='font-black text-5xl text-gray-800 text-center'>TIENDAS REGISTRADAS</h1>
                    <hr className='my-4 border-yellow-400' />
                    <h2 className='text-2xl text-gray-700 mb-4 text-center'>ADMINISTRA LAS TIENDAS Y MANTEN EL ORDEN</h2>
                    <TablaProductosAdmin tiendaId={tiendaId} /> {/* Pasar el ID de tienda */}
                </div>
            </div>

            {/* Botón de salir */}
            <div className="absolute bottom-4 left-4">
                <Link to="/" onClick={() => { localStorage.clear() }}>
                    <img src="/public/images/salida.png" alt="Volver" className="w-16 h-16" />
                </Link>
            </div>
        </div>
    );
}

export default Listarproductosadmin;