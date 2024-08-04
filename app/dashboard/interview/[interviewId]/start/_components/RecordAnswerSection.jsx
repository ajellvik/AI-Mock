"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModal';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData, jsonMockResp }) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true, // Ensure continuous is true
    useLegacyResults: false
  });

  useEffect(() => {
    console.log('Results updated:', results);
    if (results.length > 0) {
      setUserAnswer((prevAns) => prevAns + ' ' + results[results.length - 1].transcript);
      console.log('Transcript added:', results[results.length - 1].transcript);
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      console.log('Recording stopped, updating user answer...');
      UpdateUserAnswer();
    }
  }, [isRecording]);

  const StartStopRecording = async () => {
    if (isRecording) {
      console.log('Stopping recording...');
      stopSpeechToText();
    } else {
      console.log('Starting recording...');
      setUserAnswer(''); // Clear previous answer
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log('User Answer:', userAnswer);
    setLoading(true);

    // Ensure jsonMockResp and activeQuestionIndex are valid
    if (!jsonMockResp || !jsonMockResp[activeQuestionIndex]) {
      console.error('Invalid question data', jsonMockResp, activeQuestionIndex);
      setLoading(false);
      return;
    }

    const feedbackPrompt = `Question: ${jsonMockResp[activeQuestionIndex]?.question},
    User Answer: ${userAnswer}, Based on the question and user answer,
    please give us a rating between 1-10 with 10 being the best possible for the answer and feedback for improvement if any,
    in just 3 to 5 lines in JSON format with rating and feedback fields`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = (await result.response.text()).replace('```json', '').replace('```', '');
      const JsonFeedbackResp = JSON.parse(mockJsonResp);
      console.log('Feedback:', JsonFeedbackResp);

      // Ensure interviewData is valid and mockId is present
      if (!interviewData || !interviewData.mockId) {
        console.error('Invalid interview data');
        setLoading(false);
        return;
      }

      const userAnswerData = {
        mockIdRef: interviewData.mockId,
        question: jsonMockResp[activeQuestionIndex]?.question,
        correctAns: jsonMockResp[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy')
      };

      console.log('Inserting user answer:', userAnswerData);

      const resp = await db.insert(UserAnswer)
        .values(userAnswerData);

      if (resp) {
        toast('User Answer recorded successfully');
        setUserAnswer('');
        setResults([]);
      } else {
        console.error('Failed to insert user answer into database');
      }
    } catch (error) {
      console.error('Error updating user answer:', error);
      toast.error('Failed to record the answer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
        <Image src={'/webcam.png'} width={200} height={200} className='absolute' />
        <Webcam
          mirrored={true}
          style={{
            height: 500,
            width: 500,
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline" className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ?
          <h2 className='text-red-600 animate-pulse flex gap-2 items-center'>
            <StopCircle />Stop Recording
          </h2>
          :
          <h2 className='text-primary flex gap-2 items-center'>
            <Mic /> Record Answer</h2>}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
