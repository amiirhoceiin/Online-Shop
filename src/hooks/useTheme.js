import { useContext } from "react";
import { themecontext } from "../context/themecontext";
//هوک سفارشی برای use context 
export function useTheme (){
    const theme = useContext(themecontext);
    if(theme === undefined) {
        throw new Error('eror to usecontext')
    }
    return theme;
}
