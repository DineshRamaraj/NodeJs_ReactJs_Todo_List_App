import React, { useState, useRef } from "react";

const OTPVerification = ({ length = 4, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    // Allow only numeric input
    if (!/^\d$/.test(value) && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange && onChange(newOtp.join("")); // Pass OTP to parent component if needed

    // Move to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index) => {
    if (otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData
      .getData("text")
      .slice(0, length)
      .split("");
    const newOtp = Array(length).fill("");
    pasteData.forEach((char, i) => {
      if (/^\d$/.test(char)) {
        newOtp[i] = char;
      }
    });
    setOtp(newOtp);
    onChange && onChange(newOtp.join("")); // Pass OTP to parent component if needed

    // Focus the last filled input
    const lastFilledIndex =
      pasteData.length > length ? length - 1 : pasteData.length - 1;
    inputRefs.current[lastFilledIndex]?.focus();
  };

  return (
    <div className="otp-container min-h-[calc(100vh-50px)] flex justify-center items-center px-5 md:px-20 py-5">
      <div className="border border-slate-200 p-5 rounded-sm">
        <h1 className="text-center mb-5">OTP Verification</h1>
        <div className="flex gap-2">
          {otp.map((eachOTP, index) => (
            <input
              key={index}
              type="text"
              minLength={1}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => e.key === "Backspace" && handleBackspace(index)}
              onPaste={handlePaste}
              ref={(el) => (inputRefs.current[index] = el)}
              className="otp-input w-12 h-12 text-center text-lg border border-slate-500 rounded-md outline-none"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
