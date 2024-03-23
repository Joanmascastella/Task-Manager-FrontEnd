<template>
    <div class="task-container p-3 bg-light shadow rounded">
        <div class="pomodoro">
            <div class="row p-4 bg-light shadow rounded">
                <div class="col-md-6">
                    <div class="row">
                        <p>Session Length (mins)</p>
                    </div>
                    <div class="row counter overflow-auto p-4 bg-light shadow rounded">
                        <div class="col-md-4">
                            <button class="btn btn-default" @click="changeTime('session', -1)"
                                :disabled="isTimerRunning">-</button>
                        </div>
                        <div class="col-md-2">
                            <div>{{ sessionLength }}</div>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-default" @click="changeTime('session', 1)"
                                :disabled="isTimerRunning">+</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <p>Break Length (mins)</p>
                    </div>
                    <div class="row counter overflow-auto p-4 bg-light shadow rounded">
                        <div class="col-md-4">
                            <button class="btn btn-default" @click="changeTime('break', -1)"
                                :disabled="isTimerRunning">-</button>
                        </div>
                        <div class="col-md-2">
                            <div>{{ breakLength }}</div>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-default" @click="changeTime('break', 1)"
                                :disabled="isTimerRunning">+</button>
                        </div>
                    </div>
                </div>
                <div class="row counter p-3 ">
                    <h3>Select A Task To Work On:</h3>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown" aria-expanded="false" :disabled="isTimerRunning">
                            Select Task
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li v-for="task in tasks" :key="task.task_id">
                                <a class="dropdown-item" href="#" @click="selectTask(task)">{{ task.title }}</a>
                            </li>
                        </ul>
                    </div><br>
                    {{ selectedTask.title }}

                </div>

            </div>
        </div>
        <div class="flip-clock-wrapper">
            <div id="clock" class="row">
                <div class="timer">
                    <div class="middle">{{ displayTime }}</div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row" id="btns">
                <button class="btn btn-default btn-lg" @click="startTimer">Start</button>
                <button class="btn btn-default btn-lg" @click="stopTimer">Stop</button>
                <button class="btn btn-default btn-lg" @click="clearTimer">Clear</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CountDownClock",
    data() {
        return {
            sessionLength: 25,
            breakLength: 5,
            currentMode: 'Please Select Task',
            timeLeft: 0,
            timer: null,
            tasks: [],
            selectedTask: Object,
            startTime: null,
            totalTime: 0,
        };
    },
    computed: {
        displayTime() {
            let minutes = Math.floor(this.timeLeft / 60);
            let seconds = this.timeLeft % 60;
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        },
        isTimerRunning() {
            return this.timer !== null;
        },
    },
    methods: {
        changeTime(type, amount) {
            if (type === 'session') {
                this.sessionLength = Math.max(1, this.sessionLength + amount);
            } else {
                this.breakLength = Math.max(1, this.breakLength + amount);
            }
        },
        startTimer() {
            if (!this.selectedTask || !this.selectedTask.title) {
                alert('Please select a task before starting the timer.');
                return;
            }
            if (this.currentMode === 'Please Select Task') {
                this.timeLeft = this.sessionLength * 60;
                this.currentMode = 'session';
            }
            if (this.timer === null) {
                this.startTime = Date.now();
                this.timer = setInterval(() => {
                    if (this.timeLeft > 0) {
                        this.timeLeft -= 1;
                    } else {
                        this.switchMode();
                    }
                }, 1000);
            }
        },
        stopTimer() {
            if (this.timer !== null) {
                clearInterval(this.timer);
                this.timer = null;
                const elapsedTimeInSeconds = Math.round((Date.now() - this.startTime) / 1000);
                this.totalTime += elapsedTimeInSeconds;

                console.log(`Total time: ${this.totalTime} seconds`);

                if (this.selectedTask && this.selectedTask.task_id) {
                    this.selectedTask.time_elapsed = (this.selectedTask.time_elapsed || 0) + elapsedTimeInSeconds;
                    this.updateTaskTime(this.selectedTask.task_id, this.selectedTask);
                }
            }
        },
        clearTimer() {
            this.stopTimer();
            this.currentMode = 'Please Select Task';
            this.timeLeft = 0;
            this.selectedTask = "";
        },
        switchMode() {
            if (this.currentMode === 'session') {
                this.currentMode = 'break';
                this.timeLeft = this.breakLength * 60;
            } else if (this.currentMode === 'break') {
                this.currentMode = 'session';
                this.timeLeft = this.sessionLength * 60;
            }
        },
        selectTask(task) {
            this.selectedTask = task;
        },
        getAllTasks() {
            this.$axios.get("/tasks")
                .then(response => {
                    this.tasks = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        updateTaskTime(taskId, updatedTask) {
            this.$axios.put("/tasks/time/" + taskId, updatedTask)
                .then(response => {
                    console.log('Task time updated successfully', response.data);
                })
                .catch(error => {
                    console.error('Error updating task time', error);
                });
        }

    },
    mounted() {
        this.getAllTasks();
    }
};
</script>

<style scoped>
.task-container {
    border: 1px solid #000;
    background: #f7f7f7;
    border-radius: 10px;
    padding: 30px;
    margin: 25px auto;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9);
}

.pomodoro {
    margin: 20px;
}

p {
    text-align: center;
}

.timer {
    font-weight: bold;
    font-size: 5rem;
}

.flip-clock-wrapper {
    max-width: 460px;
    margin: 3em auto 2em;
    display: flex;
    justify-content: center;
}

.col-md-4 {
    display: flex;
    justify-content: center;
}

.col-md-2 {
    display: flex;
    justify-content: center;
    height: 34px;
    align-items: center;
}

.counter {
    display: flex;
    justify-content: center;
}

.clock {
    margin-top: 30px;
}

.container {
    width: 500px;
}

.middle {
    display: inline-block;
}

.container {
    width: 100%;
    max-width: 768px;
    margin: auto;
}

#btns {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
}

.btn {
    background-color: #333333;
    color: #CCCCCC;
    flex: 1;
    margin: 0 5px;
}

#stop {
    margin-left: 10px;
    margin-right: 10px;
}

#stats {
    background-color: #333333;
    width: 100%;
    margin-top: 30px;
    height: 70px;
    border-radius: 10px;
    color: #CCCCCC;
    font-size: 45px;
    text-align: center;
}

#statRow {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
</style>