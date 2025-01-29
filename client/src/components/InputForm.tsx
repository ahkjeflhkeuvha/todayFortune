import React from "react";
import { useEffect, useState } from "react";
import Input from "./Input.tsx";
import Select from "./Select.tsx";
import Calendar from "./Calendar.tsx";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";

const cookies = new Cookies();

function InputForm({}) {
  const fields = ["name", "birthday", "time"];
  const [cookies, setCookie] = useCookies(["userInfo"]);
  const options = [
    "자시(子時) 23:30-01:29",
    "축시(丑時) 01:30-03:29",
    "인시(寅時) 03:30-05:29",
    "묘시(卯時) 05:30-07:29",
    "진시(辰時) 07:30-09:29",
    "사시(巳時) 09:30-11:29",
    "오시(午時) 11:30-13:29",
    "미시(未時) 13:30-15:29",
    "신시(申時) 15:30-17:29",
    "유시(酉時) 17:30-19:29",
    "술시(戌時) 19:30-21:29",
    "해시(亥時) 21:30-23:29",
  ];

  useEffect(() => {
    if (cookies.userInfo !== undefined) {
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
    setCookie("userInfo", inputedData);
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
      <Input fieldName={fields[0]} value={formData.name} onChange={onChange} />

      <Calendar
        fieldName={fields[1]}
        value={formData.birthday}
        onChange={onChange}
      />

      <Select
        fieldName={fields[2]}
        value={formData.time}
        onChange={onChange}
        options={options}
      />

      <button type="submit">button</button>
    </form>
  );
}

export default InputForm;
