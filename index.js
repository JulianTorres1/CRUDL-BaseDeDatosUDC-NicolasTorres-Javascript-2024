import { connectToDatabase, showTable, insertRecord , showOne } from './DB/DBController.js';
import { prompt } from 'readline-sync';

//--------------------------------------------

var isRuning = true;

(async () => {
    const client = await connectToDatabase();
})();

(async () => {
    // await showTable('vehiculos');
    await showOne('vehiculos', 1);
})();

while (isRuning) {
    console.log('Running...');
    
    // console menu
    console.log('1. Mostrar tabla');
    console.log('2. Mostrar registro específico');
    console.log('3. Insertar registro');
    console.log('4. Actualizar registro');
    console.log('5. Eliminar registro');
    console.log('6. filtrar registros');
    console.log('7. Salir');

    // get user input
    console.log('Introduzca una opción: ');
    const option = prompt();

    // switch case
    switch (option) {
        case '1':
            await showTable('vehiculos');
            break;
        case '2':
            console.log('Introduzca el número de bastidor: ');
            const num_bastidor = prompt();
            console.log('Showing record... ', num_bastidor);
            await showOne('vehiculos', num_bastidor);
            break;
        case '3':
            console.log('Vamos a introducir un nuevo registro en la tabla Vehiculos.');
    
            const record = {};
    
            console.log('Introduzca el número de bastidor: ');
            record.num_bastidor = prompt();
    
            console.log('Introduzca el nombre del modelo: ');
            record.nombre_modelo = prompt();
    
            console.log('Introduzca el precio: ');
            record.precio = parseFloat(prompt());
    
            console.log('Introduzca el descuento: ');
            record.descuento = parseFloat(prompt());
    
            console.log('Introduzca la potencia fiscal: ');
            record.potencia_fiscal = parseInt(prompt(), 10);
    
            console.log('Introduzca la cilindrada: ');
            record.cilindrada = parseInt(prompt(), 10);
    
            console.log('¿Está en stock? (true/false): ');
            record.en_stock = prompt().toLowerCase() === 'true';
    
            console.log('Introduzca el ID del concesionario: ');
            record.id_concesionario = parseInt(prompt(), 10);
    
            console.log('Introduzca el ID del servicio: ');
            record.id_servicio = parseInt(prompt(), 10);
    
            console.log('Introduzca la fecha de agregado (deje en blanco para usar la fecha actual): ');
            const fecha_agregado = prompt();
            if (fecha_agregado) {
                record.fecha_agregado = fecha_agregado;
            }
    
            console.log('Inserting record... ', record);
            await insertRecord('vehiculos', record);
            break;
        default:
            console.log('Invalid option');
    }
    

}