import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, CalendarDays, CheckCircle2, Clock3, Flame, Menu, Play, Plus, Search, Target, Timer, TrendingUp } from "lucide-react";

const initialTasks = [
  { id: 1, title: "Complete JavaScript Functions", priority: "High", done: true },
  { id: 2, title: "Practice 20 Math Problems", priority: "Medium", done: true },
  { id: 3, title: "Read English Chapter 5", priority: "Medium", done: false },
  { id: 4, title: "Build a Small Project", priority: "High", done: false },
  { id: 5, title: "Revise Data Structures", priority: "Low", done: false },
];

function Stat({ icon: Icon, value, label }) { return <div className="stat-card"><Icon size={22} /><strong>{value}</strong><span>{label}</span></div>; }

export default function Dashboard({ sidebarOpen, setSidebarOpen }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [newTask, setNewTask] = useState("");
  const completed = tasks.filter((task) => task.done).length;
  const progress = Math.round((completed / tasks.length) * 100);
  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const weekly = useMemo(() => [2, 3.5, 2.5, 4, 3, 1.5, 2], []);
  const addTask = () => { if (!newTask.trim()) return; setTasks((current) => [...current, { id: Date.now(), title: newTask.trim(), priority: "Medium", done: false }]); setNewTask(""); };

  return <div className="dashboard-layout">
    {sidebarOpen && <aside className="sidebar"><div className="brand">🎓 <span>StudyMate</span></div>{['Dashboard', 'Tasks', 'Timer', 'Pomodoro', 'Calendar', 'Progress', 'Analytics', 'Notes', 'Flashcards', 'Goals', 'Settings'].map((item, index) => <div className={`nav-item ${index === 0 ? 'active' : ''}`} key={item}>{item}</div>)}<div className="profile">👨🏻‍💻 <div><b>Robayet</b><small>Keep Growing 🚀</small></div></div></aside>}
    <main className="main-content"><header className="topbar"><button className="icon-button" onClick={() => setSidebarOpen(!sidebarOpen)}><Menu /></button><div className="search"><Search size={17} /> Search anything...</div><div className="top-actions"><Bell size={20} /> <span>👨🏻‍💻</span></div></header>
      <section className="welcome"><div><h1>Good Evening, Robayet! 👋</h1><p>Stay focused and keep pushing forward. You've got this! 🚀</p></div><button className="primary-button" onClick={addTask}><Plus size={17} /> Quick add</button></section>
      <section className="stats-grid"><Stat icon={Flame} value="7" label="Day Streak" /><Stat icon={Target} value="3h 00m" label="Daily Goal" /><Stat icon={TrendingUp} value={`${progress}%`} label="Goal Progress" /><Stat icon={CheckCircle2} value="850" label="Focus Score" /></section>
      <section className="content-grid"><div className="panel tasks-panel"><div className="panel-heading"><h2>Today's Tasks</h2><span>{tasks.length} Tasks</span></div><div className="task-list">{tasks.map((task) => <label className="task-row" key={task.id}><input type="checkbox" checked={task.done} onChange={() => setTasks((all) => all.map((item) => item.id === task.id ? { ...item, done: !item.done } : item))} /><span className={task.done ? 'done' : ''}>{task.title}</span><em className={task.priority.toLowerCase()}>{task.priority}</em></label>)}</div><div className="add-task"><input value={newTask} onChange={(event) => setNewTask(event.target.value)} placeholder="Add a new task..." onKeyDown={(event) => event.key === 'Enter' && addTask()} /><button onClick={addTask}><Plus size={17} /></button></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><small>{completed} / {tasks.length} Completed</small></div>
        <div className="panel timer-panel"><div className="panel-heading"><h2>Study Timer</h2><Timer size={19} /></div><div className="timer-circle"><strong>{time}</strong><span>🧠 Study Time</span></div><button className="primary-button full" onClick={() => setRunning(!running)}><Play size={17} /> {running ? 'Pause' : 'Start'}</button><div className="timer-controls"><button onClick={() => setSeconds(25 * 60)}>Reset</button><button onClick={() => setSeconds((value) => Math.max(0, value - 60))}>Skip</button></div><small>{running ? 'Timer is ready for interval integration.' : 'Focus for 25 minutes at a time.'}</small></div>
        <div className="panel progress-panel"><div className="panel-heading"><h2>Today's Progress</h2><Clock3 size={19} /></div><div className="big-number">{Math.round(completed / tasks.length * 3 * 60)}<small> min</small></div><p>Study time tracked</p><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><div className="mini-stats"><span><b>{completed}</b>Tasks done</span><span><b>3</b>Pomodoros</span></div></div></section>
      <section className="content-grid lower-grid"><div className="panel chart-panel"><div className="panel-heading"><h2>Weekly Study Chart</h2><span>This Week</span></div><div className="bars">{weekly.map((value, index) => <div className="bar-column" key={index}><span style={{ height: `${value * 35}px` }} /><small>{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][index]}</small></div>)}</div></div><div className="panel"><div className="panel-heading"><h2>Upcoming Tasks</h2><Link to="/tasks">View All</Link></div>{['Learn Array Methods','Solve Trigonometry','Read Chapter 6','Practice DSA Problems'].map((task) => <div className="upcoming" key={task}><CalendarDays size={18} /><span>{task}</span><small>Tomorrow</small></div>)}</div></section>
      <footer className="footer-banner"><div><h2>Small progress every day leads to big results.</h2><p>Stay consistent, stay focused, and success will follow.</p></div><button className="primary-button">Keep Going 🚀</button></footer></main>
  </div>;
}
