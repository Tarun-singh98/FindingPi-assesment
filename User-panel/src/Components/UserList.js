import React, { useState, useEffect } from "react";
import UserData from "./UserData";
import "./UserList.css";
import axios from "axios";
import Header from "./Header";

// add the isChecked and isEdited to perfrom action on checkbox and edit user
const addIsCheckEdit = (users) => {
  const addedIscheckedEdited = users.map((user) => {
    return { ...user, isChecked: false, isEdited: false };
  });

  return addedIscheckedEdited;
};

const isValidInput = (editObject) => {
  const name =
    editObject.name.title +
    " " +
    editObject.name.first +
    " " +
    editObject.name.last;
  if (
    name !== "" &&
    editObject.email !== "" &&
    editObject.gender !== "" &&
    editObject.dob.age !== ""
  ) {
    if (name.length < 5) {
      alert("Name must be at least 5 characters long");
    } else if (!editObject.email.match(/.+@+.+\.[com|in|org]+$/)) {
      alert("Enter a valid email id. Ex: 'example@xmail.com'");
    } else if (
      editObject.gender.toLowerCase() === "male" ||
      editObject.gender.toLowerCase() === "female"
    ) {
      return true;
    } else {
      alert(`Gender must be "Male" or "Female"`);
    }
    if (editObject.dob.age > 0 && editObject.dob.age < 100) {
      return true;
    } else {
      alert(`Age must be "0" to "100"`);
    }
  } else {
    alert("Input fields must be filled out");
  }
  return false;
};

export default function UserList() {
  const [userData, setUserData] = useState([]);
  // eslint-disable-next-line
  const [debounceTimer, setDebounceTimer] = useState(0);
  const [editObject, setEditObject] = useState({});
  const [seachText, setSearchText] = useState("");
  const [editFlag, setEditFlag] = useState(false);
  let persistedUserData;

  //Fetch the given Api
  const fetchApi = async () => {
    try {
      let response = await axios.get("https://randomuser.me/api/?results=5");
      const postUserData = addIsCheckEdit(response.data.results);
      setUserData(postUserData);
      localStorage.setItem("userData", JSON.stringify(postUserData));
    } catch (error) {
      console.log(error);
    }
  };
  //Initially to execute the the fetch Api call
  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line
  }, []);

  // handle restore data by calling the api whenever user clicks on restore button
  const handleRestore = () => {
    fetchApi();
    setSearchText("");
  };

  //handle delete user by removing the user from user list

  const handleDelete = (email) => {
    persistedUserData = JSON.parse(localStorage.getItem("userData"));
    const updatedUserData = persistedUserData.filter(
      (user) => user.email !== email
    );
    setUserData(updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    setSearchText("");
    setEditFlag(false);
  };

  //handle user edit click and set the clicked user data to individual user object

  const handleIsEdited = (email) => {
    if (!editFlag) {
      const upadatedUserData = userData.map((user) => {
        if (user.email === email) {
          setEditObject({ ...user, isEdited: true });
          return { ...user, isEdited: true };
        }
        return user;
      });
      setEditFlag(true);
      setUserData(upadatedUserData);
    }
  };

  //handle save to get edited data saved to the actual user data
  const handleSaveEdited = (email) => {
    if (isValidInput(editObject)) {
      persistedUserData = JSON.parse(localStorage.getItem("userData"));
      const editedUserData = persistedUserData.map((user) => {
        if (user.email === email) {
          return { ...editObject, isEdited: false };
        }
        return user;
      });
      setUserData(editedUserData);
      localStorage.setItem("userData", JSON.stringify(editedUserData));
      setEditObject({});
      setEditFlag(false);
      alert("Saved successfully");
    }
  };

  //handle cancel to store unEdited data
  const handleCancelEdited = (email) => {
    const unEditedUserData = userData.map((user) => {
      if (user.email === email) {
        return { ...user, isEdited: false };
      }
      return user;
    });
    setUserData(unEditedUserData);
    setEditObject({});
    setEditFlag(false);
  };

  //search the input text entered by user
  const searchInputText = (text) => {
    if (text.length) {
      const searchedUserData = userData?.filter((user) => {
        return (
          user.name.title.toLowerCase() === text.toLowerCase() ||
          user.name.first.toLowerCase() === text.toLowerCase() ||
          user.name.last.toLowerCase() === text.toLowerCase()
        );
      });

      if (searchedUserData.length) {
        setUserData(searchedUserData);
      } else {
        alert("No user found");
        setSearchText("");
        setUserData(JSON.parse(localStorage.getItem("userData")));
      }
    } else {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    }
  };

  //debounce search to optimize perfromance

  const debounceSearch = (eventInput, debounceTimeOut) => {
    if (debounceTimer !== 0) {
      clearTimeout(debounceTimer);
    }

    const timerId = setTimeout(
      () => searchInputText(eventInput),
      debounceTimeOut
    );
    setDebounceTimer(timerId);
  };

  //handle input text search using debouncing
  const handleSearchChange = (inputText) => {
    if (editObject.isEdited === true) {
      alert(
        "Can not search while editing. Please save or cancel the edited changes!"
      );
    } else {
      setSearchText(inputText);
      debounceSearch(inputText, 1000);
    }
  };

  //single checkbox selection to select and unselect the user
  const handleIsCheckedSingle = (userId) => {
    const updateIsChecked = userData.map((user) => {
      if (user.id === userId) {
        return { ...user, isChecked: !user.isChecked };
      }
      return user;
    });
    setUserData(updateIsChecked);
  };

  return (
    <div>
      <Header
        handleRestore={handleRestore}
        seachText={seachText}
        handleSearchChange={handleSearchChange}
      />
      <div className="table-container">
        <div className="table-row table-head">
          <div className="table-cell">
            <p>Name</p>
          </div>
          <div className="table-cell">
            <p>Email</p>
          </div>
          <div className="table-cell">
            <p>Gender</p>
          </div>
          <div className="table-cell">
            <p>Age</p>
          </div>
          <div className="table-cell">
            <p>Action</p>
          </div>
        </div>
      </div>
      <div>
        <UserData
          userData={userData}
          handleDelete={handleDelete}
          handleIsEdited={handleIsEdited}
          handleIsCheckedSingle={handleIsCheckedSingle}
          editObject={editObject}
          handleEditObject={setEditObject}
          handleSaveEdited={handleSaveEdited}
          handleCancelEdited={handleCancelEdited}
        />
      </div>
    </div>
  );
}
