<template>
    <div class="form-data">
        <h1>Editar usuario</h1>
        <input type="text" placeholder="Nombre" v-model="usuarioLocal.nombre">
        <input type="text" placeholder="Apellido" v-model="usuarioLocal.apellido">
        <input type="text" placeholder="Nombre de usuario" v-model="usuarioLocal.nombreUsuario">
        <input type="text" placeholder="Correo" v-model="usuarioLocal.correo">
        <input type="password" placeholder="Contraseña" v-model="usuarioLocal.contrasena">
        <select id="selectTipoUsuario" v-model="usuarioLocal.tipoUsuario">
            <option :value="0">Usuario</option>
            <option :value="1">Administrador</option>
        </select>
        <button @click="updateUsuario">
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
import axios from 'axios';

export default {
    name: 'editar-usuario',
    props: {
        usuario: Object
    },
    data() {
        return {
            usuarioLocal: {...this.usuario}
        }
    },
    methods: {
        async updateUsuario() {
            try {
                await axios.put(`http://localhost:3000/usuarios/${this.usuarioLocal.id}`, this.usuarioLocal);
                this.$emit('close');
                this.$emit('updated');
            } catch (error) {
                console.error(error);
            }

            this.$router.back();
        },
        goBack() {
            this.$router.back();
        }
    },
    watch: {
        usuario: {
            handler(newValue) {
                this.usuarioLocal = {...newValue};
            },
            deep: true
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