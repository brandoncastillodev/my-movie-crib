import { useState } from "react";

function useInput(): UseInputReturn {
  const [value, setValue] = useState<string>("");
  function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setValue(event.target.value);
  }
  return { value, onChange };
}

export default useInput;