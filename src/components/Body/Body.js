import React, { useState } from "react";
import Select from "./Select";
import axios from "axios";

const Body = () => {
  const [inputLanguage, setInputLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("bn");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };
  const handleTranslate = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", inputLanguage);
    encodedParams.set("target_language", targetLanguage);
    encodedParams.set("text", inputText);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      const unescapedText = JSON.parse(
        `"${response.data.data.translatedText}"`
      );
      setOutputText({ translatedText: unescapedText });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="w-11/12 md:w-8/12 mx-auto mt-4 md:mt-16">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="shadow-2xl rounded-2xl p-2">
          <h1 className="text-center mb-4 text-xl font-semibold">
            Input language
          </h1>
          <div className="w-full flex flex-col gap-2">
            <Select value={inputLanguage} setvalue={setInputLanguage} />
            <textarea
              className="textarea textarea-primary w-full h-48 text-lg"
              placeholder="Enter text..."
              value={inputText}
              onChange={handleTextChange}
            ></textarea>
          </div>
        </div>
        <div className="shadow-2xl rounded-2xl p-2">
          <h1 className="text-center mb-4 text-xl font-semibold">
            Output language
          </h1>
          <div className="w-full flex flex-col gap-2">
            <Select value={targetLanguage} setvalue={setTargetLanguage} />

            <textarea
              className="textarea textarea-primary w-full h-48 text-lg"
              placeholder="Translation..."
              value={outputText.translatedText}
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
      <div className="w-fit mx-auto mt-3">
        <button onClick={handleTranslate} className="btn btn-primary text-lg">
          Translate
        </button>
      </div>
    </div>
  );
};

export default Body;
