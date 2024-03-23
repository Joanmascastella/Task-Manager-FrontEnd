<template>
    <div>
        <div v-if="taskCount === 0 || createFormVisible">
            <div v-if="!createFormVisible && taskCount === 0">
                <button @click="showCreateTaskForm" class="big-plus-button">+</button>
            </div>
            <CreateTask v-if="createFormVisible" :userId="task.user_id" @task-created="handleTaskCreated"
                @cancel-create-task="cancelCreateTask" />
        </div>
        <EditTaskPanel v-if="editFormVisible" :taskData="taskToEdit" @task-updated-successfully="handleTaskUpdated"
            @cancel-edit-task="cancelEditTask" />
        <TaskList v-if="taskCount > 0" :tasks="tasks" @new-task-clicked="showCreateTaskForm"
            @edit-task="showEditTaskForm" />
    </div>
</template>


<script>
import { useAuthStore } from '@/store/auth.js';
import CreateTask from './CreateTask.vue';
import TaskList from './TaskList.vue';
import EditTaskPanel from './EditTaskPanel.vue';

export default {
    name: "TaskItem",
    components: {
        CreateTask,
        TaskList,
        EditTaskPanel
    },
    data() {
        return {
            task: {
                task_id: 0,
                user_id: 0,
                title: "",
                description: "",
                deadline: "",
                status: "",
                list_id: 0,
                time_elapsed: 0,
                feedbackMessage: '',
                isSuccess: false,
            },
            createFormVisible: false,
            tasks: [],
            editFormVisible: false,
            taskToEdit: null,
        };
    },
    computed: {
        taskCount() {
            return this.tasks.length;
        }
    },
    methods: {
        showEditTaskForm(task) {
            this.taskToEdit = task;
            this.editFormVisible = true;
        },
        handleTaskUpdated() {
            this.getAll(); 
            this.editFormVisible = false; 
        },
        cancelEditTask() {
            this.editFormVisible = false;
        },
        getAll() {
            this.$axios.get("/tasks")
                .then(response => {
                    this.tasks = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        showCreateTaskForm() {
            this.createFormVisible = true;
        },
        handleTaskCreated(newTaskId) {

            this.getAll();
            if (!newTaskId) {
                this.feedbackMessage = "Failed to create new task.";
                this.isSuccess = false;
            }
            else {
                this.createFormVisible = false;
                this.$emit('refresh-analytics');
            }
        },
        refreshTask() {
            this.getAll();
        },
        cancelCreateTask() {
            this.createFormVisible = false;
        }
    },
    mounted() {
        const authStore = useAuthStore();
        const userId = authStore.userId;

        if (userId) {
            this.$axios.get("/user/" + userId)
                .then((res) => {
                    this.task.user_id = res.data.user_id;
                    this.getAll();
                })
                .catch((error) => console.log(error));

        } else {
            console.log('No user ID found in auth store.');
        }
    }
};
</script>

<style scoped>
.big-plus-button {
    width: 200px;
    height: 200px;
    font-size: 64px;
    font-weight: bold;
    border-radius: 10%;
    border: none;
    background-color: #cbcbcb;
    color: white;
}

.big-plus-button:hover {
    background-color: #525353;
    cursor: pointer;
}
</style>
