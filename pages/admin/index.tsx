import AdminNav from '@/components/common/AdminNav';
import { NextPage } from 'next';
import { AiOutlineDashboard, AiOutlineContainer, AiOutlineTeam, AiOutlineMail, AiOutlineContacts } from 'react-icons/ai';

interface Props {}

const navItems = [
  { href: '/admin', icon: AiOutlineDashboard, label: 'dashboard' },
  { href: '/posts', icon: AiOutlineContainer, label: 'dashboard' },
  { href: '/users', icon: AiOutlineTeam, label: 'dashboard' },
  { href: '/comments', icon: AiOutlineMail, label: 'dashboard' },
  { href: '/contacts', icon: AiOutlineContacts, label: 'contacts' },
];

const Admin: NextPage<Props> = () => {
  return (
    <div className="">
      <AdminNav navItems={navItems} />
    </div>
  );
};

export default Admin;
