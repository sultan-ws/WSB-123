import React, { useEffect, useState } from "react";
import { RiFacebookFill } from "react-icons/ri";
import { CiInstagram } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Profile() {
  const nav = useNavigate();

  const [show, setShow] = useState(false);
  const [admin, setAdmin] = useState({data:{}});
  const [previews, setPreviews] = useState({});

   useEffect(()=>{
    setAdmin(JSON.parse(sessionStorage.getItem('admin')));

    console.log(JSON.parse(sessionStorage.getItem('admin')));
    },[]);

    const handlePreview = (e)=>{
      const { name, files } = e.target;

      setPreviews({...previews, [name]: URL.createObjectURL(files[0])});
    }

    const updateAdmin = (e)=>{
      e.preventDefault();
      axios.put(`${process.env.REACT_APP_API_URL}admin/update-admin`, e.target)
      .then((response)=>{
        console.log(response.data);

        sessionStorage.removeItem('admin');
        nav('/');
      })
      .catch((error)=>{
        console.log(error);
        });
    }
  return (
    <div>
      <div className="w-[90%] mx-auto mt-[140px] mb-[20px] bg-white border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Profile
        </span>
        <div className="w-full grid grid-cols-[2fr_2fr]">
          <div className="p-[10px]">
            <form method="post" onSubmit={updateAdmin}>
            <div className="flex flex-col justify-center p-[10px] box-border items-center gap-[10px]">
            <div className="border border-slate-300 w-[180px] h-[180px] rounded-[50%] object-contain">
              <img
                src={ previews.profile || admin.data.profile || '/profile.jpg'}
                alt="profile img"
                className="w-full h-full rounded-[50%]"
              />
            </div>
            <span className="block text-center">Profile Image</span>
            <input
                  type="file"
                  onChange={handlePreview}
                  name="profile"
                 
                  className="w-full border rounded-[5px] p-2 input"
                />
          </div>
              <div className="w-full ">
                <span className="block m-[15px_0]">Name</span>
                <input
                  type="text"
                 onChange={(e)=> setAdmin({...admin, name: e.target.value})}
                  name="name"
                  value={admin.data.name}
                  className="w-full border h-[35px] rounded-[5px] p-2 input"
                />
              </div>
              <div className="w-full ">
                <span className="block m-[15px_0]">Social Link</span>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <RiFacebookFill />
                  </span>
                  <input
                    type="text"
                    onChange={(e)=> setAdmin({...admin, name: e.target.fb})}
                    value={admin.data.fb}
                  name="fb"
                 
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <CiInstagram />
                  </span>
                  <input
                    type="text"
                    onChange={(e)=> setAdmin({...admin, name: e.target.instagram})}
                    value={admin.data.instagram}
                  name="instagram"
                 
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <FaYoutube />
                  </span>
                  <input
                    type="text"
                    onChange={(e)=> setAdmin({...admin, name: e.target.youtube})}
                    value={admin.data.youtube}
                  name="youtube"
                  
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <FaXTwitter />
                  </span>
                  <input
                    type="text"
                    onChange={(e)=> setAdmin({...admin, name: e.target.twitter})}
                    value={admin.data.twitter}
                  name="twitter"
                  
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Logo</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img src={ previews.logo || admin.data.logo} alt="Logo" className="w-full h-full" />
                </div>
                <input
                  type="file"
                  name="logo"
                  className="input border w-full m-[10px_0] category"
                 onChange={handlePreview}
                />
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Fav Icon</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img
                    src={ previews.favicon || admin.data.favicon}
                    alt="favicon"
                    className="w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  name="favicon"
                  onChange={handlePreview}
                  className="input border w-full m-[10px_0] category"
                />
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Footer Logo</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img
                   src={previews.footer_icon || admin.data.footer_icon}
                    alt="footer_icon"
                    className="w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  name="footer_icon"
                  className="input border w-full m-[10px_0] category"
                 onChange={handlePreview}
                />
              </div>
              <div className="w-full my-[20px] relative ">
                <span className="block m-[15px_0]">Password</span>
                <input
                  type={show === false ? "password" : "text"}
                  
                  name="password"
                  onChange={(e)=> setAdmin({...admin, password: e.target.password})}
                   value={admin.data.password}
                  className="w-full border h-[35px] rounded-[5px] p-2 input"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-[20px] bottom-[10px] cursor-pointer text-[#303640]"
                >
                  {show === false ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <button type="submit" className="w-[150px] h-[40px] rounded-md text-white bg-[#5351c9] my-[30px]">
                Update
              </button>
            </form>
          </div>
          
        </div>
      </div>
      <div className="mb-[80px] w-[90%] mx-auto border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Update Email
        </span>
        <div className="w-full p-[30px]">
          <form method="post">
            <div className="w-full mb-[10px]">
              <span className="block m-[15px_0]">Current Email</span>
              <input
                type="email"
                
                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
            </div>
            <div className="w-full mb-[10px]">
              <span className="block m-[15px_0]">OTP</span>
              <input
                type="text"
                placeholder="Enter OTP"
                name='userotp'
               
                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
              <input
                type="text"
                placeholder="Enter new email"
                name='newemail'
                
                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
            </div>
            <button
              type="button"
              
              className={`w-[150px] h-[40px] rounded-md text-white  my-[30px]`}>
              {'otpBtnText'}
            </button>

            <button
             
              type="button"
             
              className={`w-[150px] block h-[40px] rounded-md text-white bg-[#5351c9]  my-[30px]`}>
              Update Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
