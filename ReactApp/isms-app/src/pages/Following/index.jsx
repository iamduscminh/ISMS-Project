import React from "react";
import { useForm } from "react-hook-form";

const MyForm = () => {
  const { handleSubmit, register } = useForm();

  const options = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
  ];

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {options.map((option) => (
        <div key={option.id}>
          <label>
            <input
              type="radio"
              value={option.id}
              {...register("selectedOption")}
            />
            {option.label}
          </label>
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
