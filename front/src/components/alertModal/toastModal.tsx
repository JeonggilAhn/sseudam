'use client'

import { ToastContainer } from "react-toastify";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";

const ToastModal = () => {
  const { notifications, clear } = useNotificationCenter();

  return (
    <ToastContainer
      position="top-center"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss={true}
      draggable={false}
      pauseOnHover={false}
      theme="light"
    />
  );
};

export default ToastModal;
