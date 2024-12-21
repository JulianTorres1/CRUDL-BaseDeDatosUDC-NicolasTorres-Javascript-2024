import { connectToDatabase, showTable, insertRecord, showOne, updateRecord, deleteRecord, showTableOrderedByPriceDESC, showTableOrderedByPriceASC} from './DB/DBController.js';
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
    console.log('6. filtrar por precio ( Descendente )');
    console.log('7. filtrar por precio ( Acendente )');
    console.log('8. Salir');

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
            console.log('Vamos a introducir un nuevo registro en la tabla Vehiculos. ');
            console.log('NOTA: Si al ingresar un valor no sucede nada, ingrese el valor nuevamente sin presionar Enter.');

            const record = {};

            console.log('Introduzca el número de bastidor: ');
            record.num_bastidor = prompt();

            console.log('Introduzca el nombre del modelo: ');
            record.nombre_modelo = prompt();

            console.log('Introduzca el precio: ');
            record.precio = parseFloat(prompt());
            console.log(`Precio ingresado: ${record.precio}`);

            console.log('Introduzca el descuento: ');
            record.descuento = parseFloat(prompt());
            console.log(`Descuento ingresado: ${record.descuento}`);

            console.log('Introduzca la potencia fiscal: ');
            record.potencia_fiscal = parseInt(prompt(), 10);
            console.log(`Potencia fiscal ingresada: ${record.potencia_fiscal}`);

            console.log('Introduzca la cilindrada: ');
            record.cilindrada = parseInt(prompt(), 10);
            console.log(`Cilindrada ingresada: ${record.cilindrada}`);

            console.log('¿Está en stock? (true/false): ');
            record.en_stock = prompt().toLowerCase() === 'true';
            console.log(`En stock ingresado: ${record.en_stock}`);

            console.log('Introduzca el id del concesionario: ');
            record.id_concesionario = parseInt(prompt(), 10);
            console.log(`ID concesionario ingresado: ${record.id_concesionario}`);

            console.log('Introduzca el id del servicio: ');
            const idServicioInput = prompt();
            record.id_servicio = parseInt(idServicioInput, 10);
            console.log(`ID servicio ingresado: ${record.id_servicio}`);

            if (isNaN(record.precio) || isNaN(record.descuento) || isNaN(record.potencia_fiscal) || isNaN(record.cilindrada) || isNaN(record.id_concesionario) || isNaN(record.id_servicio)) {
                console.error('Todos los campos numéricos deben contener valores válidos.');
            } else {
                await insertRecord('vehiculos', record);
            }
            break;
        case '4':
            console.log('Introduzca el número de bastidor del registro a actualizar: ');
            const num_bastidorUpdate = prompt();
            const updateRecordData = {};

            console.log('Introduzca el campo a actualizar: ');
            const field = prompt();
            console.log('Introduzca el nuevo valor: ');
            const value = prompt();

            // Convertir el valor al tipo adecuado
            if (field === 'precio' || field === 'descuento') {
                updateRecordData[field] = parseFloat(value);
            } else if (field === 'potencia_fiscal' || field === 'cilindrada' || field === 'id_concesionario' || field === 'id_servicio') {
                updateRecordData[field] = parseInt(value, 10);
            } else if (field === 'en_stock') {
                updateRecordData[field] = value.toLowerCase() === 'true';
            } else {
                updateRecordData[field] = value;
            }

            await updateRecord('vehiculos', num_bastidorUpdate, updateRecordData);
            break;
        case '5':
            console.log('Introduzca el número de bastidor del registro a eliminar: ');
            const num_bastidorDelete = prompt();
            await deleteRecord('vehiculos', num_bastidorDelete);
            break;
        case '6':
            await showTableOrderedByPriceDESC('vehiculos');
            break;
        case '7':
            await showTableOrderedByPriceASC('vehiculos');
            break;
        case '8':
            console.log('Saliendo...');
            isRuning = false;
            break;
        default:
            console.log('Opción no válida');
            break;
    }
}