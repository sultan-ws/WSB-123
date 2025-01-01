import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdatePCategory = () => {
  const {id}= useParams();
  const nav = useNavigate();
  const [parentCategories, setParentCategories] = useState([]);
  const [category, setCategory] = useState({parentCategory:{}});
  const [filePath, setFilepath] = useState('');
  const [preview, setPreview] = useState('');

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

  const fetchCategory = () => {
    axios.get(`${process.env.REACT_APP_API_URL}product-category/read-category/${id}`)
      .then((response) => {
        console.log("Category fetched", response.data);
        setCategory(response.data.data);
        setFilepath(response.data.filepath);
      })
      .catch((error) => {
        console.log("Error fetching categories", error);
      });
  };

  const handlePreview = (e)=>{
    const image = URL.createObjectURL(e.target.files[0]);
    setPreview(image);
  }

  useEffect(() => { fetchCategory(); },[id]);

  const handleUpdateCategory = (e)=>{
    e.preventDefault();

    if (e.target.parentCategory.value === 'default') return Swal.fire("Please select parent category!");

    axios.put(`${process.env.REACT_APP_API_URL}product-category/update-category/${id}`, e.target)
      .then((response) => {
        console.log(response.data);

        let timerInterval;
        Swal.fire({
          title: "Category Updated!",
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



  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        Update Product Category
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
              id="categoryName"
              placeholder="Category Name"
              className="input border p-1 w-full rounded-[5px] my-[10px]"
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
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
              value={category.slug}
              onChange={(e) => setCategory({ ...category, slug: e.target.value })}
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

            <div>
              <img src={ preview || filePath + category.thumbnail} alt="category image" className="w-[100px]" />
            </div>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Parent Category
            </label>
            <select 
            value={category.parentCategory._id}
            name="parentCategory" 
            id="" 
            className="border w-full p-2 rounded-[5px] my-[10px] category input">
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
              value={category.description}
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
            />
          </div>
          <div className="w-full my-[20px] ">
            <button type="submit" className="bg-[#5351c9] rounded-md text-white px-2 h-[35px]">
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePCategory;
