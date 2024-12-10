import React, { useState } from "react";
import { collection, addDoc, doc ,updateDoc} from "firebase/firestore";
import db from "../lib/firebase"; // Ensure this imports your Firebase instance

const UploadQuestions = () => {
  const [competitionId] = useState("current_competition_id"); // Hardcoded for simplicity
  const [questions, setQuestions] = useState([
    { question: "", points: "", answer: "" },
  ]);

  const handleInputChange = (e, index, field) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", points: "", answer: "" }]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!competitionId) {
      alert("Please enter a competition ID.");
      return;
    }

    try {
      // Reference to the competition document
      const competitionDocRef = doc(db, "competitions", competitionId);
      const questionsCollection = collection(competitionDocRef, "questions");

      // Loop through questions and add them to Firestore
      for (const question of questions) {
        if (question.question && question.points && question.answer) {
          // Add each question document to Firestore with an auto-generated ID
          const questionRef = await addDoc(questionsCollection, {
            question: question.question,
            points: question.points,
            answer: question.answer,
          });

          // After the question is added, update the document with its ID
          await updateDoc(questionRef, {
            id: questionRef.id, // Add the ID to the document
          });
        } else {
          alert("Please fill out all fields for each question.");
          return;
        }
      }

      alert("Questions uploaded successfully!");
      setQuestions([{ question: "", points: "", answer: "" }]); // Reset questions
    } catch (error) {
      console.error("Error uploading questions:", error);
      alert("Failed to upload questions.");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Upload Questions</h2>

      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <div className="flex space-x-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Question</label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) => handleInputChange(e, index, "question")}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Enter the question"
                  required
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Points</label>
                <input
                  type="number"
                  value={question.points}
                  onChange={(e) => handleInputChange(e, index, "points")}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Assign points"
                  required
                />
              </div>
            </div>
            <div className="w-full mt-2">
              <label className="block text-sm font-medium text-gray-700">Answer</label>
              <textarea
                value={question.answer}
                onChange={(e) => handleInputChange(e, index, "answer")}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="Provide the correct answer"
                required
              />
            </div>
            {questions.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveQuestion(index)}
                className="mt-2 text-red-500"
              >
                Remove Question
              </button>
            )}
          </div>
        ))}

        <div className="flex space-x-4 mt-4">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add Question
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Upload Questions
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadQuestions;
