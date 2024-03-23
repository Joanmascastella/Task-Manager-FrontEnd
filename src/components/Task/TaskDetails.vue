<template>
    <div class="popup-container" v-if="isVisible">
        <div class="popup">
            <div class="task-container">
                <h1 class="mb-4">{{ task.title }}</h1>
                <p><strong>Description:</strong> {{ task.description }}</p>
                <p><strong>Deadline:</strong> {{ task.deadline }}</p>
                <p><strong>Status:</strong> {{ task.status }}</p>
                <p><strong>Time Elapsed:</strong> {{ convertSecondsToMinutes(task.time_elapsed) }} minutes</p>
                <button class="btn btn-secondary" @click="cancel">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TaskDetails",
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        task: {
            type: Object,
            required: true
        }
    },
    methods: {
        hide() {
            this.$emit('close');
        },
        cancel() {
            this.hide();
        },
        convertSecondsToMinutes(seconds) {
            return Math.floor(seconds / 60); 
        }
    }
}
</script>

<style scoped>
.popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
}

.popup {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 20px;
}
</style>
