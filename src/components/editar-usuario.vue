<template>
    <div class="form-data">
        <h1>Editar usuario</h1>
        <input type="text" placeholder="Nombre">
        <input type="text" placeholder="Apellido">
        <input type="text" placeholder="Nombre de usuario">
        <input type="text" placeholder="Correo">
        <input type="password" placeholder="Contraseña">
        <button @click="goBack()">
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
    name: 'editar-usuario',
    methods: {
        goBack() {
            this.$router.push('/lista-usuarios')
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