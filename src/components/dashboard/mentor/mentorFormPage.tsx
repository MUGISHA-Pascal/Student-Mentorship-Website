import { useSubmitJotForm } from "@/hooks/coach/useSubmitJotForm";
import { useAuthStore } from "@/store/authStore";
import React, { useEffect, useState } from "react";
import { Levels } from "react-activity";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const MentorFormPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const { email } = useAuthStore();
    // console.log("Email in jotform", email);

    const { submitForm, success, loading: submitting } = useSubmitJotForm();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!email) {
            toast.error("Email not found. Please log in again.");
            return;
        }

        await submitForm(email);

    };

    useEffect(() => {
        if (success) {
            toast.success("Form submitted successfully!");
            navigate("/mentor/waiting");
        }
    }, [success, navigate]);
    
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                    <Levels speed={0.5} color="#4A90E2" />
                </div>
            )}
            <iframe
                src="https://form.jotform.com/elissafirstborn/goya-mentor-evaluation-form"
                title="JotForm"
                className="w-screen h-full border-none"
                onLoad={() => setLoading(false)}
            ></iframe>
            <div className="absolute bottom-16 right-10">
                <button
                    className="py-3 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                    onClick={handleSubmit}
                    disabled={submitting}
                >
                    {submitting ? "Redirecting..." : "Done"}
                </button>
            </div>
        </div>
    );
};

export default MentorFormPage;
