"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Share2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(url);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const href = window.location.href;
      const hostname = window.location.hostname;
      // Nếu đang chạy trên domain thực tế (không phải localhost) thì ưu tiên dùng URL trang hiện tại
      if (
        hostname &&
        hostname !== "localhost" &&
        hostname !== "127.0.0.1" &&
        !hostname.endsWith(".local")
      ) {
        setShareUrl(href);
      } else if (url) {
        setShareUrl(url);
      }
    }
  }, [url]);

  const targetUrl = shareUrl || url;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(targetUrl)}`;

  const handleShareFacebook = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Trên thiết bị di động, để thẻ <a> mở ứng dụng/trình duyệt tự nhiên
    const isMobile =
      typeof navigator !== "undefined" &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      return;
    }

    try {
      const popupWidth = 620;
      const popupHeight = 600;
      const screenLeft = window.screenLeft ?? window.screenX ?? 0;
      const screenTop = window.screenTop ?? window.screenY ?? 0;
      const windowWidth =
        window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;
      const windowHeight =
        window.innerHeight ??
        document.documentElement.clientHeight ??
        screen.height;

      const left = windowWidth / 2 - popupWidth / 2 + screenLeft;
      const top = windowHeight / 2 - popupHeight / 2 + screenTop;

      const popup = window.open(
        fbShareUrl,
        "FacebookShare",
        `width=${popupWidth},height=${popupHeight},top=${top},left=${left},toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no`
      );

      // Nếu popup mở thành công, ngăn chặn hành vi click mặc định và focus vào popup
      if (popup && !popup.closed) {
        e.preventDefault();
        popup.focus();
      }
      // Nếu trình duyệt chặn popup, trình duyệt sẽ tự động kích hoạt href mở tab mới qua target="_blank"
    } catch {
      // Trường hợp có lỗi, để thẻ <a> mở tab mới tự nhiên
    }
  };

  const handleCopy = async () => {
    const copyTarget =
      typeof window !== "undefined" && window.location.href
        ? window.location.href
        : targetUrl;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(copyTarget);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = copyTarget;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-[3px] bg-slate-50 border border-slate-200/90">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
        <Share2 className="w-4 h-4 text-[#ed3237]" />
        <span>Chia sẻ bài viết:</span>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={fbShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleShareFacebook}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-[#1877F2] hover:bg-[#0c63d4] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer select-none"
          title="Chia sẻ lên Facebook"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span>Facebook</span>
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer select-none"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-slate-500" />
          )}
          <span>{copied ? "Đã copy link!" : "Sao chép link"}</span>
        </button>
      </div>
    </div>
  );
}
