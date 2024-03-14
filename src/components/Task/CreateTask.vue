<template>
    <div class="create-task-container">
        <form @submit.prevent="createNewTask" class="create-task-form">
            <h1>Create New Task</h1>
            <div class="form-group">
                <label for="inputTaskTitle">Title:</label>
                <input type="text" id="inputTaskTitle" v-model="task.title" required>
            </div>
            <div class="form-group">
                <label for="inputTaskDescription">Description:</label>
                <textarea id="inputTaskDescription" v-model="task.description"></textarea>
            </div>
            <div class="form-group">
                <label for="inputTaskDeadline">Deadline:</label>
                <input type="date" id="inputTaskDeadline" v-model="task.deadline" :min="minDate">
            </div>
            <div v-if="feedbackMessage" :class="['feedback', { 'success': isSuccess, 'error': !isSuccess }]">
                {{ feedbackMessage }}
            </div>
            <button class="btn btn-success" type="submit" style="margin: 8px;">Create Task</button>
            <button class="btn btn-danger" @click="cancelCreateTask">Cancel</button> 
        </form>
    </div>
</template>

<script>
export default {
    name: "CreateTask",
    props: {
        userId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            task: {
                title: "",
                description: "",
                deadline: "",
            },
            minDate: new Date().toISOString().split('T')[0],
            feedbackMessage: '',
            isSuccess: false,
        };
    },
    methods: {
        createNewTask() {
            const taskData = {
                user_id: this.userId,
                title: this.task.title,
                description: this.task.description,
                deadline: this.task.deadline
            };
            this.$axios.post('/tasks', taskData)
                .then(response => {
                    this.feedbackMessage = "Task successfully created.";
                    this.isSuccess = true;
                    this.$emit('task-created', response.data.id); 
                    this.resetForm();
                })
                .catch(error => {
                    this.feedbackMessage = "Something went wrong when creating the new task.";
                    this.isSuccess = false;
                });
        },
        resetForm() {
            this.task.title = "";
            this.task.description = "";
            this.task.deadline = "";
            this.feedbackMessage = '';
            this.isSuccess = false;
        },
        cancelCreateTask() {
            this.$emit('cancel-create-task'); 
        }
    }
};
</script>

<style scoped>
.create-task-container {
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
