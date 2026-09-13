import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { RefreshCw } from 'lucide-react';

export interface CaptchaHandle {
  reset: () => void;
  isValid: () => boolean;
}

interface CaptchaProps {
  onValidate: (isValid: boolean) => void;
  error?: string;
}

export const Captcha = forwardRef<CaptchaHandle, CaptchaProps>(({ onValidate, error }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let text = '';
    for (let i = 0; i < 6; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(text);
    setUserInput('');
    onValidate(false);
    drawCaptcha(text);
  };

  const drawCaptcha = (text: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // add noise
    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.5)`;
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // add some lines noise
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.5)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }
    
    // add text
    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = '#1f2937';
    ctx.textBaseline = 'middle';
    
    // add some jitter
    let x = 15;
    for (let i = 0; i < text.length; i++) {
      ctx.save();
      const y = (canvas.height / 2) + Math.random() * 8 - 4;
      const angle = (Math.random() * 0.4) - 0.2;
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
      x += 22;
    }
  };

  useEffect(() => {
    generateCaptcha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserInput(val);
    onValidate(val === captchaText);
  };

  useImperativeHandle(ref, () => ({
    reset: () => {
      generateCaptcha();
    },
    isValid: () => {
      return userInput === captchaText;
    }
  }));

  return (
    <div className="flex flex-col space-y-2 w-full mt-4 bg-white/50 p-4 rounded-xl border border-[var(--lp-border)]">
      <label className="text-sm font-semibold text-[var(--lp-heading)] block mb-1">
        Security Verification <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <canvas 
            ref={canvasRef} 
            width={160} 
            height={46} 
            className="rounded-lg border border-gray-300 bg-gray-50 shadow-sm"
          ></canvas>
          <button 
            type="button" 
            onClick={generateCaptcha}
            className="text-[var(--lp-accent)] hover:text-white p-2.5 border border-[var(--lp-accent)] rounded-lg hover:bg-[var(--lp-accent)] flex items-center justify-center transition-colors shadow-sm"
            title="Refresh CAPTCHA"
          >
            <RefreshCw size={20} />
          </button>
        </div>
        <div className="flex-1 w-full">
          <input 
            type="text" 
            value={userInput} 
            onChange={handleChange} 
            placeholder="Type characters here" 
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none transition-all font-medium text-[var(--lp-heading)] bg-white ${
              error ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[var(--lp-border)] focus:border-[var(--lp-accent)]'
            }`}
            required
            autoComplete="off"
          />
        </div>
      </div>
      {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
    </div>
  );
});

Captcha.displayName = 'Captcha';
