import { createContext,useContext,useState } from "react";

const PayinfoContext = createContext({});

export const usePayinfo =()=>{
    return useContext(PayinfoContext)
}

const PayinfoProvider = ({children})=>{
    const [payinfo, setPayinfo] = useState(null);
    return (
        <PayinfoContext.Provider value={[payinfo, setPayinfo]}>
            {children}
        </PayinfoContext.Provider>
    )
}

export default PayinfoProvider