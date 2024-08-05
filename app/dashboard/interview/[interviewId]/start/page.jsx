"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import Banner from './_components/banner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [jsonMockResp, setJsonMockResp] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    setInterviewData(null);
    setMockInterviewQuestion([]);
    setJsonMockResp([]);
    setActiveQuestionIndex(0);
    GetInterviewDetails();
  }, [params.interviewId]);

  const GetInterviewDetails = async () => {
    try {
      const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result.length > 0) {
        const jsonMockRespLocal = JSON.parse(result[0].jsonMockResp);
        console.log("jsonMockResp:", jsonMockRespLocal); // Log jsonMockResp

        if (jsonMockRespLocal.questions && Array.isArray(jsonMockRespLocal.questions)) {
          console.log("Valid jsonMockResp format");
          setMockInterviewQuestion(jsonMockRespLocal.questions);
          setInterviewData(result[0]);
          setJsonMockResp(jsonMockRespLocal.questions); // Set jsonMockResp state
        } else {
          console.error("Invalid jsonMockResp format:", jsonMockRespLocal);
        }
      } else {
        console.error('No interview data found');
      }
    } catch (error) {
      console.error('Error fetching interview details:', error);
    }
  };

  return (
    <div>
      <div className='pt-4'>
        <Banner/>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          jsonMockResp={jsonMockResp}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
          jsonMockResp={jsonMockResp}
        />
      </div>
      <div className='flex justify-end gap-6'>
        {activeQuestionIndex > 0 &&
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>}
        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 &&
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 &&
          <Link href={'/dashboard/interview/' + interviewData?.mockId + "/feedback"}>
            <Button>End Interview</Button>
          </Link>}
      </div>
    </div>
  )
}

export default StartInterview;
