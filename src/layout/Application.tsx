import React from 'react';
import Header from '../components/Header';

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div>
            <Header />
            <main className="">
                {children}
            </main>
        </div>
    );
};

export default Layout;