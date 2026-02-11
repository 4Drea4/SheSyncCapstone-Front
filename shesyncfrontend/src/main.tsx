import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import {AuthProvider} from './context/AuthContext';
import { MusicProvider } from "./context/MusicContext";

ReactDOM.createRoot(document.getElementById('root')!).render(

  <AuthProvider>
      <MusicProvider>
  <App />
  </MusicProvider>
</AuthProvider>,

);
 

