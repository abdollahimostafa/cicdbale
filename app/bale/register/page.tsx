"use client";

import { useEffect, useState } from "react";
import { useBale } from "@/hooks/useBale";
interface InquiryResponse {
  status: boolean;
  message: string;
  data: {
    user: {
      national_number: string;
      name: string;
      family: string;
      birth_date: string;
      gender: string;
    };
    insurance: {
      title: string;
      sepas_system_code: string;
      type: string;
    };
  };
}
const getBirthYear = (birthDate?: string) => {
  if (!birthDate) return "نامشخص";
  return birthDate.slice(0, 4); // first 4 characters
};
export default function RegisterPage() {
  const { user, ready, requestPhoneNumber } = useBale();

  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [nationalId, setNationalId] = useState("");
  const [inquiry, setInquiry] = useState<InquiryResponse["data"] | null>(null);
  const [loading, setLoading] = useState(false);

  const [registerError, setRegisterError] = useState<string | null>(null);
const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);

  // Request phone number on page load
  useEffect(() => {
    if (!ready) return;

    window.Bale?.WebApp.requestContact((granted, phone) => {
      if (granted && phone) {
        setPhoneNumber(phone);
        setPermissionError(null);
      } else {
        setPermissionError("برای ادامه لطفاً دسترسی به شماره تلفن خود را بدهید.");
      }
    });
  }, [ready]);

  const handleRetry = () => {
    requestPhoneNumber();
    window.Bale?.WebApp.requestContact((granted, phone) => {
      if (granted && phone) {
        setPhoneNumber(phone);
        setPermissionError(null);
      } else {
        setPermissionError("شما دسترسی به شماره تلفن خود را ندادید.");
      }
    });
  };

  const handleNextStep = () => setStep(2);

  const handleCheck = async () => {
    if (!nationalId) return;

    setLoading(true);
    try {
      const res = await fetch("https://www.medimedia.ir/api/v1/insurance/inquire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ national_code: nationalId }),
      });

      const data: InquiryResponse = await res.json();

      if (data.status && data.data) {
        setInquiry(data.data);
      } else {
        alert(data.message || "خطا در دریافت اطلاعات.");
      }
    } catch (err) {
      console.error(err);
      alert("خطا در اتصال به سرور.");
    } finally {
      setLoading(false);
    }
  };
const handleRegister = async () => {
  if (!user?.id) {
    setRegisterError("شناسه بله دریافت نشده است.");
    return;
  }
  if (!phoneNumber || !nationalId || !inquiry) {
    setRegisterError("اطلاعات ناقص است.");
    return;
  }

  setLoading(true);
  setRegisterError(null);

  try {
    const res = await fetch("/api/user/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        baleId: String(user.id),          // MUST be string
        phone: String(phoneNumber),
        nationalId: String(nationalId),
        firstName: inquiry.user.name ?? "",
        lastName: inquiry.user.family ?? "",
        gender: inquiry.user.gender ?? "",
        birthYear: inquiry.user.birth_date?.slice(0, 4) ?? "",
        insurance: inquiry.insurance?.title ?? "",
      }),
    });

    const data = await res.json();

    if (data.ok) {
      setRegisterSuccess(true);
      setTimeout(() => {
        window.location.href = "/gg";
      }, 1500);
    } else {
      setRegisterError(data.error || "ثبت نام انجام نشد، دوباره تلاش کنید.");
    }
  } catch (err) {
    console.error(err);
    setRegisterError("خطا در ارتباط با سرور.");
  } finally {
    setLoading(false);
  }
};




  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white  p-8 w-full max-w-md space-y-6">

        {/* Step 1: Phone number */}
        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-center text-2xl font-bold text-gray-700">شماره تماس شما</label>
            <span className="text-center block font-light text-xs">با تایید دسترسی  شماره  شما نمایش داده میشود</span>
            <input
              type="text"
              value={phoneNumber ?? ""}
              readOnly
              placeholder="شماره تلفن دریافت نشد"
              disabled
              className="w-full p-3 py-2 border-gray-300 border  text-center rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            {permissionError && (
              <div className="space-y-2">
                <p className="text-red-500 block text-center text-sm">{permissionError}</p>
                <button
                  onClick={handleRetry}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  درخواست دوباره
                </button>
              </div>
            )}

            {phoneNumber && (
              <button
                onClick={handleNextStep}
                className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
              >
                مرحله بعد
              </button>
            )}
          </div>
        )}

        {/* Step 2: National ID */}
{/* Step 2: National ID */}
        {step === 2 && !inquiry && (
          <div className="space-y-4 -mt-10">
            <label className="block text-center text-2xl font-bold text-gray-700">کد ملی شما</label>
            <span className="text-center block font-light text-xs">کدملی شما برای ثبت نسخ و همچنین احراز هویت بیمه استفاده خواهد شد</span>
            <input
              type="text"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              placeholder="کد ملی خود را وارد کنید"
              className="w-full pp-3 py-2 text-center border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            <button
              onClick={handleCheck}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "...در حال بررسی" : "بررسی"}
            </button>
          </div>
        )}

  {/* Step 3: Show inquiry info */}
{inquiry && (
  <div className="space-y-4 text-right">
    <h2 className="text-2xl block text-center font-semibold">اطلاعات کاربر</h2>

    <p>نام: {inquiry.user.name}</p>
    <p>نام خانوادگی: {inquiry.user.family}</p>
    <p>جنسیت: {inquiry.user.gender}</p>
    <p>سال تولد: {getBirthYear(inquiry.user.birth_date)}</p>
    <p>بیمه: {inquiry.insurance.title}</p>
    <p>شناسه یکتا بله: {user?.id}</p>

    {registerError && (
      <p className="text-red-500 text-center">{registerError}</p>
    )}

    {registerSuccess && (
      <p className="text-green-600 text-center">ثبت نام با موفقیت انجام شد!</p>
    )}

    <button
      onClick={handleRegister}
      disabled={loading || registerSuccess}
      className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-green-700 transition disabled:opacity-50"
    >
      {loading ? "در حال ثبت‌نام..." : "ثبت نام"}
    </button>

    <span className="text-center block font-light text-xs text-gray-500">
      با ثبت نام در مدی مدیا شما با قوانین و ضوابط سامانه موافق هستید
    </span>
  </div>
)}

      </div>
    </div>
  );
}
