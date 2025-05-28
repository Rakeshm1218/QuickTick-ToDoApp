import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateTask, deleteTask } from "../features/tasksSlice";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || "",
    dueDate: task.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : "",
    status: task.status,
  });

  const { title, description, dueDate, status } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // In your TaskItem component
  const onSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    dispatch(
      updateTask({
        id: task._id, // Make sure this is included
        title,
        description,
        dueDate,
        status,
      })
    )
      .unwrap()
      .then(() => setIsEditing(false))
      .catch((err) => console.error(err));
  };

  const onStatusChange = () => {
    const newStatus = status === "Open" ? "Complete" : "Open";
    dispatch(
      updateTask({
        id: task._id,
        status: newStatus,
      })
    );
  };

  const onDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(task._id));
    }
  };

  return (
    <div
      className={`bg-gray-800 p-4 rounded-lg shadow-lg border-l-4 ${
        status === "Complete"
          ? "border-green-500 opacity-80"
          : "border-[#27c6d9]"
      } transition-all duration-300 hover:shadow-xl`}
    >
      {isEditing ? (
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-1 focus:ring-[#27c6d9]"
            required
            placeholder="Task title"
          />

          <textarea
            name="description"
            value={description}
            onChange={onChange}
            rows="2"
            className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-1 focus:ring-[#27c6d9]"
            placeholder="Description (optional)"
          />

          <input
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={onChange}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-1 focus:ring-[#27c6d9]"
          />

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-[#27c6d9] text-black rounded hover:bg-[#1fb8cc] transition font-medium"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <h3
              className={`text-lg font-medium ${
                status === "Complete"
                  ? "line-through text-gray-400"
                  : "text-white"
              }`}
            >
              {title}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-[#27c6d9] hover:text-[#1fb8cc] transition"
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                onClick={onDelete}
                className="text-red-500 hover:text-red-600 transition"
                title="Delete"
              >
                <FaTrash />
              </button>
              <button
                onClick={onStatusChange}
                className={
                  status === "Open"
                    ? "text-green-500 hover:text-green-600"
                    : "text-yellow-500 hover:text-yellow-600"
                }
                title={status === "Open" ? "Mark Complete" : "Mark Open"}
              >
                {status === "Open" ? <FaCheck /> : <FaTimes />}
              </button>
            </div>
          </div>

          {description && (
            <p
              className={`mt-2 text-sm ${
                status === "Complete"
                  ? "line-through text-gray-500"
                  : "text-gray-300"
              }`}
            >
              {description}
            </p>
          )}

          {dueDate && (
            <div
              className={`mt-3 text-xs ${
                status === "Complete" ? "text-gray-500" : "text-[#27c6d9]"
              } flex items-center`}
            >
              <span className="font-medium">Due:</span>
              <span className="ml-1">
                {new Date(dueDate).toLocaleDateString()}
              </span>
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between items-center">
            <span className="text-xs text-gray-400">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded ${
                status === "Complete"
                  ? "bg-green-900/30 text-green-400"
                  : "bg-[#27c6d9]/10 text-[#27c6d9]"
              }`}
            >
              {status}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
