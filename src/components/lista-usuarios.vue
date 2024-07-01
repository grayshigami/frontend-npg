<template>
    <div class="general">
        <div class="screen-data">
            <button @click="goToCreate">
                <i class="fa-solid fa-plus"></i>
                Crear usuario
            </button>
        </div>
        <CrearUsuario @nuevoElemento="agregarElemento" />
        <div class="table-data">
            <table>
                <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Nombre de usuario</th>
                    <th>Correo</th>
                    <th>Tipo de usuario</th>
                    <th>Opciones</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.id">
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.apellido }}</td>
                        <td>{{ item.nombreUsuario }}</td>
                        <td>{{ item.correo }}</td>
                        <td>{{ item.tipoUsuario == 0 ? 'Normal' : 'Administrador' }}</td>
                        <td>
                            <button @click="goToEdit"><i class="fa-solid fa-pencil"></i></button>
                            <button @click="eliminarElemento(item.id)"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import CrearUsuario from './crear-usuario.vue';

export default {
    name: 'lista-usuarios',
    components: CrearUsuario,
    data() {
        return {
            items: []
        }
    },
    mounted() {
        this.getUsuarios();
    },
    methods: {
        getUsuarios() {
            axios.get('http://localhost:3000/usuarios')
            .then(response => {
                this.items = response.data;
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
        },
        async agregarElemento(nuevoElemento) {
            this.items.push(nuevoElemento);
        },
        async eliminarElemento(id) {
            try {
                await fetch(`http://localhost:3000/usuarios/${id}`, {
                    method: 'DELETE'
                });
                this.items = this.items.filter(item => item.id !== id);
            } catch (error) {
                console.error('Error deleting element:', error);
            }
        },
        goToCreate() {
            this.$router.push('/crear-usuario')
        },
        goToEdit() {
            this.$router.push('/editar-usuario')
        }
    }
}
</script>
<style>
* {
    font-family: sans-serif;
}

.general {
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    text-align: center;
}

button {
    color: white;
    background-color: rgb(21, 96, 130);
    font-weight: bold;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 16px;
}

input, button {
    margin-right: 10px;
}

button:hover {
    cursor: pointer;
}

table {
    margin: 30px auto;
    text-align: left;
    font-size: 16px;
    background-color: rgb(249, 249, 249);
    border-radius: 8px;
}

th, td {
    padding: 8px;
}

td {
    border-top: 1px solid black;
}
</style>