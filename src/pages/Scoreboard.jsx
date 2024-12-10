import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import Navbar from '../components/Navbar';
import { collection, onSnapshot, query, doc, getDoc } from 'firebase/firestore';
import db from '../lib/firebase';

ChartJS.register(...registerables);

const Scoreboard = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [chartData, setChartData] = useState(null);

  const getUserName = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      return userDoc.exists() ? userDoc.data().username : 'Unknown User';
    } catch (error) {
      console.error('Error fetching username:', error);
      return 'Unknown User';
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'user_submissions')), async (querySnapshot) => {
      if (querySnapshot.empty) {
        console.warn('No submissions found!');
        return;
      }

      const userScores = {};

      querySnapshot.forEach((doc) => {
        const { userId, pointsGranted, questionId, submissionTime } = doc.data();

        if (!userId || pointsGranted === undefined || !submissionTime || !questionId) {
          console.warn('Skipping document due to missing fields:', doc.data());
          return;
        }

        if (!userScores[userId]) {
          userScores[userId] = {
            totalScore: 0,
            scoreTimeline: [],
            submissionTimes: {},
          };
        }

        userScores[userId].totalScore += pointsGranted;
        userScores[userId].scoreTimeline.push({
          x: submissionTime.toDate(),
          y: userScores[userId].totalScore,
        });

        if (!userScores[userId].submissionTimes[questionId]) {
          userScores[userId].submissionTimes[questionId] = submissionTime.toDate();
        }
      });

      const rankedUsers = await Promise.all(
        Object.entries(userScores).map(async ([userId, { totalScore, scoreTimeline, submissionTimes }]) => {
          const username = await getUserName(userId);

          return {
            name: username,
            score: totalScore,
            timeline: scoreTimeline,
            submissionTimes,
          };
        })
      );

      rankedUsers.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        } else {
          const aSubmissionTimes = Object.values(a.submissionTimes).sort((t1, t2) => t1 - t2);
          const bSubmissionTimes = Object.values(b.submissionTimes).sort((t1, t2) => t1 - t2);

          for (let i = 0; i < Math.min(aSubmissionTimes.length, bSubmissionTimes.length); i++) {
            if (aSubmissionTimes[i] !== bSubmissionTimes[i]) {
              return aSubmissionTimes[i] - bSubmissionTimes[i];
            }
          }

          return aSubmissionTimes.length - bSubmissionTimes.length;
        }
      });

      setTopUsers(rankedUsers);

      const dataset = {
        labels: rankedUsers
          .reduce((acc, user) => {
            user.timeline.forEach(({ x }) => {
              if (!acc.includes(x)) acc.push(x);
            });
            return acc;
          }, [])
          .sort((a, b) => a - b),
        datasets: rankedUsers.map((user, index) => ({
          label: user.name,
          data: user.timeline,
          borderColor: `hsl(${(index * 60) % 360}, 70%, 50%)`,
          backgroundColor: `hsl(${(index * 60) % 360}, 70%, 50%, 0.3)`,
          fill: false,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        })),
      };

      setChartData(dataset);
    });

    // Cleanup function to unsubscribe from the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  const getRowClass = (index) => {
    if (index === 0) return 'bg-yellow-300'; // First place
    if (index === 1) return 'bg-gray-300'; // Second place
    if (index === 2) return 'bg-orange-300'; // Third place
    return 'bg-white'; // Other places
  };

  return (
    <>
      <Navbar />
      <div className="p-4 flex flex-col items-center bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Top 10 Users</h2>

        {chartData ? (
          <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg mb-6">
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  x: {
                    type: 'time',
                    time: {
                      unit: 'day',
                    },
                    title: {
                      display: true,
                      text: 'Time',
                    },
                  },
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Points',
                    },
                  },
                },
              }}
            />
          </div>
        ) : (
          <p>Loading chart...</p>
        )}

        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Place</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">User</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Score</th>
              </tr>
            </thead>
            <tbody>
              {topUsers.map((user, index) => (
                <tr key={user.name} className={`${getRowClass(index)} border-b`}>
                  <td className="px-4 py-2 text-gray-800 font-medium">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 text-gray-800">{user.name}</td>
                  <td className="px-4 py-2 text-gray-800">{user.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Scoreboard;
