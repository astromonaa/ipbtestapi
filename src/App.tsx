import logo from './assets/logo.svg'
import Notification from './components/Notification/Notification';
import { useNotifications } from './hooks/useNotifications';

const App = () => {
  const {notifications} = useNotifications()
  
  return (
    <div className='container'>
      <div className="logo">
        <span>ЛОГОТИП</span>
        <img src={logo} alt="Логотип приложения" />
      </div>
      <div className="red-block"></div>
      {notifications?.map(item => <Notification notification={item} key={performance.now()}/>)}
    </div>
  );
};

export default App;