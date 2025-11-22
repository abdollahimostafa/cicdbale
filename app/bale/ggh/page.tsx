"use client";

import { useState } from "react";

export default function TestRegisterPage() {
  const [phone, setPhone] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [baleId, setBaleId] = useState("");
  const [inquiry, setInquiry] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInquiry = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://www.medimedia.ir/api/v1/insurance/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ national_code: nationalId }),
      });

      const data = await res.json();

      if (data.status) {
        setInquiry(data.data);
      } else {
        setError(data.message || "استعلام بیمه با خطا مواجه شد.");
      }
    } catch (e) {
      setError("ارتباط با سرور برقرار نشد.");
    }

    setLoading(false);
  };

  const handleRegister = async () => {
    if (!inquiry) {
      setError("ابتدا استعلام بیمه را انجام دهید.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baleId,
          phone,
          nationalId,
          inquiry,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "ثبت نام با خطا مواجه شد.");
      }
    } catch (e) {
      setError("ارتباط با API برقرار نشد.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 w-full max-w-md space-y-6 rounded-xl border">

        <h1 className="text-2xl font-bold text-center">تست مرحله نهایی ثبت نام</h1>

        <input
          className="w-full p-3 border rounded"
          placeholder="شماره تلفن (phone)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded"
          placeholder="کد ملی"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded"
          placeholder="شناسه بله (baleId)"
          value={baleId}
          onChange={(e) => setBaleId(e.target.value)}
        />

        <button
          onClick={handleInquiry}
          className="w-full py-3 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          {loading ? "..." : "استعلام بیمه"}
        </button>

        {inquiry && (
          <div className="p-4 bg-gray-50 border rounded text-sm space-y-1">
            <p>نام: {inquiry.user.name}</p>
            <p>خانوادگی: {inquiry.user.family}</p>
            <p>سال تولد: {inquiry.user.birth_date.slice(0, 4)}</p>
            <p>بیمه: {inquiry.insurance.title}</p>
          </div>
        )}

        <button
          onClick={handleRegister}
          className="w-full py-3 bg-green-600 text-white rounded"
          disabled={loading || !inquiry}
        >
          {loading ? "..." : "ثبت نهایی"}
        </button>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        {success && <p className="text-green-600 text-center text-sm">ثبت نام با موفقیت انجام شد 🎉</p>}
      </div>
    </div>
  );
}
