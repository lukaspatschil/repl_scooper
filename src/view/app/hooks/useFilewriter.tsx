const useFilewriter = (extensionPath: string, initialData?: string) => {

  const writeToFile = (data: string) => {
    // writeFileSync(fullPath, data);
    tsvscode.postMessage({ command: "SaveIt", value: data });
  };

  return writeToFile;
}

export default useFilewriter;