import React from "react";

export default function Pagina() {
    return (
        <div className="flex flex-col items-center justify-center p-10">
            <div className="text-center">
                <h1 className="mb-4 text-3xl font-bold text-black">API REST</h1>
                <div className="flex gap-4">
                    <button className="w-28 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg border-2 border-violet-400 shadow-md">
                        Elementos
                    </button>
                    <button className="w-28 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg border-2 border-violet-400 shadow-md">
                        Solo 1 Elemento
                    </button>
                    <button className="w-28 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg border-2 border-violet-400 shadow-md">
                        Agregar Elemento
                    </button>
                    <button className="w-28 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg border-2 border-violet-400 shadow-md">
                        Modificar Elemento
                    </button>
                    <button className="w-28 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg border-2 border-violet-400 shadow-md">
                        Borrar Elemento
                    </button>
                </div>
                <div className="bg-gray-300 my-5 rounded">
                    <p className="text-black font-medium">sda</p>
                </div>
            </div>

            <div className="text-center my-32">
                <h1 className="mb-4 text-3xl font-bold text-black">WEBSOCKET</h1>
                <div className="flex gap-4">
                    <button className="w-28 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg border-2 border-violet-400 shadow-md">
                        COLA1
                    </button>
                </div>
                <div className="bg-gray-300 my-5 rounded">
                    <p className="text-black font-medium">sda</p>
                </div>
            </div>
        </div>
    );
}