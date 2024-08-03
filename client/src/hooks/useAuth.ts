import { useSelector } from "react-redux";
import { RootState } from '../types/rootState';

export default function useAuth() {
    const auth = useSelector((state: RootState) => state.auth);

    if (auth?.accessToken && auth?.user) {
        return true;
    } else {
        return false;
    }
}
