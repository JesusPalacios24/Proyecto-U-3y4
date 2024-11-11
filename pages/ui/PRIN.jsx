import React from "react";

export default function Inicio(){
    return(
        <div>
            <div className="bg-gray-400 h-14 p-4">BIIBLIOTECA</div>
            <div>
                <h1 className="p-4">Libros Disponibles</h1>
                <div className="flex">
                    <div className="flex">
                        <img src="./file.svg" alt="icon" />
                        <div className="font-medium">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}