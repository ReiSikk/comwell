import { createContext, useContext } from "react";

export const HotelsContext = createContext();

const useHotelsContext = () => useContext(HotelsContext);

export default useHotelsContext;