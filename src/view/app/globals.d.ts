export {};

declare global {
  const tsvscode: {
    postMessage: ({ command, value }: any) => void;
  };
}
