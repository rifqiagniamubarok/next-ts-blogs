import React, { FC } from 'react';
import AdminNav from '../common/AdminNav';
import { AiOutlineDashboard, AiOutlineContainer, AiOutlineTeam, AiOutlineMail, AiOutlineContacts, AiOutlineFileAdd } from 'react-icons/ai';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
}

const navItems = [
  { href: '/admin', icon: AiOutlineDashboard, label: 'dashboard' },
  { href: '/posts', icon: AiOutlineContainer, label: 'dashboard' },
  { href: '/users', icon: AiOutlineTeam, label: 'dashboard' },
  { href: '/comments', icon: AiOutlineMail, label: 'dashboard' },
  { href: '/contacts', icon: AiOutlineContacts, label: 'contacts' },
];

const AdminLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <div className="flex ">
      <AdminNav navItems={navItems} />
      <div className="flex-1 p-4">{children}</div>
      {/* Create Button */}
      <Link href={'/admin/post/create'} className="bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary-dark fixed z-10 right-10 bottom-10 p-3 rounded-full">
        <AiOutlineFileAdd size={24} />
      </Link>
    </div>
  );
};

export default AdminLayout;
