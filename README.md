

# **AI-Powered Coding Competition Platform**

Welcome to the **AI-Powered Coding Competition Platform**! This web application is designed to host coding competitions with advanced features like AI-based judging, a built-in online compiler, and real-time score updates. It ensures fair play by automatically disqualifying users attempting to cheat and provides an intuitive admin panel for managing the competition.

---

## **Features**

### **For Participants**
1. **AI as a Judge:**
   - Submissions are automatically evaluated by an AI judge based on accuracy, efficiency, and adherence to the problem requirements.

2. **Built-in Online Compiler:**
   - Users can write, run, and test their code directly within the platform without any external tools.
   - Supported languages: Python, C++, Java, and more.

3. **Anti-Cheating Mechanism:**
   - Any attempt to manipulate code outside the platform will lead to **automatic disqualification**.

4. **Real-Time Scoreboard:**
   - A dynamic scoreboard updates participant rankings based on submission performance in real-time.

---

### **Admin Panel**
1. **User Management:**
   - Approve or disqualify participants.
   - Monitor user activities to ensure fair competition.

2. **Question Management:**
   - Add, update, or delete competition questions.
   - Assign specific difficulty levels to questions.

3. **Competition Insights:**
   - View submission statistics and monitor the live scoreboard.

---

## **Getting Started**

### **Prerequisites**
- **Node.js** (v16 or above)
- **React.js** (v18 or above)
- **MongoDB** (for storing user data and submissions)
- **Python** (for AI judge backend)
- **Docker** (optional, for deploying the compiler securely)

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-coding-competition.git
   cd ai-coding-competition
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Set up the backend server:
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Start the backend server:
     ```bash
     python app.py
     ```

5. Configure the database in `.env`:
   ```plaintext
   MONGO_URI=mongodb+srv://<your_mongodb_url>
   ```

---

## **Usage**

### **Participants**
1. **Sign Up/Login:**
   - Create an account and join an active competition.
2. **Solve Problems:**
   - Navigate to the **Challenges** screen and select a question to solve.
3. **View Scoreboard:**
   - Monitor your performance and rankings on the real-time scoreboard.

### **Admins**
1. **Login to the Admin Panel:**
   - Access the admin dashboard to manage users and competition questions.
2. **Upload Questions:**
   - Add questions with test cases directly from the admin panel.
3. **Monitor Submissions:**
   - Approve or disqualify participants as needed.

---

## **Project Structure**

```plaintext
ai-coding-competition/
├── frontend/                # React app (UI)
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Pages (Home, Challenges, Scoreboard, etc.)
│   │   ├── admin/           # Admin-specific pages
│   │   └── utils/           # Utility functions
│   └── public/              # Static assets
├── backend/                 # Backend services
│   ├── app.py               # Python server
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── ai_judge/            # AI judge logic
│   └── compiler/            # Online compiler logic
├── database/                # MongoDB setup
├── .env                     # Environment variables
└── README.md                # Project documentation
```

---

## **Technologies Used**

### **Frontend**
- React.js
- Tailwind CSS (for styling)

### **Backend**
- Python Flask
- MongoDB (for data storage)

### **Compiler**
- Dockerized sandbox for secure code execution.

### **AI**
- Natural Language Processing (NLP) and Machine Learning algorithms to evaluate submissions.

---

## **Future Enhancements**
- Support for more programming languages.
- Advanced analytics for participant performance.
- Live commentary during competitions.
- Integration with external IDEs.

---

## **Contributions**
Contributions are welcome! Please follow these steps:
1. Fork this repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Submit a pull request.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

