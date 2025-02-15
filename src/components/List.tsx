import { useTaskStore } from "@/store/useTodo";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const DraggableTask = ({ task, handleEditTask, deleteTodo }: any) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id.toString(),
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      className="flex p-4 w-full items-center bg-white border border-gray-300 rounded-lg mt-6"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="flex flex-col">
        <span>{task.title}</span>
        <span>{task.description}</span>
      </div>
      <div className="ml-auto flex gap-4">
        <button
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-700"
          onClick={() => handleEditTask(task.id.toString())}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-red-300"
          onClick={() => deleteTodo(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const DroppableStage = ({ stage, tasks, handleEditTask, deleteTodo }: any) => {
  const { setNodeRef } = useDroppable({ id: stage.id.toString() });

  return (
    <div
      className="bg-gray-200 p-4 rounded-md border border-gray-300 shadow-lg min-h-[100px] flex flex-col h-[400px] "
      ref={setNodeRef}
    >
      <span className="text-lg border-b border-gray-500 pb-4 font-bold">
        {stage.title}
      </span>
      {tasks.length === 0 ? (
        <span>No Tasks in this stage</span>
      ) : (
        tasks.map((task: any) => (
          <DraggableTask
            key={task.id}
            task={task}
            handleEditTask={handleEditTask}
            deleteTodo={deleteTodo}
          />
        ))
      )}
    </div>
  );
};

const List = () => {
  const { stages, tasks, deleteTodo } = useTaskStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const handleEditTask = (id: string) => {
    params.set("id", id);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-3 gap-4 px-10">
      {stages.map((stage) => {
        const filteredTasks = tasks.filter(
          (task) => task.category === stage.title
        );
        return (
          <DroppableStage
            key={stage.id}
            stage={stage}
            tasks={filteredTasks}
            handleEditTask={handleEditTask}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </div>
  );
};

export default List;
