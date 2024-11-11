import "./Main.css";
import { assets } from "../../assets/assets";
import { useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Main() {
  const apiKey = import.meta.env.GEMINI_API_KEY;
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [promptResponses, setPromptResponses] = useState([]);

  const genAI = new GoogleGenerativeAI(`${apiKey}`);
  const inputRef = useRef();

  const handleChange = (e) => {
    setContent(e.target.value);
    resizeTextArea();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (!event.shiftKey) {
        event.preventDefault();
        getResponseForGivenPrompt();
      }
    }
  };

  const resizeTextArea = () => {
    const textarea = inputRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const getResponseForGivenPrompt = async () => {
    try {
      setIsLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(content);
      const response = await result.response;
      const text = await response.text();
      setContent("");
      setImage(null);
      setIsLoading(false);
      setPromptResponses([...promptResponses, text]);
    } catch (error) {
      console.error("Something Went Wrong", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="main">
      {/* navBar */}
      <div className="nav">
        {/* navBar -Left */}
        <p>Gemini</p>
        {/* navBar -Right*/}
        <div className="user">
          <div className="gemini-advance">
            <img
              className="color-gemini"
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "40px",
              }}
              src={assets.gemini_sparkle_red}
              alt=""
            />
            <p style={{ paddingRight: "10px" }}>Try Gemini Advanced</p>
          </div>
          <img className="user-img" src={assets.user_icon} alt="" />
        </div>
      </div>
      {/* navBar --end */}

      {/* Main-container */}
      <div className="main-container">
        {promptResponses.length === 0 ? (
          <>
            <div className="greet">
              <span>Hello, YOGESH</span>
              <p>How can I help you today?</p>
            </div>

            {/* cards start */}
            <div className="cards">
              <div className="card">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Rerum, adipisci.
                </p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>
                  Excepturi vitae aperiam rem quis maiores deleniti non
                  distinctio cum qui nam.
                </p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>
                  Aspernatur sapiente et natus dicta repellendus aperiam sit
                </p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>
                  Amet consectetur adipisicing elit. Quae, expedita? Earum modi
                  quasi officiis
                </p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
            {/* cards end */}
          </>
        ) : isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="response-container">
            {promptResponses.map((promptResponse, index) => (
              <div key={index} className="response-card">
                <div className="response-text">{promptResponse}</div>
              </div>
            ))}
          </div>
        )}

        {/* FOOTER */}
        <footer className="footer">
        {image && (
            <div className="image-preview">
              <img src={image} alt="Preview" />
            </div>
          )}
          <div className="chat">
            <textarea
              className="input"
              onKeyPress={handleKeyPress}
              onChange={handleChange}
              value={content}
              ref={inputRef}
              rows={1}
              placeholder="Enter a prompt here"
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <img src={assets.add_photo_alternate} alt="Upload" />
            </label>
            <img src={assets.mic} alt="" />
            {content ? (
              <img
                onClick={getResponseForGivenPrompt}
                src={assets.send_icon}
                alt=""
              />
            ) : null}
          </div>
    
          <div className="privacy">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.
            <a href="https://support.google.com/gemini?p=privacy_notice">
              Your privacy & Gemini Apps
            </a>
          </div>
        </footer>
      </div>
      {/* main-container --end */}
    </div>
  );
}
