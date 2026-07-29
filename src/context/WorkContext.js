import { createContext, useState } from "react";

export const WorkContext = createContext();
export function WorkProvider({ children }) {

  const [works, setWorks] = useState([]);


  return (
    <WorkContext.Provider value={{works,setWorks,}}>{children}</WorkContext.Provider>
  );
}