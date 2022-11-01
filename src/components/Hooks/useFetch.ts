import { useCallback } from "react";

export const useFetch = () => {
  const request = async (url: any, method = "GET", body = null, headers = { "Content-Type": "application/json" }) => {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (e) {
      throw e;
    }
  };

  return { request } as any;
};
