<template>
  <v-app>
    <AppHeader />
    <div class="add-todo">
      <h2>Add a New Job</h2>
      <form @submit.prevent="submitTodo">
        <div class="form-group">
          <label for="job-name">Job Name</label>
          <input
            type="text"
            id="job-name"
            v-model="jobName"
            placeholder="Enter job name"
            required
          />
        </div>

        <div class="form-group">
          <button type="submit" class="submit-btn">Add Job</button>
        </div>
      </form>
    </div>
    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import { supabase } from './supabase'; // Relative path to the Supabase client

export default {
  data() {
    return {
      jobName: '', // Bind this to the input field
    };
  },
  components: {
    AppHeader,
    AppFooter,
  },
  methods: {
    // This method is triggered when the form is submitted
    async submitTodo() {
      // Continue with your logic to insert the task
      try {
        // Fetch the column ID for the "To Do" column
        const { data: todoColumn, error: columnError } = await supabase
          .from('columns')
          .select('id') // We only need the column ID
          .eq('title', 'To Do') // Ensure the column title matches exactly
          .single(); // Expect only one result for "To Do" column

        if (columnError) throw columnError; // Handle any errors related to column fetch

        const todoColumnId = todoColumn.id;

        // Insert the new task into the tasks table, associating it with the "To Do" column
        const { error: taskError } = await supabase.from('tasks').insert({
          text: this.jobName, // Set the job name as task text
          column_id: todoColumnId, // Associate it with the "To Do" column
        });

        if (taskError) throw taskError; // Handle any errors related to task insertion

        console.log('Task successfully added!');
        // Optionally, navigate to the Kanban board
        this.$router.push({ name: 'KanbanBoard' });
      } catch (err) {
        console.error('Error adding task to the database:', err);
      }
    },
  },
};
</script>

<style scoped>
/* Styling for your AddTodo page */
.add-todo {
  width: 600px;
  margin: 90px auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ffecbe;
  font-family: 'CustomFont', sans-serif;
  color: #887171;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 4px;
  font-size: 14px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  background-color: #887171;
  color: white;
  border-radius: 4px;
  padding: 20px;
}

button.submit-btn {
  padding: 10px 20px;
  background-color: #f0908a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button.submit-btn:hover {
  background-color: #f8bcb4;
}

form {
  padding: 2rem;
}
</style>
