import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './components/ProjectDetails';

// function App() {
//     const [count, setCount] = useState(0);

//     return (
//         <>
//             <div>
//                 <a href="https://vite.dev" target="_blank">
//                     <img src={viteLogo} className="logo" alt="Vite logo" />
//                 </a>
//                 <a href="https://react.dev" target="_blank">
//                     <img src={reactLogo} className="logo react" alt="React logo" />
//                 </a>
//             </div>
//             <h1>Vite + React</h1>
//             <div className="card">
//                 <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
//                 <p>
//                     Edit <code>src/App.tsx</code> and save to test HMR
//                 </p>
//             </div>
//             <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
//         </>
//     );
// }

function App(): React.JSX.Element {
	return (
		<BrowserRouter>
			<main>
				<Routes>
					{/* <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} /> */}

					<Route path="/projects" element={<ProjectsPage />} />
                    <Route path='/projects/:id' element={<ProjectDetails />} />
					{/* <Route path='/projects/add' element={<AddProject />} />
                    
  
            <Route path='*' elemen:t={<NotFound />} /> */}
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
