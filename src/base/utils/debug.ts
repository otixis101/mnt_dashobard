/* eslint-disable no-console */
const isLocal =
  typeof window === "undefined" ? true : !!window.origin.includes("localhost");

const Debug = {
  log: (...args: any[]) => {
    if (isLocal) {
      console.log(...args);
    }
  },
  error: (...args: any[]) => {
    if (isLocal) {
      console.error(...args);
    }
  },
  warn: (...args: any[]) => {
    if (isLocal) {
      console.warn(...args);
    }
  },
  // Add more methods as needed
  customMethod: (...args: any[]) => {
    if (isLocal) {
      console.log("Custom method:", ...args);
    }
  },
};

export default Debug;
