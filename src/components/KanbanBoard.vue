<template>
  <div>
    <!-- Header Component -->
    <Header />

    <div class="kanban-board">
      <!-- Add Todo Button -->
      <div class="add-todo-button">
        <button @click="goToAddTodo" class="add-todo-btn">Add Job +</button>
      </div>

      <!-- Outer draggable for columns -->
      <draggable
        v-model="columns"
        group="columns"
        class="kanban-columns"
        :item-key="'id'"
      >
        <template #item="{ element }">
          <div
            class="kanban-column"
            :key="element.id"
            @dragenter="showPlaceholder(element.id)"
            @dragleave="hidePlaceholder"
          >
            <h2 class="column-title">{{ element.title }}</h2>

            <!-- Remove @start="handleDragStart" and @end="handleDragEnd" -->
            <draggable
              v-model="element.items"
              group="tasks"
              class="kanban-cards"
              :animation="200"
              :ghost-class="'ghost'"
              @change="onTaskMove"
              :item-key="'id'"
            >
              <template #item="{ element: task }">
                <div class="kanban-card" :key="task.id">
                  {{ task.text }}
                </div>
              </template>
            </draggable>

            <!-- Placeholder for task drop -->
            <div
              v-if="activePlaceholder === element.id"
              class="drop-placeholder"
            ></div>
          </div>
        </template>
      </draggable>
    </div>

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { supabase } from './supabase';
import Header from './AppHeader.vue';
import Footer from './AppFooter.vue';

