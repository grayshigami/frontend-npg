<template>
    <div class="form-data">
        <h1>Crear usuario</h1>
        <input type="text" placeholder="Nombre" v-model="nuevoElemento.nombre">
        <input type="text" placeholder="Apellido" v-model="nuevoElemento.apellido">
        <input type="text" placeholder="Nombre de usuario" v-model="nuevoElemento.nombreUsuario">
        <input type="text" placeholder="Correo" v-model="nuevoElemento.correo">
        <input type="password" placeholder="Contraseña" v-model="nuevoElemento.contrasena">
        <select id="selectTipoUsuario" v-model="nuevoElemento.tipoUsuario">
            <option :value="0">Usuario</option>
            <option :value="1">Administrador</option>
        </select>
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
    name: 'crear-usuario',
    data() {
        return {
            nuevoElemento: {
                nombre: '',
                apellido: '',
                nombreUsuario: '',
                correo: '',
                contrasena: '',
                tipoUsuario: 0
            }
        }
    },
    methods: {
        goBack() {
            this.$router.back();
        },
        async agregarElemento() {
            try {
                const response = await fetch('http://localhost:3000/usuarios', {
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
                    nombreUsuario: '',
                    correo: '',
                    contrasena: '',
                    tipoUsuario: 0
                };
                this.$router.back();
            } catch (error) {
                console.error('Error al agregar elemento:', error);
            }
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

input, select, button {
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 16px;
}

select {
    width: 99%;
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