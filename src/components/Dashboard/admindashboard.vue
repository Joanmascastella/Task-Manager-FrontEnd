<template>
  <div class="admin-dashboard container-fluid">
    <h1 class="dashboard-title">Admin Dashboard</h1>
    <div class="row">
      <div class="col-lg-4">
        <div class="analytics-container">
          <h2 class="dashboard-subtitle">Analytics</h2>
          <p>Current analytics of the website user base </p>
          <div>
            <ActiveUsers />
            <TotalTasks />
            <CompletedTasks />
          </div>
        </div>
      </div>
      <div class="col-lg-7">
        <div class="user-table-container">
          <h2 class="dashboard-subtitle">Active users</h2>
          <p>Edit user details</p>
          <div class="table-responsive"> 
            <table class="table table-hover mt-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) in users" :key="user.user_id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.role }}</td>
                  <td>
                    <button @click="prepareEditModal(user)" class="btn btn-primary" style="margin-right: 10px;">Edit</button>
                    <button @click="deleteAccount(user.user_id)" class="btn btn-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal custom-modal" :class="{ 'show': showModal }" tabindex="-1" role="dialog" v-show="showModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit User</h5>
            <button type="button" class="close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateUserDetails">
              <div class="form-group">
                <label for="editUserName">Name</label>
                <input v-model="editableUser.name" type="text" class="form-control" id="editUserName">
              </div>
              <div class="form-group">
                <label for="editUserEmail">Email address</label>
                <input v-model="editableUser.email" type="email" class="form-control" id="editUserEmail">
              </div>
              <div class="form-group">
                <label for="editUserRole">Role</label>
                <select v-model="editableUser.role" class="form-control" id="editUserRole">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Save changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Feedback Message -->
    <div v-if="feedbackMessage" :class="['feedback', { 'success': isSuccess, 'error': !isSuccess }]">
      {{ feedbackMessage }}
    </div>
  </div>
</template>

<script>
import ActiveUsers from '../Analytics/ActiveUsers.vue';
import TotalTasks from '../Analytics/TotalTasks.vue';
import CompletedTasks from '../Analytics/CompletedTasks.vue';

export default {
  name: "AdminDashboard",
  components: {
    ActiveUsers,
    TotalTasks,
    CompletedTasks,
  },
  data() {
    return {
      users: [],
      editableUser: { name: '', email: '', role: '' },
      feedbackMessage: '',
      isSuccess: false,
      showModal: false,
    };
  },
  methods: {
    fetchUsers() {
      this.$axios.get("/user").then(response => {
        this.users = response.data;
      }).catch(error => {
        console.error("Failed to get all users", error);
      });
    },
    prepareEditModal(user) {
      this.editableUser = { ...user };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    updateUserDetails() {
      this.$axios.put("/user/update/" + this.editableUser.user_id, this.editableUser).then(response => {
        this.showModal = false;
        this.fetchUsers();
        this.feedbackMessage = 'User successfully updated';
        this.isSuccess = true;
        setTimeout(() => {
          this.feedbackMessage = '';
        }, 3000);
      }).catch(error => {
        console.error("Failed to update user", error);
        this.feedbackMessage = 'Failed to update user';
        this.isSuccess = false;
        setTimeout(() => {
          this.feedbackMessage = '';
        }, 3000);
      });
    },
    deleteAccount(user_id) {
      if (confirm("Are you sure you want to delete this account? This action cannot be undone.")) {
        this.$axios.delete("/user/delete/" + user_id).then(response => {
          this.fetchUsers();
        }).catch(error => {
          console.error("Failed to delete account", error);
        });
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>


.analytics-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.user-table-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.dashboard-title {
  margin-bottom: 20px;
}

.dashboard-subtitle {
  margin-bottom: 10px;
}

.analytics-row {
  display: flex;
  flex-direction: column; 
  gap: 20px;

}


.custom-modal.show {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .admin-dashboard {
    margin: 0px;
  }
}
</style>
