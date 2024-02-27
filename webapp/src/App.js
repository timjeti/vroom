import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Space , Layout} from 'antd';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import SideBar from './SideBar';
import AdminHeader from './AdminHeader';

function App() {
  return (
    <Router>
      
    <Layout style={{ overflowX: 'hidden' }}>
    {/* <Space direction="vertical" size="middle" style={{ display: 'flex' }}> */}
      <AppHeader />
      
      {/* <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-content">
          <h1>Hello This is test React App</h1>
        </div>
      </Content> */}
      <AppContent/>
      <AppFooter/>
    {/* </Space> */}


    </Layout>
  </Router>
  );
}

export default App;
