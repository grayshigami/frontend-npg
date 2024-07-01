<template>
    <div class="form-data">
        <h1>Editar incidencia</h1>
        <input type="text" placeholder="Nombre" name="nombre" v-model="nombre">
        <input type="text" placeholder="Apellido" name="apellido" v-model="apellido">
        <input type="time" placeholder="Entrada" name="horaEntrada" v-model="horaEntrada">
        <input type="time" placeholder="Salida" name="horaSalida" v-model="horaSalida">
        <input type="text" placeholder="Comentario" name="comentario" v-model="comentario">
        <button @click="guardarEdicion">
            <i class="fa-solid fa-floppy-disk"></i>
            Guardar
        </button>
        <button @click="goBack()">
            <i class="fa-solid fa-arrow-left"></i>
            Volver
        </button>
    </div>
</template>
<script>
export default {
    name: 'editar-incidencia',
    props: {
        
    },
    data() {
        return {
            nombre: '',
            apellido: '',
            horaEntrada: '',
            horaSalida: '',
            comentario: ''
        }
    },
    methods: {
        goBack() {
            this.$router.back();
        }
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
</style>