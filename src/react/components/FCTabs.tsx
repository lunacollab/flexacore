import React from 'react';

export interface FCTab {
  key: string;
  label: string;
  content: React.ReactNode;
}

export interface FCTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: FCTab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  className?: string;
}

export const FCTabs: React.FC<FCTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = '',
  ...rest
}) => {
  return (
    <div className={['fc-tabs', className].filter(Boolean).join(' ')} {...rest}>
      <div className="fc-tabs-list">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={['fc-tab', activeTab === tab.key ? 'fc-tab-active' : ''].filter(Boolean).join(' ')}
            onClick={() => onTabChange(tab.key)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="fc-tabs-content">
        {tabs.find(tab => tab.key === activeTab)?.content}
      </div>
    </div>
  );
}; 