<template>
    <div class="form-data">
        <img src="../assets/logo-negro-Sinfondo.png" width="250" height="120">
        <h1>Login</h1>
        <input type="text" placeholder="Usuario" v-model="nombreUsuario">
        <input type="password" placeholder="Contraseña" v-model="contrasena">
        <button @click="login">
            <i class="fa-solid fa-user"></i>
            Iniciar sesión
        </button>
        <div class="err" v-if="errorMessage">{{ errorMessage }}</div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'login-component',
    data() {
        return {
            nombreUsuario: '',
            contrasena: '',
            errorMessage: ''
        }
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:3000/auth/login', {
                    nombreUsuario: this.nombreUsuario,
                    contrasena: this.contrasena
                });
                const { access_token, user_type, name, user_id } = response.data;
                localStorage.setItem('token', access_token);
                localStorage.setItem('user_type', user_type);
                localStorage.setItem('name', name);
                localStorage.setItem('user_id', user_id);

                if (user_type == 0) {
                    this.$router.push('/pantalla-usuario');
                } else {
                    this.$router.push('/pantalla-administrador');
                }
                console.log('userId:', user_id);
            } catch (error) {
                this.errorMessage = "Usuario o contraseña invalidos";
            }
        }
    }
}
</script>
<style>
* {
    font-family: sans-serif;
}

.err {
    color: red;
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

img {
    align-self: center;
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