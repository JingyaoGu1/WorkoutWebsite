import './App.css';
import Hero from './components/Hero/Hero';
import Programs from './components/Programs/Programs';
import Reasons from './components/Reasons/Reasons';
import Plans from './components/Plans/Plans';
import WorkoutPlan from './components/WorkoutPlan/WorkoutPlan.jsx';
import AIGenerate from './components/AIGenerate/AIGenerate.jsx';

function App() {
  return (
    <div className="App">
          <Hero/>
          <Programs/>
          <Reasons/>
          <Plans/>
          <WorkoutPlan/>
          <AIGenerate/>
    </div>
  );
}

export default App;
