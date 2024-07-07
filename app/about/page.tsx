'use client';
import { useState ,useEffect} from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AboutDatas } from '@/aboutdata';
import { Option, Info } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const About = () => {
  const router = useRouter();
  const { id, infoId } = useParams();

  const ide = typeof id=== 'string' ? parseInt(id, 10) : undefined;

  const [selectedOption, setSelectedOption] = useState<Option>(() => {
    const initialOption = AboutDatas.options.find(option => option.id === ide) || AboutDatas.options[0];
    return initialOption;
  });

  const [selectedInfo, setSelectedInfo] = useState<Info>(() => {
    const initialInfo = selectedOption.info.find(info => info.id === infoId) || selectedOption.info[0];
    return initialInfo;
  });

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setSelectedInfo(option.info[0]);
    router.push(`/about/${option.id}`);
  };

  const handleInfoClick = (info: Info) => {
    setSelectedInfo(info);
    router.push(`/about/${selectedOption.id}/${info.id}`);
  };
  const user = useSelector((state: RootState) => state.user);


  useEffect(() => {
    if (!user.email) {
      router.push('/login?redirect=/about');
    }
  }, [user, router]);

  return (

    <div >
      <h1 style={{textAlign:'center',color:' rgb(155, 135, 21)',fontWeight:'bolder',fontSize:'50px'}}>About </h1>
      <div style={{ display:'flex'}}>
        <div style={{ flex: 1, paddingRight: '20px' }}>
          {AboutDatas.options.map((option) => (
            <div key={option.id}>
              <h2>
                <a onClick={() => handleOptionClick(option)}>{option.name}</a>
              </h2>
            </div>
          ))}
        </div>
        <div style={{ flex: 2 }}>
          {selectedOption.info.map((data) => (
            <div >
              <h2>
                <a onClick={() => handleInfoClick(data)}>{data.name}</a>
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

export default About;
