"use client";

import { useEffect, useState } from "react";
import { useBale } from "@/hooks/useBale";

export default function RegisterPage() {
  const { user, ready, requestPhoneNumber } = useBale();

  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [nationalId, setNationalId] = useState("");

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

  const handleCheck = () => {
    console.log("National ID:", nationalId);
    // TODO: send national ID to backend along with Bale user info
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
                <p className="text-red-500 text-sm">{permissionError}</p>
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
        {step === 2 && (
          <div className="space-y-4">
            <label className="block font-medium text-gray-700">کد ملی:</label>
            <input
              type="text"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              placeholder="کد ملی خود را وارد کنید"
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            <button
              onClick={handleCheck}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
            >
              بررسی
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
