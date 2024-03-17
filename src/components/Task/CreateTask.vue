<template>
    <div class="create-task-container">
        <form @submit.prevent="createNewTask" class="create-task-form">
            <h1>Create New Task</h1>

            <div class="form-group" v-if="availableList.length > 0">
                <label for="selectTaskList">List:</label>
                <select id="selectTaskList" v-model="task.list_id">
                    <option v-for="list in availableList" :key="list.list_id" :value="list.list_id">{{ list.listname }}
                    </option>
                </select>
            </div>
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
            <div v-if="availableList.length === 0" class="form-group">
                <p>There are no available lists. Create one:</p>
                <button class="btn btn-primary btn-sm" @click.prevent="createList">Create List</button>
            </div>
            <button class="btn btn-success" type="submit" style="margin: 8px;">Create Task</button>
            <button class="btn btn-danger" @click="cancelCreateTask">Cancel</button>
        </form>
        <create-list-popup v-if="showCreateListPopup" :is-visible="showCreateListPopup" @close="cancelCreateList">
        </create-list-popup>


    </div>
</template>
<script>
import CreateListPopup from '@/components/List/CreateListPopup.vue';

export default {
    name: "CreateTask",
    props: {
        userId: {
            type: Number,
            required: true
        }
    },
    components: {
        CreateListPopup
    },
    data() {
        return {
            task: {
                title: "",
                description: "",
                deadline: "",
                list_id: 0,
            },
            availableList: [],
            minDate: new Date().toISOString().split('T')[0],
            feedbackMessage: '',
            isSuccess: false,
            showCreateListPopup: false
        };
    },
    methods: {
        createNewTask() {
            const taskData = {
                user_id: this.userId,
                title: this.task.title,
                description: this.task.description,
                deadline: this.task.deadline,
                list_id: this.task.list_id,
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
        createList() {
            this.showCreateListPopup = true;
        },
        cancelCreateList() {
            this.getAvaliableLists();
            this.showCreateListPopup = false;
        },
        getAvaliableLists() {
            this.$axios.get('/lists')
                .then(response => {
                    this.availableList = response.data;
                })
                .catch(error => {
                    this.feedbackMessage = "Something went wrong when getting lists."
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
    },
    mounted() {
        this.getAvaliableLists();
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
.form-group-with-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

select {
    width: calc(100% - 150px); 
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.btn-sm {
    margin-left: 10px; 
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #004085;
}
</style>
