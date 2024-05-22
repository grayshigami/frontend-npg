<template>
    <div class="form-data">
        <h1>Editar incidencia</h1>
        <input type="text" placeholder="Nombre" v-model="nombre">
        <input type="text" placeholder="Apellido">
        <input type="time" placeholder="Entrada">
        <input type="time" placeholder="Salida">
        <input type="text" placeholder="Comentario">
        <button>
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
    props: ['itemEditado'],
    data() {
        return {
            nombre: this.itemEditado ? this.itemEditado.nombre : ''
        }
    },
    watch: {
        itemEditado(newVal) {
            if (newVal) {
                this.nombre = newVal.nombre;
            }
        }
    },
    methods: {
        guardarEdicion() {
            this.$emit('guardar-edicion', {...this.itemEditado, nombre: this.nombre});
        },
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