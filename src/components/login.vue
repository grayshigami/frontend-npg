<template>
    <div class="form-data">
        <h1>Login</h1>
        <input type="text" placeholder="Usuario">
        <input type="password" placeholder="Contraseña">
        <button @click="goToScreen">
            <i class="fa-solid fa-user"></i>
            Iniciar sesión
        </button>
        <button @click="goToAdmin">
            <i class="fa-solid fa-user"></i>
            Iniciar como administrador
        </button>
    </div>
</template>
<script>
export default {
    name: 'login-component',
    methods: {
        goToScreen() {
            this.$router.push('/pantalla-usuario');
        },
        goToAdmin() {
            this.$router.push('/pantalla-administrador')
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