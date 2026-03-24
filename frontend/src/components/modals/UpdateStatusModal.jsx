import { useState, useContext } from "react";
import ModalWrapper from "./ModalWrapper";
import {GrievanceContext} from '../../context/GrievanceProvider';

  const UpdateStatusModal = ({ onClose }) => {
    const { changeStatus } = useContext(GrievanceContext);
    const [id, setId] = useState("")
    const [status, setStatus] = useState("Created");

    const handleSubmit = async () => {
        await changeStatus(id, status);
        onClose();
    };

  return (
    <ModalWrapper onClose={onClose}>
      
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold mb-4">
        Update Status
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
        Enter Grievance ID
        </label>
        <input
        type="text"
        placeholder="e.g. 66f2a1c..."
        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
        value={id}
        onChange={(e) => setId(e.target.value)}
        />
      </div>

      {/* Status Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Select Status
        </label>
        <select
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Created">Created</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Update
        </button>
      </div>

    </ModalWrapper>
  );
};

export default UpdateStatusModal;