<template>
  <div class="kanban-board">
    <!-- Outer draggable for columns -->
    <draggable v-model="columns" group="columns" class="kanban-columns">
      <template #item="{ element }">
        <div class="kanban-column" :key="element.id">
          <h2 class="column-title">{{ element.title }}</h2>

          <!-- Inner draggable for tasks -->
          <draggable
            v-model="element.items"
            group="tasks"
            class="kanban-cards"
            :animation="200"
            :ghost-class="'ghost'"
          >
            <template #item="{ element: task }">
              <div class="kanban-card" :key="task.id">
                {{ task.text }}
              </div>
            </template>
          </draggable>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'; // Import VueDraggable

export default {
  components: {
    draggable, // Register draggable as a local component
  },
  data() {
    return {
      columns: [
        {
          id: 1,
          title: 'To Do',
          items: [
            { id: 1, text: 'Task 1' },
            { id: 2, text: 'Task 2' },
          ],
        },
        {
          id: 2,
          title: 'In Progress',
          items: [{ id: 3, text: 'Task 3' }],
        },
        {
          id: 3,
          title: 'Done',
          items: [{ id: 4, text: 'Task 4' }],
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Styling for the Kanban board */
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
