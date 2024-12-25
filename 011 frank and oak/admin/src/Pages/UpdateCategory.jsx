import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCategory = () => {
  const {_id} = useParams();
  const nav = useNavigate();
  const [category, setCategory] = useState({});

  const readCategory = ()=>{
     axios.get(`${process.env.REACT_APP_API_URL}parent-category/read-category/${_id}`)
     .then((response)=>{
      console.log(response.data);
      setCategory(response.data.data[0]);
     })
     .catch((error)=>{
      console.log(error);
      })
  };

  useEffect(()=>{readCategory()},[_id]);

  const handleUpdateCategory = (e)=>{
    e.preventDefault();

    axios.put(`${process.env.REACT_APP_API_URL}parent-category/update-category/${_id}`, e.target)
    .then((response)=>{
      console.log("Category updated", response);
      let timerInterval;
              Swal.fire({
                title: "Category updated!",
                html: "You'll be redirect to view category page in <b></b> milliseconds.",
                timer: 800,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                  const timer = Swal.getPopup().querySelector("b");
                  timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                  }, 100);
                },
                willClose: () => {
                  clearInterval(timerInterval);
                }
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  nav('/dashboard/category/view-category');
                }
              });
    })
    .catch((error)=>{
      console.log("Error updating category", error);
    })
  };
 
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        Update Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleUpdateCategory}>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={category.name}
              id="categoryName"
              placeholder="Category Name"
              onChange={(e)=> setCategory({...category, name: e.target.value})}
              className="input border p-1 w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Category Description
            </label>
            <textarea
              type="file"
              name="description"
              id="categoryDesc"
              value={category.description}
              onChange={(e)=> setCategory({...category, description: e.target.value})}
              className="input border w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[20px] ">
            <button className="bg-[#5351c9] rounded-md text-white px-2 h-[35px]">
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
