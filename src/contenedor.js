const fs = require('fs');

class Contenedor{
    constructor(archivo){
        this.archivo = "chatLog";
    }
    //métodos
    async save (message) {
        try{
            const mensajeGuardado = `FechaYHora: ${message.time}, UserName: ${message.username}, Mensaje: ${message.message}\n`;
            await fs.promises.appendFile(`./${this.archivo}.txt`, mensajeGuardado);
        } catch(error) {
            console.log(`Ocurrio el siguiente error al guardar el mensaje: ${error}`)
        }
    }
    async getAll () {
        let listadoMsg = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, 'utf-8'));
        return listadoMsg;
    }
    async deleteAll () {
        await fs.promises.writeFile(`./${this.archivo}.txt`, '{}');
        return "Se ha vaciado el chat"
    }
};

module.exports = Contenedor;