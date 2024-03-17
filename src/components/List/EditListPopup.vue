<template>
    <div class="popup-container" v-if="isVisible">
        <div class="popup">
            <h2>Edit List</h2>
            <form @submit.prevent="updateList">
                <div class="form-group">
                    <label for="listName" class="form-label">List Name:</label>
                    <input type="text" class="form-control" id="listName" v-model="list.listname" required>
                </div>
                <div class="feedback" v-if="feedbackMessage" :class="{ 'success': isSuccess, 'error': !isSuccess }">
                    {{ feedbackMessage }}
                </div>
                <button class="btn btn-primary" type="submit" style="margin: 5px;">Update</button>
                <button class="btn btn-secondary" @click="cancel">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "EditListPopup",
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        list: {
            type: Object,
            required: true
        },
    },
    methods: {
        updateList() {
            const listID = this.list.list_id;
            const listData = {
                listname: this.list.listname
            };
            this.$axios.put('/lists/' + listID, listData)
                .then(response => {
                    this.feedbackMessage = "List update successful.";
                    this.isSuccess = true;
                    this.$emit('list-updated');
                    this.hide(); 
                })
                .catch(error => {
                    console.error('Failed to update list:', error);
                    this.feedbackMessage = "Failed to update list. Please try again later.";
                    this.isSuccess = false;
                });
        },
        hide() {
            this.$emit('close'); 
        },
        cancel() {
            this.hide(); 
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
