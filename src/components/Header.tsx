import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 px-8 border-b border-b-slate-700 text-white">
      <Link href="/">
        <img
          src="/logo.svg"
          alt="Logo"
          className="h-10"
        />
      </Link>

      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-end">
          <span className="text-md font-semibold">Filipe Daineze</span>
          <span className="text-xs text-gray-400">Teste de Front-End</span>
        </div>
        <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-lg text-white rounded-full font-bold">
          FD
        </div>
      </div>
    </header>
  );
};

export default Header;