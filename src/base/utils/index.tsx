/* eslint-disable import/prefer-default-export */
import { ClassValue, clsx } from "clsx";
import { getSession } from "next-auth/react";
import { Fetcher } from "swr";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const apiFetcher: Fetcher = async (apiUrl: string) => {
  const sessionResponse = await getSession();
  const sessionToken = sessionResponse?.user?.accessToken;

  const res = await fetch(`${baseUrl}/${apiUrl}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${sessionToken}`,
    },
  });

  if (!res.ok) {
    const error = new Error("HttpError");

    error.message = `${res.status} ${res.statusText}`;
    error.stack = JSON.stringify(await res.json());
    console.error(error);

    throw error;
  }

  return res.json();
};

export const getElementOptionValue = (
  opt: InputOptions[number],
  key: keyof KeyLabel
) => {
  if (typeof opt === "string" || typeof opt === "number") return opt;

  return opt[key];
};

export const truncateString = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return `${str.slice(0, num)}...`;
};

export const getAgeByDate = (date: string) => {
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
};
