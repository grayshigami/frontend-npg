<template>
    <div class="general">
        <div class="screen-data">
            <img src="../assets/logo-negro-Sinfondo.png" alt="" width="100" height="80">
            <button @click="goToCreate">
                <i class="fa-solid fa-plus"></i>
                Crear usuario
            </button>
            <button @click="showAllUsers">
                <i class="fa-solid fa-eye"></i>
                {{ showAll ? 'Ver activos': 'Ver inactivos' }}
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
                    <th>Estado</th>
                    <th>Opciones</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="usuario in usuarios" :key="usuario.id">
                        <td>{{ usuario.nombre }}</td>
                        <td>{{ usuario.apellido }}</td>
                        <td>{{ usuario.nombreUsuario }}</td>
                        <td>{{ usuario.correo }}</td>
                        <td>{{ usuario.tipoUsuario == 0 ? 'Usuario' : 'Administrador' }}</td>
                        <td>{{ usuario.estado == 1 ? 'Activo' : 'Inactivo' }}</td>
                        <td>
                            <button @click="editUsuario(usuario)" :disabled="usuario.estado === 0">
                                <i class="fa-solid fa-pencil"></i>
                            </button>
                            <button @click="toggleEstado(usuario)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <EditarUsuario v-if="userToEdit" :usuario="userToEdit"
                @usuario-updated="onUsuarioUpdated" />
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import CrearUsuario from './crear-usuario.vue';
import EditarUsuario from './editar-usuario.vue';

export default {
    name: 'lista-usuarios',
    components: CrearUsuario, EditarUsuario,
    data() {
        return {
            usuarios: [],
            showAll: false,
            editingUsuarioId: null,
            userToEdit: null
        }
    },
    mounted() {
        this.getUsuarios();
    },
    methods: {
        async getUsuarios() {
            try {
                let response;
                
                if (this.showAll) {
                    response = await axios.get('http://localhost:3000/usuarios');
                } else {
                    response = await axios.get('http://localhost:3000/usuarios', {
                        params: { estado: 1 }
                    });
                }

                this.usuarios = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        showAllUsers() {
            this.showAll = !this.showAll;
            this.getUsuarios();
        },
        editUsuario(usuario) {
            this.userToEdit = {...usuario};
            this.$router.push('/editar-usuario');
        },
        onUsuarioUpdated() {
            this.editingUsuarioId = null;
            this.getUsuarios();
        },
        async toggleEstado(usuario) {
            const nuevoEstado = usuario.estado === 1 ? 0 : 1;

            try {
                await axios.put(`http://localhost:3000/usuarios/${usuario.id}`, {estado: nuevoEstado});
                this.getUsuarios();
            } catch (error) {
                console.error(error);
            }
        },
        async agregarElemento(nuevoElemento) {
            this.usuarios.push(nuevoElemento);
        },
        async eliminarElemento(id) {
            try {
                await fetch(`http://localhost:3000/usuarios/${id}`, {
                    method: 'DELETE'
                });
                this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
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