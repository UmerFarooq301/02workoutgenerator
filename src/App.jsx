import React, { useState, useEffect } from 'react';

const WorkoutGenerator = () => {
  const [category, setCategory] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [time, setTime] = useState('');
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [challengeMode, setChallengeMode] = useState(false);
  const [pastCompletions, setPastCompletions] = useState({
    Normal: 0,
    Athlete: 0,
    Senior: 0,
  });
  const [bgIndex, setBgIndex] = useState(0);

  const gymBackgrounds = [
    'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop")',
    'url("https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=2070&auto=format&fit=crop")',
    'url("https://images.unsplash.com/photo-1549060279-7e168fcee760?q=80&w=2070&auto=format&fit=crop")',
    'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop")', 
    'url("https://images.unsplash.com/photo-1593164842264-0d6c7cba6541?q=80&w=2070&auto=format&fit=crop")', 
    'url("https://images.unsplash.com/photo-1571003123892-9f3ac2c282b7?q=80&w=2070&auto=format&fit=crop")', 
    'url("https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2070&auto=format&fit=crop")',
    'url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop")',
    'url("https://images.unsplash.com/photo-1605296867724-2a516c2f0d7c?q=80&w=2070&auto=format&fit=crop")', 
    'url("https://images.unsplash.com/photo-1558611848-73f7eb80f2d9?q=80&w=2070&auto=format&fit=crop")',
  ];

  const [loadedImages, setLoadedImages] = useState([]);
  useEffect(() => {
    const preloadImages = gymBackgrounds.map((bg) => {
      const url = bg.replace('url("', '').replace('")', '');
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url);
        img.onerror = () => resolve(null);
      });
    });

    Promise.all(preloadImages).then((results) => {
      const validImages = results.filter((url) => url !== null).map((url) => `url("${url}")`);
      setLoadedImages(validImages.length > 0 ? validImages : gymBackgrounds);
    });
  }, []);

  useEffect(() => {
    if (loadedImages.length === 0) return;

    const interval = setInterval(() => {
      setBgIndex((prev) => {
        const newIndex = (prev + 1) % loadedImages.length;
        console.log(`Changing background to index ${newIndex}: ${loadedImages[newIndex]}`);
        return newIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [loadedImages]);

  const exercises = {
    Normal: {
      Beginner: [
        { name: 'Push-ups', baseReps: 10 },
        { name: 'Jumping Jacks', baseReps: 25 },
        { name: 'Squats', baseReps: 15 },
        { name: 'Plank', baseReps: '20s' },
        { name: 'High Knees', baseReps: 20 },
      ],
      Intermediate: [
        { name: 'Burpees', baseReps: 12 },
        { name: 'Mountain Climbers', baseReps: 30 },
        { name: 'Lunges', baseReps: 20 },
        { name: 'Side Plank', baseReps: '30s' },
        { name: 'Jump Squats', baseReps: 15 },
      ],
      Advanced: [
        { name: 'Handstand Push-ups', baseReps: 8 },
        { name: 'Box Jumps', baseReps: 15 },
        { name: 'Single-Leg Squats', baseReps: 12 },
        { name: 'Plank with Leg Lift', baseReps: '40s' },
        { name: 'Spiderman Push-ups', baseReps: 10 },
      ],
    },
    Athlete: {
      Beginner: [
        { name: 'Sprint Intervals', baseReps: '20s' },
        { name: 'Lateral Hops', baseReps: 20 },
        { name: 'Bodyweight Squats', baseReps: 15 },
        { name: 'Dynamic Stretching', baseReps: '30s' },
        { name: 'Agility Ladder', baseReps: 20 },
      ],
      Intermediate: [
        { name: 'Plyometric Push-ups', baseReps: 12 },
        { name: 'Tuck Jumps', baseReps: 15 },
        { name: 'Side-to-Side Lunges', baseReps: 20 },
        { name: 'Explosive Step-ups', baseReps: 15 },
        { name: 'High-Intensity Plank', baseReps: '40s' },
      ],
      Advanced: [
        { name: 'Depth Jumps', baseReps: 10 },
        { name: 'Sprint Burpees', baseReps: 12 },
        { name: 'Weighted Box Jumps', baseReps: 10 },
        { name: 'Power Cleans', baseReps: 8 },
        { name: 'Muscle-ups', baseReps: 6 },
      ],
    },
    Senior: {
      Beginner: [
        { name: 'Chair Squats', baseReps: 10 },
        { name: 'Arm Raises', baseReps: 15 },
        { name: 'Leg Extensions', baseReps: 12 },
        { name: 'Seated March', baseReps: 20 },
        { name: 'Wall Push-ups', baseReps: 10 },
      ],
      Intermediate: [
        { name: 'Step-ups', baseReps: 12 },
        { name: 'Side Leg Lifts', baseReps: 15 },
        { name: 'Chair Plank', baseReps: '20s' },
        { name: 'Standing Crunches', baseReps: 15 },
        { name: 'Light Dumbbell Rows', baseReps: 12 },
      ],
      Advanced: [
        { name: 'Slow Squats', baseReps: 12 },
        { name: 'Overhead Press', baseReps: 10 },
        { name: 'Balance Walk', baseReps: '30s' },
        { name: 'Side Plank Hold', baseReps: '25s' },
        { name: 'Knee-to-Elbow', baseReps: 15 },
      ],
    },
  };

  const generateWorkout = () => {
    if (!category || !fitnessLevel || !time) return;

    const availableExercises = exercises[category][fitnessLevel];
    const timeNum = parseInt(time);
    const workoutCount = Math.floor(timeNum / 10) + 2;
    const newWorkout = [];
    const usedIndices = new Set();

    while (newWorkout.length < workoutCount && newWorkout.length < availableExercises.length) {
      const randomIndex = Math.floor(Math.random() * availableExercises.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        const exercise = availableExercises[randomIndex];
        const challengeMultiplier = challengeMode ? (1 + pastCompletions[category] * 0.1) : 1;
        const timeMultiplier = timeNum / 10;
        const reps = typeof exercise.baseReps === 'string'
          ? `${Math.round(parseInt(exercise.baseReps) * timeMultiplier * challengeMultiplier)}s`
          : Math.round(exercise.baseReps * challengeMultiplier * timeMultiplier);
        
        newWorkout.push({ ...exercise, reps });
      }
    }
    setWorkoutPlan(newWorkout);
    setCompletedExercises(new Set());
  };

  const toggleExerciseComplete = (index) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
      if (newCompleted.size === workoutPlan.length) {
        setPastCompletions(prev => ({
          ...prev,
          [category]: prev[category] + 1,
        }));
      }
    }
    setCompletedExercises(newCompleted);
  };

  return (
    <div 
      className="h-screen w-screen flex flex-col items-center justify-between bg-cover bg-no-repeat bg-center transition-all duration-1000"
      style={{ 
        backgroundImage: loadedImages.length > 0 ? loadedImages[bgIndex] : gymBackgrounds[0], 
        backgroundSize: 'cover',
        backgroundColor: '#1a1a1a'
      }}
    >
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
          }
        `}
      </style>
      <div className="flex-1 w-full flex flex-col items-center justify-center p-6">
        <div className="w-9/12 max-w-5xl bg-black/70 rounded-3xl p-6 backdrop-blur-md">
          <h1 className="text-4xl font-extrabold text-white text-center mb-10 animate-pulse">
            NextGen Fitness Planner 🏋️‍♂️
          </h1>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 shadow-2xl transform transition-all hover:scale-[1.02] mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-white/20 text-white p-4 rounded-xl focus:ring-4 focus:ring-pink-500 transition-all duration-300 hover:bg-white/30"
              >
                <option value="" className='text-black'>Category</option>
                <option value="Normal" className='text-black'>Normal</option>
                <option value="Athlete" className='text-black'>Athlete</option>
                <option value="Senior" className='text-black'>Senior</option>
              </select>
              <select
                value={fitnessLevel}
                onChange={(e) => setFitnessLevel(e.target.value)}
                className="bg-white/20 text-white p-4 rounded-xl focus:ring-4 focus:ring-pink-500 transition-all duration-300 hover:bg-white/30"
                disabled={!category}
              >
                <option value="" className='text-black'>Level</option>
                <option value="Beginner" className='text-black'>Beginner</option>
                <option value="Intermediate" className='text-black'>Intermediate</option>
                <option value="Advanced" className='text-black'>Advanced</option>
              </select>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-white/20 text-white p-4 rounded-xl focus:ring-4 focus:ring-pink-500 transition-all duration-300 hover:bg-white/30"
              >
                <option value="" className='text-black'>Time</option>
                <option value="10" className='text-black'>10 mins</option>
                <option value="20" className='text-black'>20 mins</option>
                <option value="30" className='text-black'>30 mins</option>
                <option value="40" className='text-black'>40 mins</option>
                <option value="60" className='text-black'>60 mins</option>
              </select>
              <label className="flex items-center justify-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={challengeMode}
                  onChange={() => setChallengeMode(!challengeMode)}
                  className="sr-only"
                />
                <div className={`w-14 h-7 rounded-full transition-all duration-300 ${challengeMode ? 'bg-pink-500' : 'bg-gray-400'}`}>
                  <div className={`w-7 h-7 bg-white rounded-full transform transition-all duration-300 ${challengeMode ? 'translate-x-7' : 'translate-x-0'}`}></div>
                </div>
                <span className="ml-3 text-white font-medium">Challenge</span>
              </label>
              <button
                onClick={generateWorkout}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-xl hover:from-pink-600 hover:to-purple-600 transform transition-all duration-300 hover:scale-105 disabled:opacity-50 shadow-lg"
                disabled={!category || !fitnessLevel || !time}
              >
                Generate!
              </button>
            </div>
          </div>
          {workoutPlan.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {workoutPlan.map((exercise, index) => (
                <div
                  key={index}
                  className={`bg-white/20 backdrop-blur-lg rounded-2xl p-6 flex items-center justify-between transform transition-all duration-300 ${
                    completedExercises.has(index)
                      ? 'bg-green-500/30 scale-105 shadow-green-500/50 shadow-xl'
                      : 'hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50'
                  }`}
                >
                  <div>
                    <h3 className="text-white text-xl font-bold animate-fade-in">{exercise.name}</h3>
                    <p className="text-white/90 text-lg">Reps: {exercise.reps}</p>
                  </div>
                  <button
                    onClick={() => toggleExerciseComplete(index)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:rotate-90 ${
                      completedExercises.has(index)
                        ? 'bg-green-500 text-white scale-110'
                        : 'bg-white/30 text-white hover:bg-white/40'
                    }`}
                  >
                    ✓
                  </button>
                </div>
              ))}
            </div>
          )}
          {workoutPlan.length > 0 && (
            <div className="mt-10 text-center max-w-4xl mx-auto">
              <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-4 rounded-full transition-all duration-700 ease-in-out"
                  style={{ width: `${(completedExercises.size / workoutPlan.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-white text-lg mt-3 font-medium animate-fade-in">
                Progress: {completedExercises.size} / {workoutPlan.length} • Past Wins: {category ? pastCompletions[category] : 0}
              </p>
            </div>
          )}
        </div>
      </div>
      <footer className="text-white/70 text-center py-4 w-full bg-black/50">
        Fitness Passion 💪 © 2025
      </footer>
    </div>
  );
};

export default WorkoutGenerator;