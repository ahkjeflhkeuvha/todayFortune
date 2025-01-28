import React from "react";
import { useEffect, useState } from "react";
import Input from "./Input.tsx";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";

const cookies = new Cookies();

function InputForm({}) {
  const fields = ["name", "birthday", "time"];
  const [cookies, setCookie] = useCookies(["userInfo"]);

  useEffect(() => {
    if (cookies.userInfo !== undefined) {
      console.log(cookies.userInfo["name"]);

      (document.getElementById(fields[0]) as HTMLInputElement).value =
        cookies.userInfo[fields[0]];
      (document.getElementById(fields[1]) as HTMLInputElement).value =
        cookies.userInfo[fields[1]];
      (document.getElementById(fields[2]) as HTMLInputElement).value =
        cookies.userInfo[fields[2]];
    }
  }, [cookies.userInfo]);

  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    time: "",
  });

  const onChange = (fieldName: string, value: string) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    let data = await getMessage();
    console.log(data);

    let inputedData = {
      name: formData.name,
      birthday: formData.birthday,
      time: formData.time,
    };
  };

  const getMessage = async () => {
    try {
      const response = await axios.post("http://localhost:3000/test", {
        name: formData.name,
        birthday: formData.birthday,
        time: formData.time,
      });
      return response.data.result;
    } catch (error) {
      console.error("API 요청 실패:", error.response || error.message);
      return "API 호출 실패";
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {fields.map((field, i) => (
        <Input
          key={i}
          fieldName={field}
          value={formData[field]}
          onChange={onChange}
        />
      ))}

      <button type="submit">button</button>
    </form>
  );
}

export default InputForm;
