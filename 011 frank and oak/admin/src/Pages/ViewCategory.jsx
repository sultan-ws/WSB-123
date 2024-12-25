import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdRestore } from "react-icons/md";
import { Link } from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import Swal from "sweetalert2";
import { IoTrashBin } from "react-icons/io5";
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'800px'
  },
};

const ViewCategory = () => {
  let [show1, setShow1] = useState(false);
  let [show2, setShow2] = useState(false);
  let [show3, setShow3] = useState(false);
  let [show4, setShow4] = useState(false);

  const [categories, setCategories] = useState([]);
  const [deletedcategories, setDeletedCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [ifAllChecked, setIfALlChecked] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const readCategories = () => {
    axios.get(`http://localhost:4200/api/admin-panel/parent-category/read-categories`)
      .then((response) => {
        // console.log(response.data);
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const readDeletedCategories = ()=>{
    axios.get(`http://localhost:4200/api/admin-panel/parent-category/deleted-categories`)
      .then((response) => {
        console.log(response.data);
        setDeletedCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => { 
    readCategories();
    readDeletedCategories();
   }, []);

  const handleUpdateStatus = (e) => {
    const status = (e.target.textContent !== 'Active');

    axios.put(`http://localhost:4200/api/admin-panel/parent-category/update-category-status/${e.target.value}`, { status })
      .then((response) => {
        // console.log(response.data);
        readCategories();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Status Updated",
          showConfirmButton: false,
          timer: 500
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeletecategory = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`http://localhost:4200/api/admin-panel/parent-category/delete-category/${id}`)
          .then((response) => {
            readCategories();

            Swal.fire({
              title: "Deleted!",
              text: "The category has been deleted.",
              icon: "success"
            });
          })
          .catch((error) => {
            console.log(error);
          });


      }
    });
  }

  const handleCheckCategory = (e) => {
    if (e.target.checked) return setCheckedCategories([...checkedCategories, e.target.value]);

    setCheckedCategories(checkedCategories.filter((category) => category !== e.target.value));
  }

  const handleAllCheck = (e) => {
    if (e.target.checked) {
      setCheckedCategories(categories.map((category) => category._id));
      setIfALlChecked(true);
      return
    }
    setCheckedCategories([]);
    setIfALlChecked(false);
  }

  useEffect(() => {
    setIfALlChecked(categories.length === checkedCategories.length && categories.length !== 0);
  }, [categories, checkedCategories]);

  const handleDeleteCategories = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Selected categories will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axios.put(`${process.env.REACT_APP_API_URL}parent-category/delete-categories`, { categories: checkedCategories })
          .then((response) => {
            readCategories();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
          })

      }
    });
  }

  const handleRestoreCategory = (id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You want to restore this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Restore it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Restored!",
          text: "Your category has been restored.",
          icon: "success"
        });
      }
    });
  }


  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="flex justify-between h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        <span>
          View Category
        </span>
        <span className="h-100 w-[100px] grid place-items-center">
          <IoTrashBin className="text-[red] cursor-pointer" onClick={()=>setIsOpen(true)} />
        </span>
      </span>


      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button
                  className="bg-red-400 rounded-sm px-2 py-1"
                  onClick={handleDeleteCategories}
                >Delete</button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  onClick={handleAllCheck}
                  className="accent-[#5351c9]"
                  checked={ifAllChecked}
                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <Tooltip id="my-tooltip" />

            {
              categories.map((category, index) => (
                <tr key={index} className="border-b">
                  <td>
                    <input
                      type="checkbox"
                      name="delete"
                      id="delete1"
                      value={category._id}
                      onClick={handleCheckCategory}
                      className="accent-[#5351c9] cursor-pointer"
                      checked={checkedCategories.includes(category._id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td className="w-[200px] flex-wrap p-1">
                    {category.description}
                    <span
                      onClick={() => setShow1(!show1)}
                      className={
                        show1 === true ? "hidden" : "font-bold cursor-pointer"
                      }
                    >
                      ...Read
                    </span>
                    {show1 === false ? (
                      " "
                    ) : (
                      <span>
                        Deserunt nam est delectus itaque sint harum architecto.
                      </span>
                    )}
                  </td>
                  <td>
                    <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" onClick={() => { handleDeletecategory(category._id) }} />{" "}
                    |{" "}
                    <Link to={`/dashboard/category/update-category/${category._id}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td>
                    <button
                      value={category._id}
                      onClick={handleUpdateStatus}
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={(category.status) ? 'Click to Inactive' : 'Click to Active'}
                      className={`p-[4px_10px] rounded-sm ${(category.status) ? 'bg-green-400' : 'bg-red-500'}  text-white w-[100px]`}
                    >
                      {
                        (category.status) ? 'Active' : 'Inactive'
                      }
                    </button>
                  </td>
                </tr>
              ))
            }




          </tbody>
         
        </table>

        <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={()=> setIsOpen(false)}
            style={customStyles}
            contentLabel="Example Modal"
          >
             <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button
                  className="bg-red-400 rounded-sm px-2 py-1"
                >Delete</button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  className="accent-[#5351c9]"
                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <Tooltip id="my-tooltip" />

            {
              deletedcategories.map((category, index) => (
                <tr key={index} className="border-b">
                  <td>
                    <input
                      type="checkbox"
                      name="delete"
                      id="delete1"
                      className="accent-[#5351c9] cursor-pointer"
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td className="w-[200px] flex-wrap p-1">
                    {category.description}
                    <span
                      onClick={() => setShow1(!show1)}
                      className={
                        show1 === true ? "hidden" : "font-bold cursor-pointer"
                      }
                    >
                      ...Read
                    </span>
                    {show1 === false ? (
                      " "
                    ) : (
                      <span>
                        Deserunt nam est delectus itaque sint harum architecto.
                      </span>
                    )}
                  </td>
                  <td>
                    <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                    |{" "}

                    <MdRestore className="my-[5px] text-green-500 cursor-pointer inline" onClick={()=>{handleRestoreCategory(category._id)}} />

                  </td>
                </tr>
              ))
            }




          </tbody>
         
        </table>
          </Modal>
      </div>
    </div>
  );
};

export default ViewCategory;
