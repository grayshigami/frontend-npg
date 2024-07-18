<template>
    <div class="form-data">
        <h1>Editar incidencia</h1>
        <input type="text" placeholder="Nombre" name="nombre" v-model="incidencia.nombre">
        <input type="text" placeholder="Apellido" name="apellido" v-model="incidencia.apellido">
        <span>
            <input type="datetime-local" placeholder="Entrada" name="horaEntrada" v-model="incidencia.horaEntrada">
            <button @click="setCurrentTime">Actual</button>
        </span>
        <span>
            <input type="datetime-local" placeholder="Salida" name="horaSalida" v-model="incidencia.horaSalida">
            <button @click="setCurrentTime">Actual</button>
        </span>
        <input type="text" placeholder="Comentario" name="comentario" v-model="comentario">
        <button @click="updateIncidencia">
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
    name: 'editar-incidencia',
    props: ['incidenciaId'],
    data() {
        return {
            incidencia: {
                nombre: '',
                apellido: '',
                horaEntrada: '',
                horaSalida: '',
                comentario: ''
            }
        }
    },
    created() {
        this.fetchIncidencia();
    },
    methods: {
        setCurrentTime() {
            const currentTime = new Date();
            const hours = String(currentTime.getHours()).padStart(2, '0');
            const minutes = String(currentTime.getMinutes()).padStart(2, '0');
            const formattedTime = `${hours}:${minutes}`;
            this.incidencia.horaEntrada = formattedTime;
        },
        async fetchIncidencia() {
            try {
                const response = await fetch(`http://localhost:3000/incidencias/${this.incidenciaId}`);

                if (!response.ok) {
                    throw new Error("Error al obtener incidencia");
                }

                const data = await response.json();
                this.incidencia.nombre = data.nombre;
                this.incidencia.apellido = data.apellido;
                this.incidencia.horaEntrada = data.horaEntrada.slice(0, 5);
                this.incidencia.horaSalida = data.horaSalida ? data.horaSalida.slice(0, 5) : '';
                this.incidencia.comentario = data.comentario;
            } catch (error) {
                console.error(error);
            }

        },
        async updateIncidencia() {
            try {
                const response = await fetch(`http://localhost:3000/incidencias/${this.incidenciaId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.incidencia)
                });

                if (!response.ok) {
                    throw new Error("Error al actualizar incidencia");
                }

                this.$emit('incidencia-updated');
            } catch (error) {
                console.error(error);
            }

            this.$router.back();
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

span {
    width: 113.5%;
    display: flex;
}

span input {
    width: 100%;
}

span button {
    margin-left: 8px;
}
</style>