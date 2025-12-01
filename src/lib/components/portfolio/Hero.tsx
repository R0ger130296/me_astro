import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '../ui';

const codeLines = [
  'import { useState, useEffect } from "react";',
  '',
  'const Portfolio = () => {',
  '  const [mounted, setMounted] = useState(false);',
  '',
  '  useEffect(() => {',
  '    setMounted(true);',
  '  }, []);',
  '',
  '  return (',
  '    <div className="min-h-screen bg-gradient-to-b">',
  '      <Header />',
  '      <Hero />',
  '      <About />',
  '      <Experience />',
  '      <Skills />',
  '      <Projects />',
  '    </div>',
  '  );',
  '};',
  '',
  'export default Portfolio;',
];

const typingSpeed = 40;
const arrowSymbol = '=>';
const openBrace = '{';
const closeBrace = '}';

export const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [displayedCode, setDisplayedCode] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const typingRef = useRef<{ currentLine: number; currentChar: number; timeoutId: NodeJS.Timeout | null }>({
    currentLine: 0,
    currentChar: 0,
    timeoutId: null,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let displayedText = '';

    const typeCode = () => {
      if (typingRef.current.currentLine >= codeLines.length) {
        // Restart after a delay
        typingRef.current.timeoutId = setTimeout(() => {
          displayedText = '';
          typingRef.current.currentLine = 0;
          typingRef.current.currentChar = 0;
          setDisplayedCode('');
          typeCode();
        }, 5000);
        return;
      }

      const line = codeLines[typingRef.current.currentLine];
      
      // If line is empty, add newline immediately
      if (line === '') {
        displayedText += '\n';
        typingRef.current.currentLine++;
        typingRef.current.currentChar = 0;
        setDisplayedCode(displayedText);
        typingRef.current.timeoutId = setTimeout(typeCode, 200);
        return;
      }

      if (typingRef.current.currentChar < line.length) {
        displayedText += line[typingRef.current.currentChar];
        typingRef.current.currentChar++;
        setDisplayedCode(displayedText);
        // Variable speed: slower for special characters
        const char = line[typingRef.current.currentChar - 1];
        const delay = char.match(/[{}();,]/) ? typingSpeed * 1.5 : typingSpeed;
        typingRef.current.timeoutId = setTimeout(typeCode, delay);
      } else {
        displayedText += '\n';
        typingRef.current.currentLine++;
        typingRef.current.currentChar = 0;
        setDisplayedCode(displayedText);
        // Pause longer between lines
        typingRef.current.timeoutId = setTimeout(typeCode, 300);
      }
    };

    // Start typing after a short delay
    typingRef.current.timeoutId = setTimeout(typeCode, 500);

    // Blinking cursor animation
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(cursorInterval);
      if (typingRef.current.timeoutId) {
        clearTimeout(typingRef.current.timeoutId);
      }
    };
  }, [mounted]);

  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 pt-20 sm:pt-24">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Floating tech icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && (
          <>
            <div className="absolute top-20 left-10 text-secondary-400/20 animate-float">
              <Icon name="Code" size={40} />
            </div>
            <div className="absolute top-40 right-20 text-secondary-400/20 animate-float" style={{ animationDelay: '1s' }}>
              <Icon name="Rocket" size={32} />
            </div>
            <div className="absolute bottom-32 left-1/4 text-secondary-400/20 animate-float" style={{ animationDelay: '1.5s' }}>
              <Icon name="Sparkles" size={36} />
            </div>
            <div className="absolute bottom-20 right-1/3 text-secondary-400/20 animate-float" style={{ animationDelay: '2s' }}>
              <Icon name="Star" size={28} />
            </div>
          </>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        {mounted && (
          <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-fade-in">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary-500/20 rounded-full mb-6 border border-secondary-400/30">
                <Icon name="Code" size={16} color="#14b8a6" />
                <span className="text-sm font-medium text-secondary-300">Frontend Developer</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                <span className="bg-gradient-to-r from-white via-secondary-200 to-white bg-clip-text text-transparent">
                  Creando Experiencias
                </span>
                <br />
                <span className="text-secondary-400">Digitales</span>
              </h1>

              <p className="text-lg sm:text-xl text-primary-200 mb-8 leading-relaxed">
                Transformando ideas en interfaces interactivas y funcionales con React, Astro y tecnologías modernas.
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {['React', 'Astro', 'TypeScript', 'Tailwind'].map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Code Editor */}
            <div className="relative animate-slide-up">
              <div className="relative bg-primary-950 rounded-xl lg:rounded-2xl shadow-2xl border border-primary-700/50 overflow-hidden" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
                {/* Editor Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-primary-900/90 border-b border-primary-700/50">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"></div>
                    </div>
                    <div className="flex items-center gap-2 ml-3">
                      <Icon name="Code" size={14} color="#94a3b8" />
                      <span className="text-xs text-primary-300 font-mono">Portfolio.tsx</span>
                      <span className="text-xs text-primary-500/60">•</span>
                      <span className="text-xs text-primary-500/60">TypeScript React</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-secondary-500/20 rounded border border-secondary-500/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary-400 animate-pulse"></div>
                      <span className="text-xs text-secondary-300 font-medium">Typing...</span>
                    </div>
                  </div>
                </div>

                {/* Code Content */}
                <div className="relative bg-primary-950 overflow-hidden" style={{ height: '360px', maxHeight: '360px' }}>
                  <div className="font-mono text-xs sm:text-sm leading-relaxed text-primary-100 h-full overflow-y-auto scrollbar-thin p-4 sm:p-5 pb-14">
                    <pre className="whitespace-pre-wrap m-0">
                      {displayedCode.split('\n').map((line, lineIndex) => {
                        const lineNumber = lineIndex + 1;
                        const isLastLine = lineIndex === displayedCode.split('\n').length - 1;
                        const fullLine = line;
                        
                        // Enhanced syntax highlighting
                        const getCharClass = (char: string, index: number): string => {
                          // Brackets and parentheses
                          if (char.match(/[{}()]/)) return 'text-pink-400';
                          if (char.match(/[\[\]]/)) return 'text-purple-300';
                          
                          // Strings
                          if (char.match(/["'`]/)) return 'text-green-300';
                          
                          // Keywords detection
                          const beforeChar = fullLine.substring(0, index);
                          const afterChar = fullLine.substring(index);
                          
                          // Import/export keywords
                          if (fullLine.trim().startsWith('import') || fullLine.trim().startsWith('export')) {
                            if (beforeChar.match(/^(import|export)\s*$/)) return 'text-blue-400';
                            if (afterChar.match(/^from/)) return 'text-blue-400';
                            if (char.match(/["'`]/)) return 'text-green-300';
                          }
                          
                          // Const/let/function
                          if (fullLine.includes('const') || fullLine.includes('let')) {
                            if (beforeChar.match(/^(const|let)\s+$/)) return 'text-blue-400';
                            if (afterChar.match(/^=\s*\(/)) return 'text-yellow-300';
                            if (afterChar.match(/^=\s*\{/)) return 'text-yellow-300';
                          }
                          
                          // useState/useEffect hooks
                          if (fullLine.includes('useState') || fullLine.includes('useEffect')) {
                            if (beforeChar.match(/use(State|Effect)/)) return 'text-purple-400';
                          }
                          
                          // JSX tags
                          if (fullLine.includes('<') || fullLine.includes('</')) {
                            if (char === '<' || char === '>' || char === '/') return 'text-pink-400';
                            if (beforeChar.match(/<[^>]*$/)) return 'text-blue-300';
                          }
                          
                          // className prop
                          if (fullLine.includes('className')) {
                            if (beforeChar.match(/className\s*=\s*"/)) return 'text-yellow-400';
                            if (char.match(/["'`]/) && beforeChar.includes('className')) return 'text-green-300';
                          }
                          
                          // Return keyword
                          if (fullLine.trim().startsWith('return')) {
                            if (beforeChar.match(/^return\s*$/)) return 'text-blue-400';
                          }
                          
                          return 'text-primary-200';
                        };
                        
                        return (
                          <div key={lineIndex} className="flex hover:bg-primary-900/20 transition-colors group">
                            <span className="text-primary-500/40 mr-4 select-none w-8 text-right shrink-0 font-normal group-hover:text-primary-500/60">
                              {lineNumber}
                            </span>
                            <span className="flex-1">
                              {line.split('').map((char, charIndex) => (
                                <span key={charIndex} className={getCharClass(char, charIndex)}>
                                  {char === ' ' ? '\u00A0' : char}
                                </span>
                              ))}
                              {isLastLine && (
                                <span
                                  className="inline-block w-2 h-4 bg-secondary-400 ml-1"
                                  style={{ 
                                    opacity: showCursor ? 1 : 0,
                                    animation: showCursor ? 'blink 1s infinite' : 'none'
                                  }}
                                ></span>
                              )}
                            </span>
                          </div>
                        );
                      })}
                      {displayedCode === '' && (
                        <div className="flex text-primary-500/30">
                          <span className="text-primary-500/30 mr-4 w-8 text-right shrink-0">1</span>
                          <span className="flex-1 italic">// Escribiendo código...</span>
                        </div>
                      )}
                    </pre>
                  </div>

                  {/* Code stats */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-primary-900/60 border-t border-primary-800/50 flex items-center justify-between text-xs text-primary-400 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <Icon name="CheckCircle" size={12} color="#64748b" />
                        <span>No errors</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Icon name="Code" size={12} color="#64748b" />
                        <span>TS React</span>
                      </span>
                      <span className="text-primary-500/40">•</span>
                      <span className="text-primary-500/60">
                        {displayedCode.split('\n').filter(l => l.trim()).length} lines
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-secondary-400/80">●</span>
                      <span className="text-secondary-400">Live</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-secondary-500/20 via-primary-500/20 to-secondary-500/20 rounded-xl blur-xl -z-10 animate-pulse"></div>
            </div>
          </div>
        )}
      </div>

      {/* Gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
    </section>
  );
};

