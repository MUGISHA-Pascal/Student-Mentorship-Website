import React, { useState } from "react";
import { Levels } from "react-activity";


const MentorFormPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
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
        </div>
    );
};

export default MentorFormPage;
