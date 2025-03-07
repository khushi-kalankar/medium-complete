import { Link, useNavigate } from "react-router-dom";

import { ChangeEvent, useState } from "react";
import { SigninInput } from "@khushi-kalankar/common";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SigninInput>({
    username: "",
    password: "",
  });

  async function sendRequest(){
    try {
        console.log('request body: ', postInputs);
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type ==="signup"?"signup": "signin" }`,postInputs,
          {
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
        const jwt = response.data.jwt;
        localStorage.setItem("token",jwt);
        navigate("/blogs")
    } catch (error) {
        
    }
    
  }
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-gray-400 ">
              {type ==="signin"? "Don't have an account?" : "Already have an account?"}
              <Link className="underline" to={type=== "signup"?"/signin" : "/signup"}>
                {
                    type === "signin"? "Sign Up" : "Sign in"
                }
              </Link>
            </div>
          </div>
          <div className="pt-4">
            {/* {type=== "signup"?<LabelledInput
              label="Name"
              placeholder="Khushi Kalankar..."
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            /> :null} */}
            <LabelledInput
              label="Username"
              placeholder="khushi@gmail.com..."
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  username: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type={"password"}
              placeholder="..."
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mt-9">{type === "signup"? "Sign up": "Sign in"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-bold pt-2">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}
