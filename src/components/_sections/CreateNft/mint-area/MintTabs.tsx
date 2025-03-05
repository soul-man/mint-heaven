'use client'

import React from 'react'

interface MintTabsProps {
  activeTab: 'ai' | 'upload'
  setActiveTab: (tab: 'ai' | 'upload') => void
}

export const MintTabs = ({ activeTab, setActiveTab }: MintTabsProps) => {
  return (
    <div className="flex w-full z-20 border-b border-blue-900/20 border-dashed shadow-md">
      <button
        className={`w-full px-2 md:px-8 py-4 font-light transition-all duration-200 text-md md:text-lg md:text-xl
          ${activeTab === 'ai'
            ? 'text-white bg-blue-900/20 border-b-2 border-blue-600'
            : 'text-blue-300/60 hover:text-blue-300 hover:bg-blue-900/10 border-b border-blue-900/40'
          }`}
        onClick={() => setActiveTab('ai')}
      >
        AI-generated
      </button>
      <button
        className={`w-full px-2 md:px-8 py-4 font-light transition-all duration-200 text-md md:text-xl relative
          text-blue-300/40 border-b border-blue-900/40 cursor-not-allowed`}
        disabled
        title="Coming soon"
      >
        Upload
        <span className="absolute top-4 md:top-5 left-2 md:left-3 text-xs bg-blue-600/30 text-blue-200 px-2 py-0.5 rounded-full">
          Soon
        </span>
      </button>
    </div>
  )
} 