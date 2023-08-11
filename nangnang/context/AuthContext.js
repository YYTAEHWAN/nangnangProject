import { createContext,useContext,useState,useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
    isLogin: false,
    uid:'',
    email:'',
    name:'',
    wallet:[{
           wallet_num: "1",
           id : "metamask",
           walletname:'Metamask',
           walletaddress:'',
           selected: false,
        },
        {
            wallet_num: "2",
            id: "trustwallet",
            walletname:'Trust Wallet',
            walletaddress:'',
            seleted: false,
        },
        {
            wallet_num: "3",
            id: "bitpay",
            walletname:'Bitpay',
            walletaddress:'',
            selected: false,
        },
        {
            wallet_num: "4",
            id: "argent",
            walletname:'Argent',
            walletaddress:'',
            selected: false,
        },
        {
            wallet_num: "5",
            id: "rainbow",
            walletname:'Rainbow',
            walletaddress:'',
            selected: false,
        }]
};

const reducer = (state, action) =>{
    switch (action.type) {
        case 'user_login':
            return {
                ...state,
                isLogin: action.payload,
                uid:action.uid,
                name:action.name,
                wallet : action.wallet
            };
        case 'user_logout':
            return{
                ...state,
                isLogin: action.payload,
            };
        case 'save_address':
            return{
                ...state,
                wallet: state.wallet.map(it => (it.id === action.id ? {...it, walletaddress: action.walletaddress} : it))
            }
        case 'initialization_address':
            return {
                ...state,
                wallet: state.wallet.map(it =>(it.id === action.id? {...it, walletaddress: ''} : it) )
            }
        case 'wallect_select':
            return{
                ...state,
                wallet: state.wallet.map(it =>(it.id === action.id ? {...it, selected: true} :it ))
            }
        default:
            state;
    }
}

const AuthProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
    );

};
 
export default AuthProvider;