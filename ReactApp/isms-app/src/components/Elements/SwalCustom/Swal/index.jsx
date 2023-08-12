import React from "react";
import Swal from "sweetalert2";

//Error
export const handleShowError = async () => {
  const result = await Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Do you want to continue?",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });

  if (result.isConfirmed) {
    // Perform the action if the user confirms
    console.log("User confirmed!");
  } else {
    console.log("User canceled!");
  }
};

//Loading
export const handleAsyncTask = async (taskFunc) => {
  // Show loading popup
  Swal.fire({
    title: "Loading...",
    allowOutsideClick: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  // Simulate an asynchronous task (e.g., API call, fetching data, etc.)
  try {
    await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulating a 2-second delay
    // Replace the above line with your actual asynchronous task
    // Once the task is completed, close the loading popup
    Swal.close();
  } catch (error) {
    // Handle errors if needed
    Swal.close();
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "An error occurred during the task.",
    });
  }
};
