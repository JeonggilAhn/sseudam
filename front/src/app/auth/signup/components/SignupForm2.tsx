import React from "react";

type SignupForm2Props = {
  mobileCarrier: string;
  phoneNumber: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: string };
};

const SignupForm2: React.FC<SignupForm2Props> = ({
  mobileCarrier,
  phoneNumber,
  onChange,
  errors = {},
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
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
      </div>
    </>
  );
};

export default SignupForm2;
