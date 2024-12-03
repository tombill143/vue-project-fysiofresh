<template>
  <div class="kanban-board">
    <!-- Heading -->
    <h1 class="main-heading">My Todos for This Week</h1>

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

          <!-- Inner draggable for tasks -->
          <draggable
            v-model="element.items"
            group="tasks"
            class="kanban-cards"
            :animation="200"
            :ghost-class="'ghost'"
            @start="handleDragStart"
            @end="handleDragEnd"
            :item-key="'id'"
          >
            <template #item="{ element: task }">
              <div class="kanban-card" :key="task.id">
                {{ task.text }}
              </div>
            </template>
          </draggable>

          <!-- Placeholder -->
          <div
            v-if="activePlaceholder === element.id"
            class="drop-placeholder"
          ></div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'; // Import vuedraggable
import { supabase } from './supabase'; // Import Supabase client

export default {
  components: {
    draggable,
  },
  data() {
    return {
      activePlaceholder: null, // Tracks the currently active placeholder
      columns: [], // Columns are fetched dynamically
    };
  },
  mounted() {
    this.fetchData(); // Fetch data from Supabase when the component is mounted
  },
  methods: {
    async fetchData() {
      try {
        // Fetch Columns from Supabase
        const { data: columns, error } = await supabase
          .from('columns')
          .select('*');
        if (error) throw error;

        console.log('Columns fetched:', columns);

        // Fetch Tasks from Supabase
        const { data: tasks, error: tasksError } = await supabase
          .from('tasks')
          .select('*');
        if (tasksError) throw tasksError;

        console.log('Tasks fetched:', tasks);

        // Map tasks to columns based on column_id
        this.columns = columns.map((column) => ({
          ...column,
          items: tasks.filter((task) => task.column_id === column.id),
        }));

        console.log('Mapped columns:', this.columns);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    },
    showPlaceholder(columnId) {
      this.activePlaceholder = columnId; // Show placeholder on drag enter
    },
    hidePlaceholder() {
      this.activePlaceholder = null; // Hide placeholder on drag leave
    },
    handleDragStart(evt) {
      console.log('Drag started:', evt);
      this.activePlaceholder = null; // Reset placeholder on drag start
    },
    handleDragEnd(evt) {
      console.log('Drag ended:', evt);
      this.activePlaceholder = null; // Ensure placeholder is cleared after drag ends
    },
  },
};
</script>

<style scoped>
/* Styling for the Kanban board */

h1,
h2,
h3,
h4,
h5,
h6,
p {
  color: darkslategrey;
}
.kanban-board {
  display: flex;
  flex-wrap: wrap; /* Allow columns to wrap into rows */
  gap: 20px; /* Space between columns */
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto; /* Center the board */
}

.kanban-column {
  flex: 1 1 calc(33.333% - 20px); /* Each column takes up 1/3 of the row, minus the gap */
  box-sizing: border-box; /* Include padding and borders in the width calculation */
  min-width: 300px; /* Prevent columns from shrinking below this width */
  border: 1px solid lightgrey;
  border-radius: 12px;
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
  background-color: #e4e6eb;
  padding: 10px;
  font-weight: bold;
  text-align: center;
  border-radius: 4px;
  margin-bottom: 15px;
  cursor: pointer;
}

.kanban-card {
  border: 1px solid grey; /* Adds the 1px grey border */
  border-radius: 4px; /* Optional: makes the edges slightly rounded */
  padding: 10px; /* Adds some spacing inside the card */
  margin-bottom: 10px; /* Adds space between cards */
  background-color: white; /* Ensures a clean white background */
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1); /* Optional: subtle shadow for depth */
  text-align: center;
  margin: 1em;
  cursor: pointer;
}

.main-heading {
  text-align: center;
  padding: 2em;
}

.drop-placeholder {
  height: 50px;
  background-color: darkgrey; /* Light blue background */
  border: 2px dotted blanchedalmond; /* Dashed border */
  border-radius: 4px;
  margin: 1em;
  transition: opacity 0.2s ease-in-out;
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
