import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactHowler from 'react-howler';
import Confetti from 'react-confetti';
import { Link } from 'react-scroll';

const AUDIO_SRC = '/audio/paro.mp3';
const LAUNCH_DATE = new Date('2025-08-18T00:00:00');

const photos = [
  { src: '/images/photo1.jpg', caption: 'Our first trip ✈️🌄', description: 'The adventure that started it all 💕' },
  { src: '/images/photo2.jpg', caption: 'That rainy day 🌧️☔', description: 'Bike ride in the rain, just us two 💖' },
  { src: '/images/photo3.jpg', caption: 'The "Us" after a big fight 😅❤️', description: 'Love always wins, even after storms 🌈' },
  { src: '/images/photo4.jpeg', caption: 'That magical first kiss 😘💫', description: 'One of my favourite moments with you — those 10 magical minutes we had together 💕' },
  { src: '/images/photo5.jpeg', caption: 'Bangalore adventures 🌆🚴‍♂️', description: 'The day my transfer got approved, I booked a flight with extra money just to see you. You skipped class to go out with me — every special moment in our relationship seems to happen on the 23rd, making it unforgettable 💕💕' },
  { src: '/images/photo6.jpeg', caption: 'Valentine\'s vibes ❤️🌹', description: 'Thanks to Renita we got this cute photo — the heart-shaped pizza, our matching red outfits, and that perfect moment together. A memory I will always cherish 💕' },
  { src: '/images/photo7.jpeg', caption: 'Silly selfie moments 🤪📸', description: 'Usually a day out with my sleeping beauty, but even after a hectic day, she happily came out with me without proper sleep — your commitment to us is something I\'ll always cherish 💖' },
  { src: '/images/photo8.jpeg', caption: 'Movie date 🍿🎬', description: 'You came all dressed in a saree just for me 💕 We watched Officer on Duty together and captured these lovely photos — such a special memory!' },
  { src: '/images/photo9.jpeg', caption: 'Paragon dayyy 🎉🎈', description: 'Spent a lovely day together — first we bought the helmet 🛵💖, then enjoyed some quality time at Cubbon Park 🌳⏰. A memory I\'ll always treasure!' },
  { src: '/images/photo10.jpeg', caption: 'Last meet before graduation 🎓💔', description: 'When you planned the date, I was so happy — the locations, everything was perfect. The only sad part was I didn\'t realize it would be our last meeting before your graduation 🎓💔' },
  { src: '/images/photo11.jpeg', caption: 'My birthday bash 🥳🎂', description: 'I thought you\'d be busy with college and everything, but somehow you found an entire day just for me — your effort and love made it so special 💖✨' },
  { src: '/images/photo12.jpeg', caption: 'Simple date, pure joy 🌸☕', description: 'Everyday magic with you ✨💑💛' },
  { src: '/images/photo13.jpeg', caption: '1 year of love 💕🥂', description: 'Our anniversary that we didn\'t even think would happen — a random swipe, a missed flight, and despite many plans to break up, it ended up being something so beautiful. Thank you, Mann, for everything ❤️✨ I\'m still keeping that letter from you in my cupboard in a safe place; I\'ll hold it whenever I miss you 💌Our first anniversary, unforgettable' },
];

