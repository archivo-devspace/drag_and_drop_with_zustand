import { useTaskStore } from "@/store/useTodo";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const defaultValues = {
  title: "",
  description: "",
};

const Input = () => {
  const { tasks, createTodo, updateTodo } = useTaskStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });

  const taskId = searchParams.get("id");

  useEffect(() => {
    if (taskId) {
      const task = tasks.find((task) => task.id === Number(taskId));
      reset(task);
    }
  }, [searchParams]);

  const onSubmit: SubmitHandler<any> = (data) => {
    data?.id ? updateTodo(data) : createTodo(data);
    reset(defaultValues);
  };
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col justify-center items-center rounded-lg border border-gray-300 p-8 w-[400px] gap-4 shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="title">Title</label>
        <input
          id="title"
          className="outline-none border border-gray-300 w-full rounded-md"
          type="text"
          {...register("title")}
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          className="outline-none border border-gray-300 w-full rounded-md"
          type="text"
          {...register("description")}
        />
        <div className="flex gap-4 items-center">
          <button
            onClick={() => {
              reset(defaultValues);
              router.push("/");
            }}
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Input;
