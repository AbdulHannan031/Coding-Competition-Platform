import Axios from 'axios';

const languageMap = {
    c: { language: "c", version: "10.2.0" },
    cpp: { language: "c++", version: "10.2.0" },
    python: { language: "python", version: "3.10.0" },
    java: { language: "java", version: "15.0.2" }
};

export const compileCode = async (code, language, input) => {
    if (!languageMap[language]) {
        return { error: "Unsupported language" };
    }

    // Prepare data for the API request
    const data = {
        language: languageMap[language].language,
        version: languageMap[language].version,
        files: [
            {
                name: "main",
                content: code
            }
        ],
        stdin: input
    };

    try {
        // API request to compile and run the code
        const response = await Axios.post('your api', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // Return only the run object from the response
        return response.data.run;
    } catch (error) {
        console.error("Error compiling code:", error);
        return { error: "Something went wrong" };
    }
};
