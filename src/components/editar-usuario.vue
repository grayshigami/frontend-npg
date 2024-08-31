<template>
    <div class="general">
        <div class="toolbar">
            <img src="../assets/logo-negro-Sinfondo.png" alt="" width="10%" height="10%">
            <h2 class="b-user">Bienvenido {{ name }}</h2>
            <div class="spacer"></div>
            <button @click="logout">
                <i class="fa-solid fa-power-off"></i>
                Cerrar sesión
            </button>
        </div>
        <div class="form-data">
            <h1>Editar usuario</h1>
            <input type="text" placeholder="Nombre" v-model="usuarioLocal.nombre">
            <input type="text" placeholder="Apellido" v-model="usuarioLocal.apellido">
            <input type="text" placeholder="Nombre de usuario" v-model="usuarioLocal.nombreUsuario">
            <input type="text" placeholder="Correo" v-model="usuarioLocal.correo">
            <select id="selectTipoUsuario" v-model="usuarioLocal.tipoUsuario">
                <option :value="0">Usuario</option>
                <option :value="1">Administrador</option>
            </select>
            <input type="password" placeholder="Contraseña" v-model="usuarioLocal.contrasena">
            <button @click="updateUsuario">
                <i class="fa-solid fa-floppy-disk"></i>
                Guardar
            </button>
            <button @click="goBack">
                <i class="fa-solid fa-arrow-left"></i>
                Volver
            </button>
            <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>
    </div>
</template>
<script>
import { ip_address } from '@/ipconst/ip-laptop';
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default {
    name: 'editar-usuario',
    data() {
        return {
            name: '',
            actualizacionId: null,
            usuarioLocal: {},
            errorMessage: '',
            contActual: ''
        }
    },
    created() {
        this.name = localStorage.getItem('name');
        this.actualizacionId = localStorage.getItem('user_id');
    },
    async mounted() {
        console.log(this.$route.query.usuario);
        const response = await axios.get(`http://${ip_address}:3002/usuarios/${this.$route.query.usuario}`);
        this.usuarioLocal = response.data;
    },
    methods: {
        async updateUsuario() {
            try {
                if (!this.usuarioLocal.nombre) {
                    this.errorMessage = "El nombre no debe quedar vacío";
                }
                if (!this.usuarioLocal.nombreUsuario) {
                    this.errorMessage = "El nombre de usuario no debe quedar vacío";
                }

                this.usuarioLocal.actualizacionId = this.actualizacionId;
                const hashedCont = await bcrypt.hash(this.usuarioLocal.contrasena, 10);

                this.usuarioLocal.contrasena = hashedCont;

                let request = {...this.usuarioLocal};
                delete request.id;
                await axios.put(`http://${ip_address}:3002/usuarios/${this.usuarioLocal.id}`, request);
                this.$router.back();
            } catch (error) {
                this.errorMessage = error.response.data.message;
            }
        },
        goToContrasena() {
            this.$router.push('/cambiar-contrasena');
        },
        logout() {
            localStorage.removeItem('token');
            window.location.href = '/login-component';
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
    margin: 0;
    padding: 0;
    overflow-x: hidden;

    @media (max-width: 600px) {
        font-size: 12px;
    }
}

p {
    color: red;
}

.toolbar {
    width: 100%;
    background-color: rgb(21, 96, 130);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    padding: 10px;
    color: white;
    box-sizing: border-box;

    @media (max-width: 600px) {
        font-size: 10px;
        padding: 3px;
    }
}

.toolbar button {
    border: none;
}

.spacer {
    width: 50%;

    @media (max-width: 600px) {
        width: 0;
    }
}

.b-user {
    margin-left: 20px;
    margin-right: 180px;
    font-weight: bold;
}

h1 {
    margin-bottom: 10px;
}

.form-data {
    margin: 20px auto;
    width: 40%;
    display: flex;
    flex-direction: column;
    text-align: center;

    @media (max-width: 800px) {
        width: 80%;
    }
}

input, button, select {
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 16px;

    @media (max-width: 600px) {
        font-size: 12px;
    }
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