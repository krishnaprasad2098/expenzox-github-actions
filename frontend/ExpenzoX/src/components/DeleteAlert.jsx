import React from 'react'

const DeleteAlert = ({content, onDelete,title}) => {
  return (
    <div>
      {/* <p className="text-sm">{title}</p> */}
      <p className="text-sm">{content}</p>

      <div className="flex justify-start mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>

    </div>
  );
};

export default DeleteAlert