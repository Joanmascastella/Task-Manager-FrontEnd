<template>
    <div class="edit-task-container">
        <form @submit.prevent="submitTaskEdits" class="edit-task-form">
            <h1>Edit Task</h1>

            <div class="form-group">
                <label for="editTaskTitle">Title:</label>
                <input type="text" id="editTaskTitle" v-model="task.title" required>
            </div>

            <div class="form-group">
                <label for="editTaskDescription">Description:</label>
                <textarea id="editTaskDescription" v-model="task.description"></textarea>
            </div>

            <div class="form-group">
                <label for="editTaskDeadline">Deadline:</label>
                <input type="date" id="editTaskDeadline" v-model="task.deadline" :min="minDate">
            </div>
            <div class="form-group" v-if="availableList.length > 0">
                <label for="selectTaskList">List:</label>
                <select id="selectTaskList" v-model="task.list_id">
                    <option v-for="list in availableList" :key="list.id" :value="list.id">{{ list.name }}</option>
                </select>
            </div>
            <div v-if="availableList.length === 0" class="form-group">
                <p>There are no available lists. Create one:</p>
                <button class="btn btn-primary btn-sm" @click.prevent="createList">Create List</button>
            </div>
            <div v-if="feedbackMessage" :class="['feedback', { 'success': isSuccess, 'error': !isSuccess }]">
                {{ feedbackMessage }}
            </div>

            <button class="btn btn-success" type="submit" style="margin: 8px;">Update Task</button>
            <button class="btn btn-danger" @click="cancelEdit">Cancel</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "EditTaskPanel",
    props: {
        taskData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            task: { ...this.taskData, deadline: this.formatDate(this.taskData.deadline) },
            availableList: [],
            minDate: new Date().toISOString().split('T')[0],
            feedbackMessage: '',
            isSuccess: false,
        };
    },
    methods: {
        submitTaskEdits() {
            let updateData = {
                title: this.task.title,
                description: this.task.description,
                deadline: this.task.deadline,
                status: this.task.status,

            };

            if (this.task.list_id != null) {
                updateData.list_id = this.task.list_id;
            }

            this.$axios.put('/tasks/' + this.task.task_id, updateData)
                .then(response => {
                    this.$emit('task-updated-successfully', this.task);
                    this.$emit('close-edit-form');
                })
                .catch(error => {
                    this.feedbackMessage = "Something went wrong when editing the task.";
                    this.isSuccess = false;
                });
        },
        cancelEdit() {
            this.$emit('cancel-edit-task');
        },
        formatDate(dateStr) {
            const date = new Date(dateStr);
            return date.toISOString().split('T')[0];
        },
        getAvaliableLists() {
            this.$axios.get('/lists')
                .then(response => {
                    this.availableList = response.data;
                })
                .catch(error => {
                    this.feedbackMessage = "Something went wrong when getting lists.";
                    this.isSuccess = false;
                });
        },
    },
    mounted() {
        this.getAvaliableLists();
    },
};
</script>


<style scoped>
.edit-task-container {
    border: #000000;
    background: #f7f7f7;
    border-radius: 10px;
    padding: 30px;
    margin: 20px auto;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9);
}

.create-task-form h1 {
    color: #000000;
    margin-bottom: 30px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #555;
}

.btn-sm {
    padding: 8px 15px;
    font-size: 0.875rem;
}

input[type="text"],
textarea,
input[type="date"] {
    width: 100%;
    border: none;
    border-bottom: 2px solid #000000;
    border-radius: 0;
    padding: 15px 8px;
    background: #ffffff;
    box-sizing: border-box;
    font-size: 1rem;
}

textarea {
    min-height: 120px;
}

button {
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 15px 25px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #449d44;
}

input[type="text"]:focus,
textarea:focus,
input[type="date"]:focus {
    outline: none;
    border-bottom: 2px solid #007bff;
}

.form-group label {
    padding-left: 8px;
}
</style>
