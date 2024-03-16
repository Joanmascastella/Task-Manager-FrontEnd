<template>
    <div class="container-fluid vh-100 d-flex justify-content-center align-items-center">
        <div class="user-dashboard w-100" style="max-width: 600px;">
            <div v-if="task.title">
                <div class="task-container">
                    <h1 class="mb-4">{{ task.title }}</h1>
                    <p><strong>Description:</strong> {{ task.description }}</p>
                    <p><strong>Deadline:</strong> {{ task.deadline }}</p>
                    <p><strong>Status:</strong> {{ task.status }}</p>
                    <p><strong>Time Elapsed:</strong> {{ task.time_elapsed }}</p>
                    <div v-if="feedbackMessage" :class="['feedback', { 'success': isSuccess, 'error': !isSuccess }]">
                        {{ feedbackMessage }}
                    </div>
                </div>
            </div>

            <div v-else>
                <p>Loading task data...</p>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "ShareTask",
    data() {
        return {
            task: {
                title: "",
                description: "",
                deadline: "",
                status: "",
                time_elapsed: 0,
                feedbackMessage: '',
                isSuccess: false,
            },
            tasks: []
        };
    },

    methods: {
        getTask(taskId) {
            this.$axios.get("/share/task/" + taskId)
                .then(response => {
                    this.task = response.data; 
                })
                .catch((error) => {
                    this.feedbackMessage = "Failed to retrieve task.";
                    this.isSuccess = false;
                    console.error(error);
                });
        },
    },
    mounted() {
        const taskId = this.$route.params.taskId;
        console.log("Task ID:", taskId);
        this.getTask(taskId);
    },
}

</script>

<style lang="css" scoped>
.user-dashboard {
    background-color: #ffffff;
    padding: 2rem;
    margin: auto;
    max-width: 600px;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    font-family: 'Arial', sans-serif;
}

h1 {
    color: #333333;
    margin-bottom: 1.5rem;
    font-size: 2rem;
}

p {
    color: #555555;
    margin-bottom: 0.5rem;
    line-height: 1.6;
}

.feedback {
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 0.25rem;
    font-weight: bold;
}

.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

.btn-primary {
    background-color: #5C6BC0;
    color: white;
}

.btn-primary:hover {
    background-color: #3f51b5;
}

.btn-danger {
    background-color: #EF5350;
    color: white;
}

.btn-danger:hover {
    background-color: #d32f2f;
}

@media (max-width: 768px) {
    .user-dashboard {
        padding: 1rem;
    }

    h1 {
        font-size: 1.5rem;
    }

    .btn {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }
}

</style>
