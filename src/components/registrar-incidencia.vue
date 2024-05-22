<template>
    <div class="form-data">
        <h1>Registrar incidencia</h1>
        <input type="text" placeholder="Nombre" v-model="nuevoElemento.nombre">
        <input type="text" placeholder="Apellido" v-model="nuevoElemento.apellido">
        <span>
            <input type="time" placeholder="Hora de entrada" v-model="nuevoElemento.horaEntrada">
            <button>Copiar</button>
        </span>
        <span>
            <input type="time" placeholder="Hora de salida" v-model="nuevoElemento.horaSalida">
            <button>Copiar</button>
        </span>
        <input type="text" placeholder="Comentario" v-model="nuevoElemento.comentario">
        <button @click="agregarElemento">
            <i class="fa-solid fa-floppy-disk"></i>
            Guardar
        </button>
        <button @click="goBack">
            <i class="fa-solid fa-arrow-left"></i>
            Volver
        </button>
    </div>
</template>
<script>
export default {
    name: 'registrar-incidencia',
    data() {
        return {
            nuevoElemento: {
                nombre: '',
                apellido: '',
                horaEntrada: '',
                horaSalida: '',
                comentario: ''
            }
        }
    },
    methods: {
        goBack() {
            this.$router.back();
        },
        async agregarElemento() {
            try {
                const response = await fetch('http://localhost:3000/incidencias', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.nuevoElemento)
                });

                const nuevoElementoCreado = await response.json();
                this.$emit('nuevo-elemento', nuevoElementoCreado);
                this.nuevoElemento = {
                    nombre: '',
                    apellido: '',
                    horaEntrada: '',
                    horaSalida: '',
                    comentario: ''
                };
            } catch (error) {
                console.error('Error al agregar elemento:', error);
            }
        },

    }
}
</script>
<style>
* {
    font-family: sans-serif;
}

.form-data {
    margin: 100px auto;
    width: 40%;
    display: flex;
    flex-direction: column;
    text-align: center;

    @media (max-width: 800px) {
        width: 80%;
    }
}

input, button {
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 16px;
}

button {
    color: white;
    background-color: rgb(21, 96, 130);
    font-weight: bold;
}

button:hover {
    cursor: pointer;
}

span {
    width: 113.5%;
    display: flex;
}

span input {
    width: 100%;
}

span button {
    margin-left: 8px;
}
</style>