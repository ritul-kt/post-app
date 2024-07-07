'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AboutDatas } from '@/aboutdata';
import { Option, Info } from '@/types';

const AboutId = () => {
  const router = useRouter();
  const { id } = useParams();
  const option = AboutDatas.options.find((opt) => opt.id.toString() === id);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(option);
  const [selectedInfo, setSelectedInfo] = useState<Info | undefined>(option?.info[0]);
  const [highlightedOption, setHighlightedOption] = useState<Option | undefined>(option);


  useEffect(() => {
    if (!selectedOption) {
      router.push(`/about`);
    }
  }, [selectedOption, router]);

  if (!selectedOption) {
    return null; // or loading spinner
  }

  const handleInfoClick = (info: Info) => {
    setSelectedInfo(info);
    router.push(`/about/${selectedOption.id}/${info.id}`);
  };

  return (
    <div>
      <h1 style={{textAlign:'center',color:' rgb(155, 135, 21)',fontWeight:'bolder',fontSize:'50px'}}>About</h1>
      <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, paddingRight: '20px' }}>
          {AboutDatas.options.map((option) => (
            <div key={option.id}>
              <h2>
                <a  onClick={() => router.push(`/about/${option.id}`)}
                     style={{
                        cursor: 'pointer',
                        color: highlightedOption?.id === option.id ? ' rgb(155, 135, 21)' : 'inherit',
                        fontWeight: highlightedOption?.id === option.id ? 'bold' : 'normal',}}>
                        {option.name}
                </a>
              </h2>
            </div>
          ))}
        </div>
        <div style={{ flex: 2 }}>
          {selectedOption.info.map((data) => (
            <div key={data.id}>
              <h2>
                <a  onClick={() => router.push(`/about/${selectedOption.id}/${data.id}`)}>{data.name}</a>
              </h2>
            </div>
          ))}
        </div>
        <div style={{ flex: 2 }}>
        </div>
      </div>
    </div>
  );
};

export default AboutId;
