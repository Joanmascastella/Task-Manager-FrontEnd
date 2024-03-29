<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6 bg-white border rounded shadow-sm">
                <div class="header d-flex justify-content-end" style="margin: 10px;">
                    <button class="btn btn-primary mb-3" @click.prevent="createList">Create New List</button>
                </div>
                <h1 class="text-center mt-3">Your Lists</h1>
                <div v-if="listsItems.length > 0" class="list-container px-3 pb-3">
                    <div v-for="list in listsItems" :key="list.list_id"
                        class="list-item bg-light rounded my-3 p-3 shadow-sm">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="list-name">{{ list.listname }}</span>
                            <div class="button-group">
                                <button @click="edit(list)" class="btn btn-info btn-sm mx-1">Edit</button>
                                <button @click="deleteList(list.list_id)"
                                    class="btn btn-danger btn-sm mx-1">Delete</button>
                                <button @click="view(list)" class="btn btn-secondary btn-sm mx-1">View</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="p-3 text-center">
                    <p>No lists found. Create one!</p>
                </div>
            </div>
            <div class="col-md-6" v-if="showViewList">
                <ViewList :list="selectedList" />
            </div>

        </div>
        <edit-list-popup v-if="showEditListPopup" :list="selectedListForEdit" :is-visible="showEditListPopup"
            @close="toggleEditListPopup(false)" @list-updated="listUpdated"></edit-list-popup>
        <create-list-popup v-if="showCreateListPopup" :is-visible="showCreateListPopup" @close="cancelCreateList">
        </create-list-popup>
        <div class="pagination-controls">
            <button @click="previousPage" :disabled="currentPage <= 1" class="btn btn-dark"
                style="margin-right: 6px;">Previous</button>
            <span>Page {{ currentPage }}</span>
            <button @click="nextPage" class="btn btn-dark" style="margin-left: 6px;">Next</button>
        </div>
    </div>

</template>

<script>
import EditListPopup from '@/components/List/EditListPopup.vue';
import CreateListPopup from '@/components/List/CreateListPopup.vue';
import ViewList from '@/components/List/ViewList.vue';

export default {
    name: 'ListDashboard',
    components: {
        CreateListPopup,
        ViewList,
        EditListPopup
    },
    data() {
        return {
            listsItems: [],
            showCreateListPopup: false,
            selectedList: null,
            showViewList: false,
            selectedListForEdit: null,
            showEditListPopup: false,
            currentPage: 1,
            limit: 10,
        }
    },
    methods: {
        view(list) {
            this.selectedList = list;
            this.showViewList = true;
        },
        getAllLists() {
            const offset = (this.currentPage - 1) * this.limit;
            this.$axios.get(`/lists?limit=${this.limit}&offset=${offset}`)
                .then(response => {
                    this.listsItems = response.data;
                })
                .catch(error => {
                    console.error("Something went wrong when getting lists:", error);
                });
        },
        deleteList(listId) {
            if (confirm("Are you sure you want to delete this list?")) {
                this.$axios.delete(`/lists/${listId}`)
                    .then(response => {
                        this.getAllLists();
                        alert(response.data.message);
                    })
                    .catch(error => {
                        console.error('Failed to delete list:', error);
                        alert("Failed to delete list. Please try again later.");
                    });
            }
        },
        nextPage() {
            this.currentPage++;
            this.getAllLists();
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getAllLists();
            }
        },
        createList() {
            this.showCreateListPopup = true;
        },
        cancelCreateList() {
            this.getAllLists();
            this.showCreateListPopup = false;
        },
        edit(list) {
            this.selectedListForEdit = list;
            this.toggleEditListPopup(true);
        },
        toggleEditListPopup(show) {
            this.showEditListPopup = show;
        },
        listUpdated() {
            this.getAllLists();
            this.toggleEditListPopup(false);
        }

    },
    mounted() {
        this.getAllLists();
    }
}
</script>


<style scoped>
.list-container {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
}

.list-item {
    background-color: #f8f9fa;
    border: 1px solid #e3e6ea;
    border-radius: 0.25rem;
    transition: transform 0.1s ease-in-out;
}

.list-item:hover {
    transform: translateY(-2px);
}

.list-name {
    font-weight: 500;
    font-size: 1.1rem;
}

.button-group>.btn {
    margin: 0 5px;
}

.text-center {
    text-align: center;
}

.shadow-sm {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
}

@media (max-width: 768px) {
    .button-group>.btn {
        margin-bottom: 5px;
    }

    .button-group {
        flex-direction: column;
        align-items: stretch;
    }
}
</style>
