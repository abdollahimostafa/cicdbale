"use client";

export default function NotAllowedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      {/* Icon */}
      <div className="mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-3">
        دسترسی غیر مجاز
      </h1>

      {/* Message */}
      <p className="text-gray-600 max-w-lg leading-relaxed mb-1">
        برای استفاده از این مینی‌اپ، لطفاً آن را از داخل پیام‌رسان{' '}
        بله اجرا کنید
      </p>
      <p className="text-gray-400 max-w-lg text-sm  leading-relaxed mb-8">      
        دسترسی مستقیم از طریق مرورگر در جهت خدمت رسانی بهتر ممکن نیست
      </p>
      {/* Button */}
      <a
        href="https://bale.ai"
        className="px-5 py-3 bg-blue-600 text-white rounded-xl text-sm shadow-sm hover:bg-blue-700"
      >
        دانلود پیام‌رسان بله
      </a>
    </div>
  );
}
