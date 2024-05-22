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
        </div>
        <RegistrarIncidencia @nuevoElemento="agregarElemento" />
        <EditarIncidencia :itemEditado="itemEditado" @guardar-edicion="guardarEdicion" />
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
                            <button @click="editarItem(item)"><i class="fa-solid fa-pencil"></i></button>
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
import RegistrarIncidencia from './registrar-incidencia.vue';
import EditarIncidencia from './editar-incidencia.vue';

export default {
    name: 'pantalla-usuario',
    components: RegistrarIncidencia, EditarIncidencia,
    data() {
        return {
            items: [],
            itemEditado: null
        }
    },
    mounted() {
        this.getIncidencias();
    },
    methods: {
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
        editarItem(item) {
            this.itemEditado = {...item};
            this.$router.push('/editar-incidencia');
        },
        async guardarEdicion(nuevoItem) {
            try {
                await axios.put(`http://localhost:3000/incidencias/${nuevoItem}`, nuevoItem);
                const index = this.items.findIndex(item => item.id === nuevoItem.id);

                if (index !== -1) {
                    this.items.splice(index, 1, nuevoItem);
                }

                this.itemEditado = null;
            } catch (error) {
                console.error('Error saving edit:', error);
            }
        },
        getIncidencias() {
            axios.get('http://localhost:3000/incidencias')
            .then(response => {
                this.items = response.data;
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
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