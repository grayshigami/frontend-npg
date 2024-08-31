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
            <h1>Registrar incidencia</h1>
            <input type="text" placeholder="Nombre" v-model="nuevoElemento.nombre" @input="buscarNombres"
            list="nombres-sugeridos">
            <datalist id="nombres-sugeridos">
                <option v-for="nombre in nombresSugeridos" :key="nombre" :value="nombre">{{ nombre }}</option>
            </datalist>
            <input type="text" placeholder="Empresa" v-model="nuevoElemento.empresa" @input="buscarEmpresas"
            list="empresas-sugeridas">
            <datalist id="empresas-sugeridas">
                <option v-for="empresa in empresasSugeridas" :key="empresa" :value="empresa">{{ empresa }}</option>
            </datalist>
            <input type="datetime-local" placeholder="Hora de entrada" v-model="nuevoElemento.horaEntrada">
            <input type="datetime-local" placeholder="Hora de entrada" v-model="nuevoElemento.horaSalida">
            <input type="text" placeholder="Comentario" v-model="nuevoElemento.comentario">
            <button @click="agregarElemento">
                <i class="fa-solid fa-floppy-disk"></i>
                Guardar
            </button>
            <button @click="goBack">
                <i class="fa-solid fa-arrow-left"></i>
                Volver
            </button>
            <p class="err" v-if="errorMessage">{{ errorMessage }}</p>
        </div>
    </div>
</template>
<script>
import { ip_address } from '@/ipconst/ip-laptop';
import axios from 'axios';

export default {
    name: 'registrar-incidencia',
    data() {
        return {
            name: '',
            nuevoElemento: {
                nombre: '',
                empresa: '',
                horaEntrada: '',
                comentario: '',
                usuarioId: null
            },
            errorMessage: '',
            nombresSugeridos: [],
            empresasSugeridas: []
        }
    },
    created() {
        this.nuevoElemento.usuarioId = localStorage.getItem('user_id');
        this.name = localStorage.getItem('name');
    },
    methods: {
        async buscarNombres() {
            if (this.nuevoElemento.nombre.length > 0) {
                const response = await axios.get(`http://${ip_address}:3002/incidencias/search/nombre?nombre=${this.nuevoElemento.nombre}`);
                this.nombresSugeridos = response.data.map(incidencia => incidencia.nombre);
                console.log(this.nombresSugeridos);
            } else {
                this.nombresSugeridos = [];
            }
        },
        async buscarEmpresas() {
            if (this.nuevoElemento.empresa.length > 0) {
                const response = await axios.get(`http://${ip_address}:3002/incidencias/search/empresa?empresa=${this.nuevoElemento.empresa}`);
                this.empresasSugeridas = response.data.map(incidencia => incidencia.empresa);
            } else {
                this.empresasSugeridas = [];
            }
        },
        setCurrentTime() {
            const currentTime = new Date();
            const hours = String(currentTime.getHours()).padStart(2, '0');
            const minutes = String(currentTime.getMinutes()).padStart(2, '0');
            const formattedTime = `${hours}:${minutes}`;
            this.nuevoElemento.horaEntrada = formattedTime;
        },
        async agregarElemento() {
            try {
                if (!this.nuevoElemento.nombre) {
                    this.errorMessage = "Debes ingresar el nombre";
                }
                if (!this.nuevoElemento.horaEntrada) {
                    this.errorMessage = "Debes ingresar la hora de entrada";
                }

                const fechaIncidencia = new Date(this.nuevoElemento.horaEntrada);
                const fechaActual = new Date();
                const fechaLimite = new Date(fechaActual);
                fechaLimite.setDate(fechaActual.getDate() - 2);

                if (fechaIncidencia < fechaLimite) {
                    this.errorMessage = "No puedes registrar una incidencia anterior a dos días";
                    return;
                }

                const response = await fetch(`http://${ip_address}:3002/incidencias`, {
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
                    empresa: '',
                    horaEntrada: '',
                    comentario: ''
                };
                this.$router.back();
            } catch (error) {
                console.error('Error al agregar elemento:', error);
            }
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

.err {
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

h1 {
    margin-bottom: 10px;
}

input, button {
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

    @media (max-width: 600px) {
        font-size: 12px;
    }
}

button:hover {
    cursor: pointer;
}
</style>