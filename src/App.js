import logo from './logo.svg';
import { ZemogaUI } from '@views';
import { RulingProvider } from '@store';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <RulingProvider>
        <ZemogaUI />
      </RulingProvider>
    </div>
  );
}

export default App;
