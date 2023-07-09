import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          {...register("exampleRequired", {
            required: "This input is required.",
            pattern: {
              value: /\d+/,
              message: "This input is number only.",
            },

            // xử lý lỗi khi nhập nhiều hơn 10 kí tự
            minLength: {
              value: 11,
              message: "This input must exceed 10 characters",
            },
          })}
        />

        {/* // xử lý lỗi bằng errrors */}
        {errors.exampleRequired && <p>{errors.exampleRequired.message}</p>}

        <input type="submit" />
      </form>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => setError("exampleRequired", "Message Error")}
      >
        Set Error
      </button>
    </>
  );
}
