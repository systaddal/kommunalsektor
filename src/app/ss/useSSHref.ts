"use client";

export function useSSHref() {
  const isOwnDomain =
    typeof window !== "undefined" &&
    window.location.hostname.includes("selsengsystaddal");

  return (path: string) => {
    if (isOwnDomain) {
      return path.replace(/^\/ss/, "") || "/";
    }
    return path;
  };
}
