import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import "./UserData.css";

const UserData = ({
  userData,
  handleDelete,
  handleIsEdited,
  editObject,
  handleEditObject,
  handleSaveEdited,
  handleCancelEdited,
}) => {
  return userData?.map((user) => {
    return (
      <div
        className="table-row"
        key={user.email}
        style={{
          height: "44px",
        }}
      >
        {user.isEdited ? (
          <>
            <div className="table-cell">
              <p>
                <input
                  type="text"
                  value={editObject.name.title + " " + editObject.name.first + " " + editObject.name.last}
                  onChange={(event) =>
                    handleEditObject({
                      ...editObject,
                      name: event.target.value,
                    })
                  }
                  placeholder="Enter your name"
                  className="edit-name"
                />
              </p>
            </div>
            <div className="table-cell">
              <p>
                <input
                  type="email"
                  value={editObject.email}
                  onChange={(event) =>
                    handleEditObject({
                      ...editObject,
                      email: event.target.value,
                    })
                  }
                  placeholder="Enter your email"
                  className="edit-email"
                />
              </p>
            </div>
            <div className="table-cell">
              <p>
                <input
                  type="text"
                  value={editObject.gender}
                  onChange={(event) =>
                    handleEditObject({
                      ...editObject,
                      gender: event.target.value,
                    })
                  }
                  placeholder="Enter your gender"
                  className="edit-role"
                />
              </p>
            </div>
            <div className="table-cell">
              <p>
                <input
                  type="text"
                  value={editObject.dob.age}
                  onChange={(event) =>
                    handleEditObject({
                      ...editObject,
                      age: event.target.dob.age.value,
                    })
                  
                  }
                  placeholder="Enter your age"
                  className="edit-role"
                />
              </p>
            </div>
            <div className="table-cell">
              <p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <button
                    type="button"
                    className="save-button"
                    onClick={() => handleSaveEdited(user.email)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => handleCancelEdited(user.email)}
                  >
                    Cancel
                  </button>
                </div>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="table-cell">
              <p style={{ textTransform: "capitalize" }}>
                {user.name.title + " " + user.name.first + " " + user.name.last}
              </p>
            </div>
            <div className="table-cell">
              <p>{user.email}</p>
            </div>
            <div className="table-cell">
              <p style={{ textTransform: "capitalize" }}>{user.gender}</p>
            </div>
            <div className="table-cell">
              <p style={{ textTransform: "capitalize" }}>{user?.dob?.age}</p>
            </div>
            <div className="table-cell">
              <p className="mobile-action">
                <EditOutlinedIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleIsEdited(user.email)}
                />
                <DeleteOutlineIcon
                  variant="outlined"
                  sx={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleDelete(user.email)}
                />
              </p>
            </div>
          </>
        )}
      </div>
    );
  });
};

export default UserData;
