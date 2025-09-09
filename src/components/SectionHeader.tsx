import React from 'react';
interface SectionHeaderProps {
  title: string;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title
}) => {
  return <div className="flex items-center mb-5">
      <h2 className="text-xl font-medium text-gray-900">{title}</h2>
      <div className="ml-4 flex-grow border-t border-gray-200"></div>
    </div>;
};
export default SectionHeader;