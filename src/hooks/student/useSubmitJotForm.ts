/* eslint-disable @typescript-eslint/no-unused-vars */
import { submitJotForm } from "@/services/student/submitJotformService";
import { useState } from "react";

export const useSubmitJotForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const submitForm = async (email: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await submitJotForm(email);
            setSuccess(true);
        } catch (err) {
            setError("Failed to submit form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return { submitForm, loading, error, success };
};