export default function BirthdaySurprise() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [unlocked, setUnlocked] = useState(false);
  const howlerRef = useRef(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showTapOverlay, setShowTapOverlay] = useState(false);
  const [reelPlaying, setReelPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const heartsContainerRef = useRef(null);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [playPaperSound, setPlayPaperSound] = useState(false);

  // Enhanced floating hearts effect
  useEffect(() => {
    if (!heartsContainerRef.current) return;

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerHTML = ['❤️', '💖', '💕', '✨', '🎉'][Math.floor(Math.random() * 5)];
      
      const size = Math.random() * 20 + 10;
      heart.style.width = `${size}px`;
      heart.style.height = `${size}px`;
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.opacity = Math.random() * 0.6 + 0.4;
      heart.style.animationDuration = `${Math.random() * 6 + 6}s`;
      heart.style.animationDelay = `${Math.random() * 5}s`;

      heartsContainerRef.current.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 12000);
    };

    const interval = setInterval(createHeart, 300);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer with music control
  useEffect(() => {
    const timer = setInterval(() => {
      const tl = getTimeLeft();
      setTimeLeft(tl);
      if (!tl && !unlocked) {
        setUnlocked(true);
        if (!userInteracted) {
          setShowTapOverlay(true);
        } else {
          setPlaying(true);
          handleCelebrate();
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [unlocked, userInteracted]);

  // Window resize handler
  useEffect(() => {
    function onResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Music controls with smooth transition
  useEffect(() => {
    if (howlerRef.current) {
      howlerRef.current.howler.volume(volume);
    }
  }, [volume]);

  function getTimeLeft() {
    const now = new Date();
    const diff = LAUNCH_DATE - now;
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  }

  function handleCelebrate() {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 8000);
  }

  function handleVolumeChange(e) {
    setVolume(parseFloat(e.target.value));
  }

  const handleOpenLetter = () => {
    if (!isLetterOpen) {
      setPlayPaperSound(true);
      setIsLetterOpen(true);
    }
  };

  // Animated Birthday Heading Component
  const BirthdayHeading = () => (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-center"
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [-2, 1, -1, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <h1 className="text-4xl sm:text-6xl font-bold mb-2">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
            Happy Birthday
          </span>
          <motion.span 
            className="block mt-2 text-3xl sm:text-5xl font-medium text-gray-800"
          >
            Annlin Autokaran Akka Mariyama
          </motion.span>
        </h1>
      </motion.div>
    </motion.div>
  );

  if (timeLeft) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-rose-50 via-amber-50 to-white text-gray-900 relative overflow-hidden">
        <div ref={heartsContainerRef} className="hearts-bg" />
        
        {!userInteracted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setUserInteracted(true)}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="text-white text-center p-8 max-w-md"
            >
              <h2 className="text-3xl font-bold mb-4">🎵 Tap to Begin the Surprise 🎵</h2>
              <p className="text-lg">A special birthday experience awaits...</p>
            </motion.div>
          </motion.div>
        )}

        <ReactHowler 
          src={AUDIO_SRC}
          playing={playing && !reelPlaying}
          loop={true}
          volume={volume}
          ref={howlerRef}
        />

        <ReactHowler
          src="/sounds/paper-open.mp3"
          playing={playPaperSound}
          onEnd={() => setPlayPaperSound(false)}
          volume={0.3}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600">
            Surprise Unlocks In
          </h1>
          <div className="text-4xl font-mono bg-white/80 rounded-2xl shadow-lg p-6 backdrop-blur-sm">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </div>
          <p className="mt-6 text-gray-600 animate-pulse">
            Enjoy the music while you wait 💖
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-amber-50 to-white text-gray-900 relative">
      <div ref={heartsContainerRef} className="hearts-bg" />
      
      <AnimatePresence>
        {showTapOverlay && !userInteracted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setUserInteracted(true)}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="text-white text-center p-8 max-w-md"
            >
              <h2 className="text-3xl font-bold mb-4">🎂 Your Surprise is Ready! 🎂</h2>
              <p className="text-lg">Tap anywhere to begin the celebration</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ReactHowler 
        src={AUDIO_SRC}
        playing={playing && !reelPlaying}
        loop={true}
        volume={volume}
        ref={howlerRef}
      />

      {showConfetti && (
        <Confetti 
          width={dimensions.width} 
          height={dimensions.height} 
          recycle={false}
          numberOfPieces={500}
        />
      )}

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-rose-100/30 to-pink-100/30 backdrop-blur-sm"
        />
        
        <div className="text-center px-6 z-10">
          <BirthdayHeading />
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 max-w-xl mx-auto text-gray-600 text-sm sm:text-base"
          >
            A little surprise from me — a tiny story of us, wrapped with love.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPlaying(p => !p)} 
                className="px-4 py-2 rounded-full bg-white/90 border border-rose-200 shadow-sm hover:shadow transition-all"
              >
                {playing ? 'Pause Music' : 'Play Music'}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 accent-rose-500"
              />
            </div>
            
            <button 
              onClick={() => { setPlaying(true); handleCelebrate(); }} 
              className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Celebrate 🎉
            </button>
          </motion.div>
        </div>
      </section>

      {/* Photo Timeline */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-center mb-12 text-rose-700"
        >
          Our Beautiful Memories
        </motion.h2>
        
        <div className="space-y-16">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="group flex flex-col sm:flex-row items-center gap-8 relative"
            >
              <div className={`w-full sm:w-1/2 ${index % 2 === 0 ? '' : 'sm:order-2'}`}>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <h3 className="text-white font-bold text-lg">{photo.caption}</h3>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className={`w-full sm:w-1/2 ${index % 2 === 0 ? '' : 'sm:order-1'}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-rose-100"
                >
                  <h3 className="font-bold text-rose-700 text-xl mb-2">{photo.caption}</h3>
                  <p className="text-gray-700 leading-relaxed">{photo.description}</p>
                  
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: [0, 1, 0], 
                        y: [-10, -40 - (i * 10)],
                        x: Math.random() > 0.5 ? [0, 10] : [0, -10]
                      }}
                      transition={{ 
                        duration: 3 + i, 
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                      className="absolute text-rose-400 text-xl"
                      style={{
                        left: `${10 + (i * 20)}%`,
                        bottom: '0%'
                      }}
                    >
                      {['❤️', '💖', '💕'][i % 3]}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Love Letter Section */}
      <section className="py-20 px-4 bg-rose-50/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold text-center mb-8 text-rose-700"
          >
            A Letter From My Heart
          </motion.h2>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-rose-100 rounded-lg p-1 shadow-lg">
              <motion.div 
                animate={{ rotateX: [0, 180] }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute top-0 left-0 right-0 h-16 bg-rose-200 origin-top rounded-t-lg"
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 50% 50%)',
                  zIndex: 10 
                }}
              />
              
              <motion.div
                initial={{ y: 0 }}
                whileHover={{ y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-inner cursor-pointer"
                onClick={handleOpenLetter}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjA1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+CiAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+CiAgPC9maWx0ZXI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSIvPgo8L3N2Zz4=')] opacity-10 pointer-events-none"></div>
                  
                  <div className="font-[DancingScript] text-lg leading-relaxed">
                    <p className="mb-4">To Annlin,</p>
                    <p className="mb-4">
                      I was going to write something grand for your birthday, but then I remembered the way you smile when you think no one's watching—that small, quiet thing that feels more real than anything else.
                    </p>
                    <p className="mb-4">
                      Funny how the best parts of you are the ones you don't even try to show. Like how you listen with your whole body leaning in, or how you'll remember a throwaway detail from months ago and mention it like it's nothing. You're terrible at accepting praise, but God, you deserve it.
                    </p>
                    <p className="mb-4">
                      I know I'm not always easy. I know I take more than I give sometimes. But you? You stay. Not in some dramatic, sweeping gesture way—just in the steady, stubborn rhythm of your presence. And maybe that's why it's so easy to miss how much it actually means.
                      Today, I hope you let yourself be celebrated. Not because it's your birthday, but because you're the rare kind of person who makes ordinary moments feel like gifts.
                    </p>
                    <p>With all my love,</p>
                    <p>Your BF /Future Husband</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
              onClick={handleOpenLetter}
            >
              <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-xl">💌</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-white to-rose-50 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600"
          >
            Happy Birthday, My Love 🎉
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mb-8 text-gray-600 max-w-xl mx-auto"
          >
            Tap the button below to make it rain confetti!
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => { setPlaying(true); handleCelebrate(); }} 
              className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
            >
              Shower Me With Love 💖
            </button>
            <a 
              href="#reelVideo" 
              className="px-6 py-3 rounded-full bg-white/90 border border-rose-100 hover:border-rose-200 cursor-pointer shadow-sm hover:shadow transition-all"
            >
              Your Gift Awaits 🎁🎥
            </a>
          </motion.div>
        </div>
      </section>

      {/* Video Reel Section */}
      <section id="reelVideo" className="py-20 px-4 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-md mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-semibold mb-8 text-rose-700"
          >
            Our Special Moments Reel 🎥
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[9/16] mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <video 
              src="/videos/surprise-reel.mp4" 
              controls
              onPlay={() => setReelPlaying(true)}
              onPause={() => setReelPlaying(false)}
              className="w-full h-full object-cover"
              poster="/images/video-poster.jpg"
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-gray-600"
          >
            A collection of our most precious moments together 💕
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 bg-white/50 backdrop-blur-sm">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Made with ❤️ by Aevin — your (sometimes irritating) boyfriend
        </motion.p>
      </footer>
    </div>
  );
}