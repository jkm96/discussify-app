'use client';

import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";

export default function ToastContainerWrapper() {
  return (
    <ToastContainer position={"bottom-right"} />
  );
}