export default {
  components: {
    draggable,
    Header,
    Footer,
  },
  data() {
    return {
      activePlaceholder: null,
      columns: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    // Method to show the placeholder when a task is being dragged
    showPlaceholder(columnId) {
      this.activePlaceholder = columnId;
    },

    // Method to hide the placeholder when the task is no longer dragged over the column
    hidePlaceholder() {
      this.activePlaceholder = null;
    },

    async fetchData() {
      try {
        // Fetch columns from the database
        const { data: columns, error } = await supabase
          .from('columns')
          .select('*');
        if (error) throw error;

        // Fetch tasks from the database
        const { data: tasks, error: tasksError } = await supabase
          .from('tasks')
          .select('*');
        if (tasksError) throw tasksError;

        // Assign tasks to their respective columns
        this.columns = columns.map((column) => ({
          ...column,
          items: tasks.filter((task) => task.column_id === column.id),
        }));
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    },

    async onTaskMove(evt) {
      console.log('onTaskMove triggered:', evt);

      try {
        const { added, removed } = evt;

        // If a task was added to a new column
        if (added) {
          // Log added element
          console.log('Added task:', added);
          console.log('Added task element ID:', added.element.id);

          // Find the column in the UI state where the task is now (after the move)
          const newColumn = this.columns.find((column) => {
            const found = column.items.some(
              (task) => task.id === added.element.id
            );
            if (found) {
              console.log('Found new column:', column);
            }
            return found;
          });

          if (!newColumn) {
            console.error(
              'Could not determine the new column for the moved task.'
            );
            return;
          }

          console.log(`Task moved to column: ${newColumn.title}`);

          // Now update the task's column_id in the database
          const { data, error } = await supabase
            .from('tasks')
            .update({ column_id: newColumn.id }) // Update column_id based on UI column ID
            .eq('id', added.element.id);

          if (error) {
            console.error('Error updating task in the database:', error);
            return;
          }

          console.log('Task updated in the database:', data);

          // Trigger UI reactivity after the database update
          this.columns = [...this.columns]; // Force a re-render to reflect changes in the UI
        }

        // If a task was removed from its old column
        if (removed) {
          const oldColumn = this.columns.find(
            (column) => column.id === removed.element.column_id
          );
          if (oldColumn) {
            oldColumn.items = oldColumn.items.filter(
              (task) => task.id !== removed.element.id
            ); // Remove task from old column
          }

          console.log(`Task removed from column: ${oldColumn.title}`);
        }
      } catch (error) {
        console.error('Error in onTaskMove:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Font face import */
@font-face {
  font-family: 'CustomFont';
  src: url('../assets/fonts/fonnts.com-212207/fonts/fonnts.com-Adrianna_Bold.otf')
      format('woff2'),
    url('../assets/fonts/fonnts.com-212207/fonts/fonnts.com-Adrianna_Bold_Italic.otf')
      format('woff'),
    url('../assets/fonts/fonnts.com-212207/fonts/fonnts.com-Adrianna_Regular.otf')
      format('woff');
  font-weight: normal;
  font-style: normal;
}

/* Base styles */
body {
  margin: 0;
  font-family: 'CustomFont', sans-serif; /* Apply custom font globally */
  background-color: #fffcf4; /* Ensure background matches your board */
}

.kanban-board {
  padding-top: 20px; /* Ensure some spacing below the header */
  padding-bottom: 20px; /* Ensure some spacing above the footer */
}

/* Header and Footer adjustments */
header {
  background-color: #887171; /* Example color */
  color: #fff;
  padding: 10px 20px;
  text-align: center;
}

footer {
  background-color: #887171; /* Example color */
  color: #fff;
  padding: 10px 20px;
  text-align: center;
}

/* Kanban Board Styles */
.kanban-board {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  max-width: 2000px;
  margin: 0px auto;
  background-color: #fffcf4;
  padding: 5rem;
  padding-bottom: 2rem;
}

.kanban-column {
  flex: 1 1 calc(33.333% - 20px); /* Each column takes up 1/3 of the row, minus the gap */
  box-sizing: border-box; /* Include padding and borders in the width calculation */
  min-width: 300px; /* Prevent columns from shrinking below this width */
  border: 1px solid lightgrey;
  border-radius: 12px;
  background-color: #ffecbe;
}

.kanban-columns {
  display: flex; /* Ensures horizontal layout for columns */
  flex-wrap: wrap; /* Allows wrapping to multiple rows */
  gap: 20px; /* Adds spacing between columns */
  justify-content: center; /* Aligns columns to the center */
  width: 100%; /* Ensures it stretches the available space */
  box-sizing: border-box; /* Includes padding/border in width */
}

.column-title {
  background-color: #887171;
  font-family: 'CustomFont', sans-serif; /* Ensure the custom font is applied */
  color: #fff9f3;
  padding: 10px;
  font-weight: bold;
  text-align: center;
  border-radius: 4px;
  margin-bottom: 15px;
  cursor: pointer;
}

.kanban-card {
  border: 1px solid lightgrey; /* Adds the 1px grey border */
  border-radius: 4px; /* Optional: makes the edges slightly rounded */
  padding: 10px; /* Adds some spacing inside the card */
  margin-bottom: 10px; /* Adds space between cards */
  color: #887171;
  font-weight: 600;
  background-color: #f8bcb4; /* Ensures a clean white background */
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1); /* Optional: subtle shadow for depth */
  text-align: center;
  margin: 1em;
  cursor: pointer;
  font-family: 'CustomFont', sans-serif; /* Apply custom font globally */
}

.kanban-cards {
  background-color: #ffecbe;
}

.main-heading {
  font-family: 'CustomFont', sans-serif; /* Ensure the custom font is applied */
  font-weight: 200; /* Apply the bold version of the font */
  text-align: center;
  padding: 2em;
  color: #887171;
  margin-top: -3em;
}

.drop-placeholder {
  height: 50px;
  background-color: darkgrey; /* Light blue background */
  border: 2px dotted blanchedalmond; /* Dashed border */
  border-radius: 4px;
  margin: 1em;
  transition: opacity 0.2s ease-in-out;
}

button,
input,
select,
textarea {
  background-color: transparent; /* Keep transparent for inputs/selects */
  border-style: none;
  background-color: pink; /* Pink background for buttons globally */
  color: #887171; /* Default text color */
  padding: 1em;
  border-radius: 4px;
  width: 120px;
  font-family: 'CustomFont', sans-serif;
  border: 1px solid lightgrey; /* Adds the 1px grey border */
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1); /* Optional: subtle shadow for depth */
  cursor: pointer; /* Ensures pointer cursor for buttons */
}

.add-todo-btn {
  text-align: left;
  margin: auto;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .kanban-board {
    flex-direction: column; /* Stack columns vertically on smaller screens */
    gap: 10px;
  }

  .kanban-column {
    margin-bottom: 10px;
  }
}
</style>
