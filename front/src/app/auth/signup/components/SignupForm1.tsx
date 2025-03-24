import React from "react";

type SignupForm1Props = {
  name: string;
  birth: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: string };
};

const SignupForm1: React.FC<SignupForm1Props> = ({
  name,
  birth,
  onChange,
  errors = {},
}) => {
  return (
    <>
      <div>
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onChange}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="birth">생년월일</label>
          <input
            type="date"
            name="birth"
            id="birth"
            value={birth}
            onChange={onChange}
          />
          {errors.birth && (
            <p className="text-red-500 text-xs">{errors.birth}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SignupForm1;
