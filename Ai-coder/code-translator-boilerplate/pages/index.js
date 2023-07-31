import { useState } from 'react';
import CodeWindow from '@/components/CodeWindow';
import background from '@/public/bg1.jpg';
import twitter_image from '@/public/twitter.png';
import Image from 'next/image';

export default function Home() {

  const [loading, setLoading] = useState(false);
  const [inputCode, setInputCode] = useState(``);
  const [outputCode, setOutputCode] = useState('');
  const [inputLanguage, setInputLanguage] = useState('Natural Language');
  const [outputLanguage, setOutputLanguage] = useState('Python');


  const handleInputLanguageChange = (option) => {
    setInputLanguage(option.value)
    setInputCode('')
    setOutputCode('')
  }

  const handleOutputLanguageChange = (option) => {
    setOutputLanguage(option.value)
    setOutputCode('')
  }

  const handleTranslate = async () => {
    const maxCodeLength = 6000;

    if (inputLanguage === outputLanguage) {
      alert('Please select different languages.');
      return;
    }

    if (!inputCode) {
      alert('Please enter some code.');
      return;
    }

    if (inputCode.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`,
      );
      return;
    }

    setLoading(true);
    setOutputCode('');

    const controller = new AbortController();

    const body = {
      inputLanguage,
      outputLanguage,
      inputCode
    };

    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const data = response.body;

    if (!data) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      setOutputCode((prevCode) => prevCode + chunkValue);
    }

    setLoading(false);
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <Image className='fixed left-0 top-0 w-screen h-screen -z-10' src={background} alt='Background' />
      <h1 className='font-sans text-5xl justify-center font-bold pt-5 text-white'>Code Translator</h1>

      <h2 className="font-sans mt-5 text-xl justify-center text-slate-400 mb-10 text-white">Translate your code to another programming language. With just a click.</h2>
      {/* input code window */}
      <CodeWindow code={inputCode} setCode={setInputCode} loading={loading} handleLanguageChange={handleInputLanguageChange} language={inputLanguage} />

      {/* translate button */}
      <button
  disabled={loading}
  className='border-white p-3 m-2 flex justify-center items-center rounded-lg text-white font-semibold'
  onClick={handleTranslate}
  style={{
    background: 'linear-gradient(45deg, rgba(142, 142, 169, 1) 0%, rgba(61, 61, 7, 1) 0%)',
    backgroundSize: '200%',
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat',
  }} 
>
  {loading ? 'Translating...' : 'Translate 🔁'}
</button>

      {/* output code window */}
      <CodeWindow code={outputCode} setCode={setOutputCode} loading={loading} handleLanguageChange={handleOutputLanguageChange} language={outputLanguage} />
      <p className="font-sans mt-5 pb-5">Powered by <a className="ref-link text-[#C53AAE]" href="https://github.com/Mohammed-Arif-3" target="_blank" rel="noopener noreferrer">Mohammed Arif 🔮</a></p>
      <a className=' flex font-sans mb-5 p-1 items-center' href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out this awesome code translator!')}&url=${encodeURIComponent('https://github.com/Mohammed-Arif-3/Ai-Coder.git')}`} target="_blank" rel="noopener noreferrer"><Image className='mr-0.5 justify-center' src={twitter_image} alt="Twitter" />Support me on Twitter</a>
    </div>

  )
}
