import React from 'react';

const Custom404: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white">
            <div className="flex items-center mb-8">
                <h1 className="inline-block mr-5 pr-6 text-2xl font-medium border-r border-slate-400">
                    404
                </h1>
                <p className="text-sm font-normal leading-7 text-slate-400">
                    Página não encontrada
                </p>
            </div>
        </div>
    );
};

export default Custom404;
