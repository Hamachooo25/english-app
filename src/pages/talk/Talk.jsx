import React, { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import AnswerSection from '../../components/answerSection/AnswerSection';
import { FaMicrophone } from 'react-icons/fa';
import { BsFillPlayFill } from 'react-icons/bs';
import Sound from "../../components/sounds/success.mp3"
import { collection, getDocs, query } from 'firebase/firestore';
import { db, auth} from '../../firebase';
import './Talk.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthState } from "react-firebase-hooks/auth";
import LoginBtn from '../../components/header/LoginBtn';
import Header from '../../components/header/Header';



const Talk = () => {
  const [test, setTest] = useState([]);
  const [isMicClicked, setIsMicClicked] = useState(false);
  const [outputText, setOutputText] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [answerCount, setAnswerCount] = useState(1);
  const [answeredQuestions, setAnsweredQuestions] = useState([0]);
  const recognitionRef = useRef(null);
  const [playSound] = useSound(Sound);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const q = query(collection(db, 'tests'));
          const response = await getDocs(q);
          const data = response.docs.map((doc) => doc.data());
          setTest(data);
          setQuestionCount(data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  });

  

  useEffect(() => {
    recognitionRef.current = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
    const recognition = recognitionRef.current;

    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1];
      setOutputText((prevText) => prevText + ' ' + lastResult[0].transcript);
    };
  }, []);

  const handleReadQuestion = () => {
    const questionToRead = test[currentQuestionIndex]?.question;
    const speechSynthesis = window.speechSynthesis;

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(questionToRead);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  const toggleQuestionVisibility = () => {
    setIsQuestionVisible((prevState) => !prevState);
  };

  useEffect(() => {
    setIsQuestionVisible(false);
  }, [currentQuestionIndex]);

  const handleOutputChange = (event) => {
    setOutputText(event.target.value);
  };

  const handleNextQuestion = () => {
    if (answeredQuestions.length === test.length) {
      setAnswerCount(1);
      setAnsweredQuestions([0]);
    } else {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * test.length);
      } while (answeredQuestions.includes(randomIndex));

      answeredQuestions.push(randomIndex);
      setCurrentQuestionIndex(randomIndex);
      setAnswerCount((prevAnswerCount) => prevAnswerCount + 1);
    }
  };

  const toggleMicButton = () => {
    const recognition = recognitionRef.current;
    if (recognition) {
      if (!isMicClicked) {
        recognition.start();
      } else {
        recognition.stop();
      }
      setIsMicClicked((prevState) => !prevState);
    }
  };

  const handleNextClick = () => {
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.stop();
    }
    setOutputText('');
    handleNextQuestion();
    Swal.fire({
      title: "Good job!",
      text: "Keep it up!",
      icon: "success"
    });
  };

  const handleResetClick = () => {
    setOutputText('');
  };

  return (
    <>
    <Header/>
      <div className="testWrapper">
        <h1>Q.{answerCount}</h1>
        <div className="test">
          {isQuestionVisible&&(
          <div className="question">{test[currentQuestionIndex]?.question}</div>
          )}
        </div>
        <div className="buttons">
            <button onClick={toggleQuestionVisibility}>
              {isQuestionVisible ? 'Hide sentence' : 'Show sentence'}
            </button>
            <button className="play-audio" onClick={handleReadQuestion}><BsFillPlayFill className="play-icon" />
            </button>
        </div>
      <div className="contents">
        <div className="answer">
        <textarea
            className="output"
            value={outputText}
            onChange={handleOutputChange}
            placeholder='The answer you speak will be here as text. You can also correct and enter the answers by typing.'
          ></textarea>
        </div>
        <div className="btn-section">
          <div className="back">
            <div className="reset">
                <button onClick={handleResetClick} className="resetbtn">
                  <h4>Reset</h4>
                </button>
            </div>
            <Link to="/">
            <p className='backHome'>Back</p>
            </Link>
          </div>
          <div className="mic">
            <div className={`mic-icon ${isMicClicked ? 'mic-button-clicked' : ''}`}>
              <button className="mic-button" onClick={toggleMicButton}>
                <FaMicrophone className="mic-text" />
              </button>
            </div>
          </div>
          <div className="next">
            <button onClick={()=>{
              handleNextClick();
              playSound();
            }}className="nextbtn">
              <p>Next</p>
            </button>
          </div>
        </div>
        {user ? (
            <div className="gpt">
              <AnswerSection outputText={outputText} />
            </div>
          ):(
            <div className="gpt-mosaic">
              <p>You need to log in to use the AI correction function</p>
              <LoginBtn/>
              <div className='mosaic'>
               <AnswerSection /> 
              </div>
            </div>
          ) }
      </div>
    </div>
  </>
  );
};

export default Talk;