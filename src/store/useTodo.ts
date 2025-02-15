import { create } from "zustand";

const options = {
  todo: "Todo",
  inprogress: "In Progress",
  done: "Done",
};

const tasks = [
  {
    id: 1,
    title: "task 1",
    description: "description 1",
    category: options.todo,
  },
  {
    id: 2,
    title: "task 2",
    description: "description 2",
    category: options.inprogress,
  },
  {
    id: 3,
    title: "task 3",
    description: "description 3",
    category: options.done,
  },
];

export const stages = [
  {
    id: 1,
    title: options.todo,
  },
  {
    id: 2,
    title: options.inprogress,
  },
  {
    id: 3,
    title: options.done,
  },
];

export interface TaskProps {
  tasks: {
    id: number;
    title: string;
    description: string;
    category: string;
  }[];
  stages: {
    id: number;
    title: string;
  }[];
  createTodo: (value: any) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (value: any) => void;
  moveTask: ({ taskId, stageId }: { taskId: number; stageId: number }) => void;
}

export const useTaskStore = create<TaskProps>((set) => ({
  tasks: tasks,
  stages: stages,
  createTodo: (newTask: any) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...newTask,
          id: state.tasks.length + 1,
          category: options.todo,
        },
      ],
    })),
  deleteTodo: (id: number) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  updateTodo: (value: any) =>
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === value.id) {
          return {
            ...task,
            title: value.title,
            description: value.description,
            category: value.category,
          };
        }
        return task;
      }),
    })),
  moveTask: ({ taskId, stageId }) =>
    set((state) => {
      const taskToMove = state.tasks.find((task) => task.id === taskId);
      if (!taskToMove) return state;

      const otherTasks = state.tasks.filter((task) => task.id !== taskId);
      return {
        tasks: [
          ...otherTasks,
          {
            ...taskToMove,
            category: state.stages[stageId - 1].title,
          },
        ],
      };
    }),
}));
