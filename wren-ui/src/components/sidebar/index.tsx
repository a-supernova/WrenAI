import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import styled from 'styled-components';
import { Path } from '@/utils/enum';
import { DiscordIcon, GithubIcon } from '@/utils/icons';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import Home, { Props as HomeSidebarProps } from './Home';
import Modeling, { Props as ModelingSidebarProps } from './Modeling';
import Knowledge from './Knowledge';
import APIManagement from './APIManagement';
import LearningSection from '@/components/learning';
import axios from 'axios';

const Layout = styled.div`
  position: relative;
  height: 100%;
  background-color: var(--gray-2);
  color: var(--gray-8);
  padding-bottom: 12px;
  overflow-x: hidden;
`;

const Content = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const StyledButton = styled(Button)`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  color: var(--gray-8) !important;
  border-radius: 0;

  &:hover,
  &:focus {
    background-color: var(--gray-4);
  }
`;

type Props = (ModelingSidebarProps | HomeSidebarProps) & {
  onOpenSettings?: () => void;
};

const DynamicSidebar = (
  props: Props & {
    pathname: string;
  },
) => {
  const { pathname, ...restProps } = props;

  const getContent = () => {
    if (pathname.startsWith(Path.Home)) {
      return <Home {...(restProps as HomeSidebarProps)} />;
    }

    if (pathname.startsWith(Path.Modeling)) {
      return <Modeling {...(restProps as ModelingSidebarProps)} />;
    }

    if (pathname.startsWith(Path.Knowledge)) {
      return <Knowledge />;
    }

    if (pathname.startsWith(Path.APIManagement)) {
      return <APIManagement />;
    }

    return null;
  };

  return <Content>{getContent()}</Content>;
};

export default function Sidebar(props: Props) {
  const { onOpenSettings } = props;
  const router = useRouter();

  const onSettingsClick = (event) => {
    onOpenSettings && onOpenSettings();
    event.target.blur();
  };

  const onLogout = async (event) => {
    await axios.get("/api/logout");
    window.location.href = "/login";
  };

  return (
    <Layout className="d-flex flex-column">
      <DynamicSidebar {...props} pathname={router.pathname} />
      <LearningSection />
      <div className="border-t border-gray-4 pt-2">
        <StyledButton type="text" block onClick={onSettingsClick}>
          <SettingOutlined className="text-md" />
          Settings
        </StyledButton>
        <StyledButton type="text" block onClick={onLogout}>
          <DiscordIcon className="text-md" />
          Logout
        </StyledButton>
      </div>
    </Layout>
  );
}
