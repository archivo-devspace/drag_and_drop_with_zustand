"use client";
import Input from "@/components/Input";
import List from "@/components/List";
import { useTaskStore } from "@/store/useTodo";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import React from "react";

const Page = () => {
  const { moveTask } = useTaskStore();

  const handleMoveTask = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;
    const taskId = active.id;
    const stageId = over.id;
    moveTask({ stageId: Number(stageId), taskId: Number(taskId) });
  };
  return (
    <DndContext onDragEnd={handleMoveTask}>
      <div className="flex flex-col gap-4 mt-10">
        <Input />
        <List />
      </div>
    </DndContext>
  );
};

export default Page;
