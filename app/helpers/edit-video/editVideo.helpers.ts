export type FormLayout = "grid3" | "grid2" | "full";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function getApiErrorMessage(
    error: unknown,
    fallback: string,
  ): string {
    if (typeof error !== "object" || error === null) {
      return fallback;
    }

    const value = error as {
      data?: unknown;
      message?: unknown;
      error?: unknown;
      response?: {
        data?: unknown;
      };
    };

    const responseData =
      typeof value.response?.data === "object" &&
      value.response.data !== null
        ? (value.response.data as {
            message?: unknown;
            error?: unknown;
          })
        : undefined;

    const data =
      typeof value.data === "object" && value.data !== null
        ? (value.data as {
            message?: unknown;
            error?: unknown;
          })
        : responseData;

    const candidates = [
      data?.message,
      data?.error,
      value.message,
      value.error,
    ];

    const serverMessage = candidates.find(
      (candidate): candidate is string =>
        typeof candidate === "string" &&
        candidate.trim().length > 0,
    )?.trim();

    if (!serverMessage) {
      return fallback;
    }

    // رسائل السيرفر وترجمتها للعربي
    const messages: Record<string, string> = {
      "Product name already exists": "اسم المنتج موجود بالفعل",
      "Product not found": "المنتج غير موجود",
      "Event name already exists": "اسم الحدث موجود بالفعل",
      "Event not found": "الحدث غير موجود",
      "Video not found": "الفيديو غير موجود",
      "Unauthorized": "غير مصرح لك بتنفيذ هذا الإجراء",
      "Forbidden": "ليس لديك صلاحية لتنفيذ هذا الإجراء",
      "Validation failed": "البيانات المدخلة غير صحيحة",
    };

    // لو الرسالة موجودة في الترجمة، اعرض العربي
    if (messages[serverMessage]) {
      return messages[serverMessage];
    }

    // لو السيرفر رجّع رسالة عربية بالفعل، اعرضها
    if (/[\u0600-\u06FF]/.test(serverMessage)) {
      return serverMessage;
    }

    // لا تعرض أي رسالة إنجليزية غير مترجمة
    return fallback;
  }

// export function getFileUrl(fileName: string | null | undefined): string {
//   if (!fileName) return "";
//   const value = fileName.trim();
//   if (!value) return "";

//   if (value.startsWith("http://") || value.startsWith("https://")) {
//     return value;
//   }

//   if (value.startsWith("/")) {
//     return `${API_URL}${value}`;
//   }

//   // return `${API_URL}/uploads/videos/${encodeURIComponent(value)}`;
//   return `${API_URL}/uploads/videos/${encodeURIComponent(value)}`;
// }

export function toDateTimeLocal(value: string | Date | null | undefined): string {
  if (!value) return "";
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return "";

  return new Date(
    parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000,
  ).toISOString().slice(0, 16);
}

export function isValidVideoFile(file: File): boolean {
  return file.type.startsWith("video/");
}

export function isValidThumbnailFile(file: File): boolean {
  return file.type.startsWith("image/");
}





const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000"
).replace(/\/+$/, "");

const LAN_API_URL = (
  process.env.NEXT_PUBLIC_LAN_API_URL ||
  "http://192.168.1.126:5000"
).replace(/\/+$/, "");

function isPrivateNetwork(hostname: string): boolean {
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1"
  ) {
    return true;
  }

  const match = hostname.match(
    /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/
  );

  if (!match) return false;

  const [a, b] = match.slice(1, 3).map(Number);

  return (
    a === 10 ||
    a === 192 && b === 168 ||
    a === 172 && b >= 16 && b <= 31
  );
}

export function getVideoApiUrl(): string {
  if (typeof window === "undefined") {
    return API_URL;
  }

  return isPrivateNetwork(window.location.hostname)
    ? LAN_API_URL
    : API_URL;
}


export function getThumbnailUrl(
  value: string | null | undefined
): string {
  if (!value?.trim()) return "";

  const normalized = value.trim();

  // Already a complete URL
  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  // Already contains the thumbnail route
  if (normalized.startsWith("/uploads/thumbanils/")) {
    return `${API_URL}${normalized}`;
  }

  // Extract filename from a path
  const filename = normalized
    .split("?")[0]
    .split("#")[0]
    .replace(/\\/g, "/")
    .split("/")
    .pop();

  if (!filename) return "";

  return `${API_URL}/uploads/thumbanils/${encodeURIComponent(filename)}`;
}


export function getFileUrl(
  fileName: string | null | undefined
): string {
  if (!fileName) return "";

  const value = fileName.trim();

  if (!value) return "";

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const baseUrl = getVideoApiUrl();

  if (value.startsWith("/")) {
    return `${baseUrl}${value}`;
  }

  return `${baseUrl}/uploads/videos/${encodeURIComponent(value)}`;
}
