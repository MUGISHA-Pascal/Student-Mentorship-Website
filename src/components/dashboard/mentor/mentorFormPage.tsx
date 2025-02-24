import React from 'react';

const MentorFormPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <iframe
                src="https://form.jotform.com/elissafirstborn/goya-mentor-evaluation-form"
                title="JotForm"
                className="w-screen h-full border-none"
            ></iframe>
        </div>
    );
};

export default MentorFormPage;
