import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { FaPlay, FaTimes, FaForward, FaCheck } from 'react-icons/fa';
import { compileCode } from '../lib/compileCode';
import '../pages/Coding.css';
import LoginModal from '../components/LoginModal';
import { useLocalContext } from '../context/context';
import db from '../lib/firebase';
import { doc, getDoc, updateDoc, collection, query, getDocs, where, addDoc } from 'firebase/firestore';
import { getGeminiResponse } from '../lib/gemni';
import ClipLoader from 'react-spinners/ClipLoader'; // Install react-spinners using `npm install react-spinners`
import { Link } from 'react-router-dom';

const CodingScreen = () => {


  const { user } = useLocalContext();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [disqualified, setDisqualified] = useState(false);
  const [verified, setVerified] = useState(true);
  const [language, setLanguage] = useState('cpp');
  const [input, setInput] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(!user);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false); // Spinner state
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [isNavigating,setisNavigating] = useState(false);
  const [isstart,setisStart]=useState(true);
  const [timestamp, setTimestamp] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [timeRemaining, setTimeRemaining] = useState('');
  // Fetch questions
  const fetchTotalScore = async (userId) => {
    if (!userId) return 0;
  
    try {
      const submissionsQuery = query(
        collection(db, 'user_submissions'),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(submissionsQuery);
      let total = 0;
      querySnapshot.forEach((doc) => {
        total += doc.data().pointsGranted || 0;
      });
      return total;
    } catch (error) {
      console.error('Error fetching total score:', error);
      return 0;
    }
  };
  
  useEffect(() => {
    if (!isstart && timestamp) {
      const targetDate = new Date(timestamp);

      const interval = setInterval(() => {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
          clearInterval(interval);
          setisStart(true); // Competition starts when time is up
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);

          setTimeLeft({ days, hours, minutes, seconds });
          
        }
      }, 1000);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [timestamp, isstart]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!user) return;
  
      try {
        setIsLoading(true);
  
        // Fetch the user's answered questions
        const userAnswersRef = doc(db, 'users', user.uid);
        const userAnswersDoc = await getDoc(userAnswersRef);
        const answeredQuestions = userAnswersDoc.exists()
          ? userAnswersDoc.data().answeredQuestions || []
          : [];
  
        // Fetch all questions
        const questionsQuery = query(collection(db, 'competitions/current_competition_id/questions'));
        const querySnapshot = await getDocs(questionsQuery);
  
        // Filter out questions already answered by the user
        const fetchedQuestions = [];
        querySnapshot.forEach((doc) => {
          if (!answeredQuestions.includes(doc.id)) {
            fetchedQuestions.push({ id: doc.id, ...doc.data() }); // Include the question ID
          }
        });
  
        // Update state with the filtered questions
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchQuestions();
  }, [user, triggerRefetch]);

  useEffect(() => {
    const checkco = async () => {
      if (!user) return; // Ensure user exists before proceeding
  
      try {
        const userDocRef = doc(db, 'flags','pztFtkdBpQt7daOaWteR');
        const userDoc = await getDoc(userDocRef);
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
  
          if (userData.start) {
            setisStart(true);
            console.log("Competition started");
          } else {
            setisStart(false);
            const firebaseTimestamp = userData.Date;
            const formattedDate = new Date(firebaseTimestamp.seconds * 1000);
            setTimestamp(formattedDate);
            console.log("Competition not started. Start date:", userData.Date);
          }
        } else {
          console.warn("User document does not exist in 'flags' collection");
        }
      } catch (error) {
        console.error('Error fetching user document:', error);
      }
    };
  
    checkco();
  }, [user]); // Only depend on `user`
  
  // Check user status

  useEffect(() => {
    const checkUserStatus = async () => {
      if (!user) return;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.disq) {
          setDisqualified(true);
        } else if (!userData.approved) {
          setVerified(false);
        } else {
          setVerified(true);
        }
        setLanguage(userData.language)
      }
    };

    checkUserStatus();
  }, [user]);
  useEffect(() => {
    if (!isstart) {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const competitionTime = new Date(timestamp);
        const timeDifference = competitionTime - currentTime;

        if (timeDifference > 0) {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor(
            (timeDifference % (1000 * 60)) / 1000
          );

          setTimeRemaining(
            `${days}d ${hours}h ${minutes}m ${seconds}s`
          );
        } else {
          setTimeRemaining('The competition is starting soon!');
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [isstart, timestamp]);

  

 
  // Tab change handler
  useEffect(() => {
     // Flag to track intentional navigation
  
    const handleVisibilityChange = async () => {
      console.log(isNavigating);
      if (isNavigating) return; // Skip disqualification logic if navigating intentionally
  
      if (document.visibilityState === 'hidden' && !disqualified) {
        setDisqualified(true);
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          await updateDoc(userDocRef, { disq: true });
        }
      }
    };
  
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [disqualified, user]);

  const runCode = async () => {
    setOutput('Running...');
    try {
      const result = await compileCode(code, language, input);
      setOutput(result.output || 'No output');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const skipQuestion = () => {
    setCode('');
    setOutput('');
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const submitSolution = async () => {
    setOutput('Evaluating your solution...');
    setLoading(true); // Start the loading spinner
  
    try {
      const currentQuestion = questions[currentQuestionIndex];
      const prompt = `
        Evaluate the following code for the given problem:
        Problem: ${currentQuestion.question}
        Total Points: ${currentQuestion.points}
        chosenLanguage: ${language}
        Instructions:
      - Apply the highest standards of scrutiny during the evaluation, ensuring every aspect of the submission is thoroughly analyzed.
      - Key Evaluation Criteria:
        1. **Correctness**: Verify that the solution meets all requirements of the problem and handles edge cases effectively.
        2. **Syntax and Language Rules**: Ensure strict adherence to the syntax and predefined rules of the chosen programming language. Deduct points for any violations, including improper use of built-in functions, operators, or language constructs.
        3. **Efficiency**: Analyze the computational efficiency, including both time and space complexity. Deduct points if the solution is suboptimal or if there are better approaches.
        4. **Code Quality**: Evaluate code readability, structure, and maintainability. Deduct points for poor formatting, unclear variable names, or lack of modular design.
        5. **Robustness**: Assess the solution’s ability to handle edge cases, unexpected inputs, and failure scenarios. Deduct points for any omissions or vulnerabilities.
        6. **must check**: the code should be full all syntax should be there important or not
      - The difficulty of the evaluation should be set to the highest standard, reflecting real-world industry expectations.
      - Provide detailed, constructive feedback to highlight areas of improvement and guide the learner toward excellence.
        Code: 
        \`\`\`
        ${code}
        \`\`\`
        Please provide a JSON in return:
        {
          "question": question,
          "submittedAnswer": answer,
          "Pointsgranted": points,
          "detailedFeedback": feedback
        }

      `;
  
      const response = await getGeminiResponse(prompt);
      
      // Log the raw AI response to debug the structure
  
      // Extract the text content from the response
      const responseText = response.candidates[0].content.parts[0].text;
  
      // Log the extracted text to check its structure
  
      // Parse the extracted text as JSON
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(responseText);
      } catch (err) {
        throw new Error("The AI response could not be parsed as JSON.");
      }
  
      // Log the parsed response to check its structure
  
      // Proceed if the response contains the expected fields
      if (
        parsedResponse &&
        parsedResponse.Pointsgranted !== undefined &&
        parsedResponse.detailedFeedback !== undefined
      ) {
        const { Pointsgranted, detailedFeedback } = parsedResponse;
  
        alert(`You have been awarded ${Pointsgranted} points!`);
  
        // Save the answer and user details to the database
        const userSubmissionRef = collection(db, 'user_submissions');
        await addDoc(userSubmissionRef, {
          userId: user.uid,
          questionId: currentQuestion.id,
          submittedAnswer: code,
          pointsGranted: Pointsgranted,
          feedback: detailedFeedback,
          submissionTime: new Date(),
        });
  
        // Mark the question as answered
        const userAnswersRef = doc(db, 'users', user.uid);
        const userAnswersDoc = await getDoc(userAnswersRef);
        let answeredQuestions = userAnswersDoc.exists()
          ? userAnswersDoc.data().answeredQuestions || []
          : [];
  
        answeredQuestions.push(currentQuestion.id);
        await updateDoc(userAnswersRef, { answeredQuestions });
  
        setOutput("")
        setCode("//write your code here")
        setTriggerRefetch((prev) => !prev);
      } else {
        // Handle case where expected properties are missing
        console.error('AI response structure is missing expected fields.');
        throw new Error('Invalid response structure from AI');
      }
    } catch (error) {
      console.error('Error in submitSolution:', error);
      setOutput(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };
  const goToScoreboard = () => {
  setisNavigating(true) ;// Set the flag to true
  window.location.href = "/scoreboard"; // Navigate to the scoreboard
};
  
  const exitCompetition = () => {
    window.location.href = "/"; // Redirect to the homepage
  };

  if (loading) {
    return (
      <div className="spinner-container h-screen flex items-center justify-center bg-gray-900">
        <ClipLoader color="#4A90E2" loading={loading} size={50} />
        <p className="text-white mt-2">Processing your solution...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    );
  }

  if (!isstart) {
    return (
      <div className="verification-message bg-yellow-600 text-black p-6 text-center h-screen flex flex-col items-center justify-center relative">
        {/* Cross Button */}
        <Link
          className="absolute top-4 right-4 text-black text-xl font-bold bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-300"
          to='/'
        >
          ×
        </Link>

        {/* Content */}
        <h1 className="text-3xl font-bold">Coding Competition</h1>
        <p className="text-lg mt-4">
          The competition will start on{' '}
          <span className="font-semibold">
            {new Date(timestamp).toLocaleString()}
          </span>
        </p>
        <div className="countdown mt-4 bg-white text-black py-2 px-4 rounded-md shadow-md">
          Time Remaining: <span className="font-bold">{timeRemaining}</span>
        </div>
      </div>
    );
  }
  if (!verified) {
    return (
      <div className="verification-message bg-yellow-600 text-black p-6 text-center h-screen flex flex-col items-center justify-center relative">
        {/* Close Icon */}
        <Link
          to="/"
          className="absolute top-4 right-4 text-black text-xl font-bold bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-300 transition duration-200"
          title="Go to Home"
        >
          ×
        </Link>

        {/* Main Content */}
        <div className="bg-white text-black p-6 rounded-lg shadow-xl max-w-md">
          <h1 className="text-2xl font-bold mb-4">Account Verification Required</h1>
          <p className="text-lg leading-relaxed">
            Your account is not verified. To participate in the competition, please contact the administrator to complete the verification process.
          </p>
         
        </div>
      </div>
    );
  }
  

  if (disqualified) {
    return (
      <div className="disqualification-message bg-red-600 text-white p-6 text-center h-screen flex flex-col items-center justify-center relative">
        {/* Close Icon */}
        <Link
          to="/"
          className="absolute top-4 right-4 text-white text-xl font-bold bg-red-800 rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-700 transition duration-200"
          title="Go to Home"
        >
          ×
        </Link>

        {/* Main Content */}
        <div className="bg-white text-red-600 p-6 rounded-lg shadow-xl max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Disqualification Notice</h1>
          <p className="text-lg leading-relaxed">
            We regret to inform you that you have been disqualified due to a violation of the competition rules.
          </p>
          <p className="text-sm mt-4">
            If you believe this is a mistake, please contact the administrator for clarification.
          </p>
         
        </div>
      </div>
    );
  }

  if (isLoading) {

      
    return (
      <div className="loading-screen bg-gray-900 text-white p-4 text-center h-screen">
        Loading questions, please wait...
      </div>
    );
  }
  if (!questions.length) {
    const handleTotalScore = async () => {
      const total = await fetchTotalScore(user.uid);
      setTotalScore(total); // Assuming `setTotalScore` is defined in your component
    };
    handleTotalScore()  
    return (
      <div className="completed-screen h-screen flex flex-col justify-center items-center bg-gray-900 text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Competition Completed</h1>
        <p className="text-lg mb-6">
          Congratulations! You have completed the competition.
        </p>
        <p className="text-lg font-semibold mb-4">
          Your Total Score: <span className="text-yellow-400">{totalScore}</span>
        </p>
        <button
  onClick={goToScoreboard}
  className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
>
  Go to Scoreboard
</button>

      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="coding-screen h-screen flex flex-col bg-gray-900">
      <div className="toolbar bg-gray-800 p-2 flex items-center justify-between">
        <h1 className="text-white font-semibold text-xl">Coding Environment</h1>
        <button
          onClick={exitCompetition}
          className="text-white bg-red-600 p-2 rounded hover:bg-red-700"
        >
          <FaTimes />
        </button>
      </div>

      <div className="bg-gray-800 text-white p-4 text-lg font-semibold border-b border-gray-700">
     
        <h1>Question</h1>
        {currentQuestion ? (
          <div className="flex justify-between">
            <p>{currentQuestion.question}</p>
            <span className="text-yellow-400 font-semibold">{currentQuestion.points} points</span>
          </div>
        ) : (
          <p>Loading question...</p>
        )}
      </div>
      <div className="flex justify-between mt-4 ml-4">
  <button
    onClick={skipQuestion}
    className="text-white bg-yellow-600 p-2 rounded hover:bg-yellow-700 w-20 flex items-center justify-center space-x-2"
  >
    <FaForward /> <span>Skip</span>
  </button>
  <button
    onClick={submitSolution}
    className="text-white bg-green-600 p-2 rounded hover:bg-green-700 flex items-center justify-center space-x-2"
  >
    <FaCheck /> <span>Submit</span>
  </button>
</div>

      <div className="flex-1 bg-gray-900 p-4">
        <div className="flex items-center mb-4 space-x-4">
          <div>
            <label htmlFor="language" className="text-white mr-2">Select Language:</label>
             <label className='p-2 rounded bg-gray-800 text-white border border-gray-700'>{language}</label>
          </div>

          <textarea
            rows="2"
            className="p-2 w-full bg-gray-800 text-white rounded-md flex-1"
            placeholder="Input (optional)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="code-editor-panel bg-gray-800 p-4 rounded-t-md relative">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-white">Code Editor</h2>
            <button
              onClick={runCode}
              className="text-white bg-blue-600 p-2 rounded hover:bg-blue-700"
            >
              <FaPlay />
            </button>
          </div>
          <Editor
            height="50vh"
            language={language}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
            }}
            value={code}
            onChange={(value) => setCode(value)}
          />
        </div>

        <div className="output-panel bg-gray-800 p-4 rounded-b-md">
          <h2 className="text-white">Output</h2>
          <div className="output-content bg-gray-900 text-white p-2 rounded-md mt-2 min-h-[10vh]">
            {output}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default CodingScreen;
