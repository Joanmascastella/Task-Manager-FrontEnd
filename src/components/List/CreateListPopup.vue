<template>
    <div class="popup-container" v-if="isVisible">
        <div class="popup">
            <h2>Create New List</h2>
            <form @submit.prevent="createList">
                <div class="form-group">
                    <label for="listName" class="form-label">List Name:</label>
                    <input type="text" class="form-control" id="listName" v-model="list.listname" required>
                </div>
                <div class="feedback" v-if="feedbackMessage" :class="{ 'success': isSuccess, 'error': !isSuccess }">
                    {{ feedbackMessage }}
                </div>
                <button class="btn btn-primary" type="submit" style="margin: 5px;">Create</button>
                <button class="btn btn-secondary" @click="cancel">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "CreateListPopup",
    props: {
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            list: {
                listname: '',
            },
            feedbackMessage: '',
            isSuccess: false,
        };
    },
    methods: {
        createList() {
            const listData = {
                listname: this.list.listname
            };
            this.$axios.post('/lists', listData)
                .then(response => {
                    this.feedbackMessage = "List successfully created.";
                    this.isSuccess = true;
                    this.$emit('list-created', response.data.id);
                    this.resetForm();
                    this.hide();
                })
                .catch(error => {
                    this.feedbackMessage = "Something went wrong when creating the new list.";
                    this.isSuccess = false;
                });
        },
        resetForm() {
            this.list.listname = '';
            this.feedbackMessage = '';
            this.isSuccess = false;
        },
        show() {
            this.isVisible = true;
        },
        hide() {
            this.$emit('close');
        },
        cancel() {
            this.hide();
            this.resetForm();
        }
    }
};
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