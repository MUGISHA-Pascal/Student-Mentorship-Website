// hooks/useStreamToken.ts
import { getStreamToken } from "@/services/meeting/streamService";
import { useCallback } from "react";

export const useStreamToken = () => {
    const fetchStreamToken = useCallback(async () => {
        const token = await getStreamToken();
        return token;
    }, []);

    return { fetchStreamToken };
};
