
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AboutDatas } from '@/aboutdata';
import { Option, Info } from '@/types';

const AboutInfoId = () => {
  const router = useRouter();
  const { id, infoId } = useParams();
  const option = AboutDatas.options.find((opt) => opt.id.toString() === id);
  const info = option?.info.find((inf) => inf.id.toString() === infoId);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(option);
  const [selectedInfo, setSelectedInfo] = useState<Info | undefined>(info);
  const [highlightedOption, setHighlightedOption] = useState<Option | undefined>(option);
  const [highlightedInfo, setHighlightedInfo] = useState<Info | undefined>(info);

  useEffect(() => {
    if (!selectedOption || !selectedInfo) {
      router.push(`/about`);
    }
  }, [selectedOption, selectedInfo, router]);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setHighlightedOption(option);
    router.push(`/about/${option.id}`);
  };

  const handleInfoClick = (info: Info) => {
    setSelectedInfo(info);
    setHighlightedInfo(info);
    router.push(`/about/${selectedOption?.id}/${info.id}`);
  };

  if (!selectedOption || !selectedInfo) {
    return null;
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: ' rgb(155, 135, 21)', fontWeight: 'bolder', fontSize: '50px' }}>About</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, paddingRight: '20px' }}>
          {AboutDatas.options.map((option) => (
            <div key={option.id}>
              <h2>
                <a
                  onClick={() => handleOptionClick(option)}
                  style={{
                    cursor: 'pointer',
                    color: highlightedOption?.id === option.id ? ' rgb(155, 135, 21)' : 'inherit',
                    fontWeight: highlightedOption?.id === option.id ? 'bold' : 'normal'
                  }}
                >
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
                <a
                  onClick={() => handleInfoClick(data)}
                  style={{
                    cursor: 'pointer',
                    color: highlightedInfo?.id === data.id ? ' rgb(155, 135, 21)' : 'inherit',
                    fontWeight: highlightedInfo?.id === data.id ? 'bold' : 'normal'
                  }}
                >
                  {data.name}
                </a>
              </h2>
            </div>
          ))}
        </div>
        <div style={{ flex: 2 }}>
          <h3>Details</h3>
          <p>{`${selectedOption.id}/${selectedInfo.id}`}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutInfoId;

