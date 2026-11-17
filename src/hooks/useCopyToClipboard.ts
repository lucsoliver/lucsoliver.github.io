import { useCallback, useEffect, useRef, useState } from "react";
import { copyToClipboard } from "../utils/copyToClipboard";

export type CopyStatus = "idle" | "copied" | "error";

export function useCopyToClipboard(feedbackMs = 1800) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timerRef = useRef<number | undefined>(undefined);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      window.clearTimeout(timerRef.current);
    };
  }, []);

  const copy = useCallback(
    async (text: string) => {
      window.clearTimeout(timerRef.current);

      const success = await copyToClipboard(text);
      if (!isMountedRef.current) return success;

      setStatus(success ? "copied" : "error");

      timerRef.current = window.setTimeout(() => {
        if (isMountedRef.current) setStatus("idle");
      }, feedbackMs);

      return success;
    },
    [feedbackMs],
  );

  return { status, copy };
}
