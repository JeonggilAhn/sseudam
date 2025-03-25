"use client";
import React, { useState } from "react";

type SignupForm2Props = {
  mobileCarrier: string;
  phoneNumber: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: string };
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const SignupFormInfo2: React.FC<SignupForm2Props> = ({
  mobileCarrier,
  phoneNumber,
  onChange,
  errors = {},
  onBlur,
}) => {
  return (
    <>
      <div>
        <div>
          <label htmlFor="mobileCarrier">통신사</label>
          <input
            type="text"
            name="mobileCarrier"
            id="mobileCarrier"
            value={mobileCarrier}
            onChange={onChange}
            onBlur={onBlur}
          />
          {errors.mobileCarrier && (
            <p className="text-red-500 text-xs">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="phoneNumber">휴대폰 번호</label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
            onBlur={onBlur}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
      </div>
    </>
  );
};

const SignupForm2 = () => {
  const [Signup2Data, setSignup2Data] = useState({
    mobileCarrier: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleForm2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignup2Data((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === "mobileCarrier" && value.trim() === "") {
      errorMessage = "통신사를 선택해주세요.";
    }

    if (name === "phoneNumber" && value.trim() === "") {
      errorMessage = "전화번호를 입력해주세요.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };
  return (
    <div>
      <SignupFormInfo2
        mobileCarrier={Signup2Data.mobileCarrier}
        phoneNumber={Signup2Data.phoneNumber}
        onChange={handleForm2Change}
        errors={errors}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default SignupForm2;

// ---------------
// "use client";
// import React, { useState } from "react";

// type SignupForm1Props = {
//   name: string;
//   birth: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   errors: { [key: string]: string };
//   onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
// };

// const SignupFormInfo1: React.FC<SignupForm1Props> = ({
//   name,
//   birth,
//   onChange,
//   errors = {},
//   onBlur,
// }) => {
//   return (
//     <>
//       <div>
//         <div>
//           <label htmlFor="name">이름</label>
//           <input
//             type="text"
//             name="name"
//             id="name"
//             value={name}
//             onChange={onChange}
//             onBlur={onBlur}
//           />
//           {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
//         </div>
//         <div>
//           <label htmlFor="birth">생년월일</label>
//           <input
//             type="date"
//             name="birth"
//             id="birth"
//             value={birth}
//             onChange={onChange}
//             onBlur={onBlur}
//           />
//           {errors.birth && (
//             <p className="text-red-500 text-xs">{errors.birth}</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// const SignupForm1 = () => {
//   const [Signup1Data, setSignup1Data] = useState({
//     name: "",
//     birth: "",
//   });

//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   const handleForm1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setSignup1Data((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     let errorMessage = "";

//     if (name === "name" && value.trim() === "") {
//       errorMessage = "이름을 입력해주세요.";
//     }

//     if (name === "birth" && value.trim() === "") {
//       errorMessage = "생년월일을 입력해주세요.";
//     }

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: errorMessage,
//     }));
//   };

//   return (
//     <div>
//       <SignupFormInfo1
//         name={Signup1Data.name}
//         birth={Signup1Data.birth}
//         onChange={handleForm1Change}
//         errors={errors}
//         onBlur={handleBlur}
//       />
//     </div>
//   );
// };

// export default SignupForm1;
