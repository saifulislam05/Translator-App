import React from "react";
import languageData from "../../Data/languageData.json";

const Select = ({ value,setvalue }) => {

  return (
    <select
      className="select select-primary w-full"
      value={value}
      onChange={(e)=>setvalue(e.target.value)}
    >
      {languageData.map((item, index) => (
        <option key={index} value={item.langCode}>
          {item.language}
        </option>
      ))}
    </select>
  );
};

export default Select;
