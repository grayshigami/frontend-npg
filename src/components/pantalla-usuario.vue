<template>
    <div class="general">
        <div class="screen-data">
            <div class="usuario-header">
                <img src="../assets/logo-negro-Sinfondo.png" alt="" width="10%" height="10%">
                <h2 class="b-user">Bienvenido {{ name }}</h2>
            </div>
            <input type="date" v-model="selectedDate" @change="filterIncidencias">
            <button @click="goToIncidencia">
                <i class="fa-solid fa-plus"></i>
                Registrar incidencia
            </button>
            <button>
                <i class="fa-solid fa-file-export"></i>
                Exportar
            </button>
        </div>
        <p>{{ this.userId }}</p>
        <RegistrarIncidencia @nuevoElemento="agregarElemento" :userId="userId" />
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
                    <tr v-for="item in filteredIncidencias" :key="item.id">
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.apellido }}</td>
                        <td>{{ formatDate(item.horaEntrada) }}</td>
                        <td>{{ item.horaSalida ? formatDate(item.horaSalida) : null }}</td>
                        <td>{{ item.comentario }}</td>
                        <td>
                            <button @click="editIncidencia(item.id)"><i class="fa-solid fa-pencil"></i></button>
                            <button @click="eliminarElemento(item.id)"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <EditarIncidencia v-if="editingIncidenciaId !== null" :incidenciaId="editingIncidenciaId"
                @incidencia-updated="onIncidenciaUpdated" />
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import RegistrarIncidencia from './registrar-incidencia.vue';
import EditarIncidencia from './editar-incidencia.vue';
import { Date } from 'core-js';

export default {
    name: 'pantalla-usuario',
    components: RegistrarIncidencia, EditarIncidencia,
    data() {
        return {
            items: [],
            name: '',
            userId: '',
            incidencias: [],
            selectedDate: new Date().toISOString().substring(0, 10),
            filteredIncidencias: [],
            editingIncidenciaId: null
        }
    },
    mounted() {
        this.fetchIncidencias();
    },
    created() {
        this.name = localStorage.getItem('name');
        this.userId = localStorage.getItem('user_id');
    },
    methods: {
        async fetchIncidencias() {
            try {
                const response = await fetch('http://localhost:3000/incidencias');

                if (!response.ok) {
                    throw new Error('Error al obtener incidencias');
                }

                this.incidencias = await response.json();
                this.filterIncidencias();
            } catch (error) {
                console.error(error);
            }
        },
        filterIncidencias() {
            this.filteredIncidencias = this.incidencias.filter(incidencia => {
                return incidencia.horaEntrada.substring(0, 10) == this.selectedDate;
            });
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        },
        editIncidencia(id) {
            this.editingIncidenciaId = id;
            this.$router.push('/editar-incidencia');
        },
        onIncidenciaUpdated() {
            this.editingIncidenciaId = null;
            this.fetchIncidencias();
        },
        async agregarElemento(nuevoElemento) {
            this.items.push(nuevoElemento);
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
        async guardarEdicion(nuevoItem) {
            console.log(nuevoItem);
            try {
                await axios.put(`http://localhost:3000/incidencias/${nuevoItem.id}`, nuevoItem);
                const index = this.items.findIndex(item => item.id === nuevoItem.id);

                if (index !== -1) {
                    this.items.splice(index, 1, nuevoItem);
                }

                this.itemEditado = {nombre: '', apellido: '', horaEntrada: '', horaSalida: '', comentario: ''};
            } catch (error) {
                console.error('Error saving edit:', error);
            }
        },
        goToEdit() {
            this.$router.push('/editar-incidencia');
        },
        goToIncidencia() {
            this.$router.push('/registrar-incidencia');
        },
        goToAdmin() {
            this.$router.push('/pantalla-administrador')
        }
    }
}
</script>
<style scoped>
* {
    font-family: sans-serif;
}

.usuario-header {
    display: flex;
    justify-content: center;
}

.b-user {
    margin-left: 20px;
    font-weight: bold;
}

img {
    @media (max-width: 800px) {
        width: 30%;
        height: 30%;
    }
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

img {
    margin-bottom: 10px;
}
</style>