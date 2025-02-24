import { UserOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import './index.css';

export function Index() {
  const navigate = useNavigate();
  return (
    <div id="index-container">
      <div className="header">
        <h1>会议室预定系统</h1>
        <UserOutlined className="icon" onClick={() => navigate('/update-info')} />
      </div>
      <div className="body">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
