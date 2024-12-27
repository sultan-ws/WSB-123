import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddPCategory = () => {
  const nav = useNavigate();
  const [parentCategories, setParentCategories] = useState([]);
  const [imgPre, setImgPre] = useState('');

  const readParentCategories = () => {
    axios.get(`${process.env.REACT_APP_API_URL}parent-category/active-categories`)
      .then((response) => {
        // console.log(response.data);
        setParentCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => { readParentCategories() }, []);

  const handleCreateCategory = (e) => {
    e.preventDefault();

    if (e.target.parentCategory.value === 'default') return Swal.fire("Please select parent category!");

    axios.post(`${process.env.REACT_APP_API_URL}product-category/create-category`, e.target)
      .then((response) => {
        console.log(response.data);

        let timerInterval;
        Swal.fire({
          title: "Category added!",
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
            nav('/dashboard/products/view-category');
          }
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handlePreview = (e)=>{
    setImgPre(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        Add Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleCreateCategory}>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              id="categoryName"
              placeholder="Category Name"
              className="input border p-1 w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              id="categoryName"
              placeholder="Category Slug"
              className="input border p-1 w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Category Image
            </label>
            <input
              type="file"
              name="thumbnail"
              id="categoryImg"
              className="input border w-full rounded-[5px] my-[10px] category"
              onChange={handlePreview}
            />
            {
              imgPre
               &&
              (<img src={imgPre} className="w-[150px]" />)
            }
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Parent Category
            </label>
            <select name="parentCategory" id="" className="border w-full p-2 rounded-[5px] my-[10px] category input">
              <option value='default'> --- Select Parent Category --- </option>
              {
                parentCategories.map((category, index) => (<option value={category._id} key={index}>{category.name}</option>))
              }

            </select>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Category Description
            </label>
            <textarea
              type="file"
              name="description"
              id="categoryDesc"
              className="input border w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="categoryStatus"
              className=" text-[#303640] mr-[20px]"
            >
              Featured
            </label>
            <input
              type="radio"
              name="isFeatured"
              id="categoryStatus"
              value={true}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Yes</span>
            <input
              type="radio"
              name="isFeatured"
              id="categoryStatus"
              value={false}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>No</span>
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="categoryStatus"
              className=" text-[#303640] mr-[20px]"
            >
              Status
            </label>
            <input
              type="radio"
              name="status"
              id="categoryStatus"
              value={true}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="categoryStatus"
              value={false}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[20px] ">
            <button type="submit" className="bg-[#5351c9] rounded-md text-white w-[100px] h-[35px]">
              Add Size
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPCategory;

