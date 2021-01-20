export {};

declare global {
  const tsvscode: {
    setState: (newState: any) => void;
    postMessage: ({ command, value }: any) => void;
  };
}
