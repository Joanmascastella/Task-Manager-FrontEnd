<template>
    <div class="task-container overflow-auto p-3 bg-light shadow rounded">
        <div class="header d-flex justify-content-end">
            <button class="btn btn-primary mb-3" @click="emitNewTaskEvent">New Task</button>
        </div>
        <div v-if="feedbackMessage" :class="['feedback', { 'success': isSuccess, 'error': !isSuccess }]">
            {{ feedbackMessage }}
        </div>
        <div v-for="(task, index) in tasks" :key="task.task_id"
            :class="['task-item', 'd-flex', 'align-items-center', 'mb-3', 'p-2', { 'bg-white': index % 2 === 0, 'bg-secondary bg-opacity-10': index % 2 !== 0 }]">
            <div class="task-details flex-grow-1 d-flex align-items-center">
                <input type="checkbox" :checked="task.status === 'completed'" class="form-check-input me-2"
                    @change="toggleTaskStatus(task)" />
                <span class="flex-grow-1">{{ task.title }}</span>
            </div>
            <div class="task-actions">
                <button class="btn btn-primary" @click="editTask(task.task_id)">Edit</button>
                <button class="btn btn-success" @click="shareTask(task.task_id)">Share</button>
                <button class="btn btn-danger" @click="deleteTask(task.task_id)">Delete</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "TaskList",
    props: {
        tasks: {
            type: Array,
            required: true
        }
    },
    methods: {
        emitNewTaskEvent() {
            this.$emit('new-task-clicked');
        },
        toggleTaskStatus(task) {
            const taskId = task.task_id;
            const status = task.status === 'completed' ? 'pending' : 'completed';

            this.$axios.put(`/tasks/${taskId}/${status}`)
                .then(response => {
                    this.$parent.refreshTask();
                })
                .catch((error) => {
                    setTimeout(() => {
                        this.feedbackMessage = "Failed to change status.";
                        this.isSuccess = false;
                    }, 2000);
                
                    console.error(error);
                });
        },
        editTask(task) {
            // Here you can handle the logic to edit a task
        },
        shareTask(task) {
            // Here you can handle the logic to share a task
        },
        deleteTask(taskid) {
            this.$axios.delete(`/tasks/${taskid}`)
                .then(response => {
                    this.$parent.refreshTask();
                    setTimeout(() => {
                        this.feedbackMessage = "Task deleted.";
                        this.isSuccess = true;
                    }, 2000);
                })
                .catch((error) => {
                    setTimeout(() => {
                        this.feedbackMessage = "Failed to delete task";
                        this.isSuccess = false;
                    }, 2000);
                

                });
        },
    }
};
</script>

<style scoped>
.task-container {
    border: 1px solid #000;
    background: #f7f7f7;
    border-radius: 10px;
    padding: 30px;
    margin: 20px auto;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9);
}

.task-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
}

.alternate-row {
    background-color: #e9ecef;
}

.task-details {
    flex-grow: 1;
    display: flex;
    align-items: center;
}

.task-details input[type="checkbox"] {
    margin-right: 10px;
}

.task-actions button {
    margin-left: 10px;
}

@media (max-width: 576px) {
    .task-details input[type="checkbox"] {
        margin-right: 5px;
    }

    .task-actions button {
        margin-left: 5px;
    }
}
</style>
