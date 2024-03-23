<template>
    <div class="task-container overflow-auto p-3 bg-light shadow rounded" style="max-height: 300px;">
        <div class="header d-flex justify-content-end">
            <button class="btn btn-primary mb-3" style="margin-right: 5px;" @click="emitNewTaskEvent">New Task</button>
            <button class="btn btn-primary mb-3" @click.prevent="createList">Create New List</button>
        </div>
        <div v-for="(task, index) in tasks" :key="task.task_id"
            :class="['task-item', 'row', { 'bg-white': index % 2 === 0, 'bg-secondary bg-opacity-10': index % 2 !== 0 }]">
            <div class="task-details col-12 col-sm-8 d-flex align-items-center">
                <input type="checkbox" :checked="task.status === 'completed'" class="form-check-input me-2"
                    @change="toggleTaskStatus(task)" />
                <span class="flex-grow-1">{{ task.title }}</span>
            </div>
            <div class="task-actions col-12 col-sm-4 mt-2 mt-sm-0">
                <div class="d-grid gap-2 d-sm-flex justify-content-sm-end">
                    <button class="btn btn-primary" @click="editTask(task)">Edit</button>
                    <button class="btn btn-danger" @click="deleteTask(task.task_id)">Delete</button>
                </div>
            </div>
        </div>
        <create-list-popup v-if="showCreateListPopup" :is-visible="showCreateListPopup" @close="cancelCreateList">
        </create-list-popup>
    </div>
</template>

<script>
import CreateListPopup from '@/components/List/CreateListPopup.vue';
export default {
    name: "TaskList",
    props: {
        tasks: {
            type: Array,
            required: true
        }
        
    },
    data() {
        return {
            showCreateListPopup: false
        };
    },
    components: {
        CreateListPopup
    },
    methods: {
        emitNewTaskEvent() {
            this.$emit('new-task-clicked');
        },
        editTask(task) {
            this.$emit('edit-task', task);
        },
        toggleTaskStatus(task) {
            const taskId = task.task_id;
            const status = task.status === 'completed' ? 'pending' : 'completed';

            this.$axios.put(`/tasks/${taskId}/${status}`)
                .then(response => {
                    this.$parent.refreshTask();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        deleteTask(taskid) {
            this.$axios.delete(`/tasks/${taskid}`)
                .then(response => {
                    this.$parent.refreshTask();
                })
                .catch((error) => {
                    setTimeout(() => {
                        this.feedbackMessage = "Failed to delete task";
                        this.isSuccess = false;
                    }, 2000);
                

                });
        },
        createList() {
            this.showCreateListPopup = true;
        },
        cancelCreateList() {
            this.showCreateListPopup = false;
        },
        cancelCreateTask() {
            this.$emit('cancel-create-task');
        }
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
