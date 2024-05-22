<template>
    <div class="general">
        <div class="screen-data">
            <input type="date">
            <button @click="goToIncidencia">
                <i class="fa-solid fa-plus"></i>
                Registrar incidencia
            </button>
            <button>
                <i class="fa-solid fa-file-export"></i>
                Exportar
            </button>
            <button @click="goToList">
                <i class="fa-solid fa-list"></i>
                Ver lista de usuarios
            </button>
        </div>
        <div class="table-data">
            <table>
                <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Entrada</th>
                    <th>Salida</th>
                    <th>Comentario</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.id">
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.apellido }}</td>
                        <td>{{ item.horaEntrada }}</td>
                        <td>{{ item.horaSalida }}</td>
                        <td>{{ item.comentario }}</td>
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

export default {
    name: 'pantalla-administrador',
    data() {
        return {
            items: []
        }
    },
    mounted() {
        this.getIncidencias();
    },
    methods: {
        getIncidencias() {
            axios.get('http://localhost:3000/incidencias')
            .then(response => {
                this.items = response.data;
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
        },
        async eliminarElemento(id) {
            try {
                await fetch(`http://localhost:3000/incidencias/${id}`, {
                    method: 'DELETE'
                });
                this.items = this.items.filter(item => item.id !== id);
            } catch (error) {
                console.error('Error deleting element:', error);
            }
        },
        goToIncidencia() {
            this.$router.push('/registrar-incidencia');
        },
        goToList() {
            this.$router.push('/lista-usuarios')
        },
        goToEdit() {
            this.$router.push('/editar-incidencia')
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

input {
    padding: 10px;
    border-radius: 5px;
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