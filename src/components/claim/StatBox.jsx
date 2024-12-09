
import PropTypes from 'prop-types';
import {icons} from "lucide-react"


export function StatBox({ title, value, icon }) {
  const MyIcon = icons[icon]
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-so-gray-300">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-so-gray-600">{title}</h3>
        <div className="text-so-orange">{<MyIcon className="w-5 h-5" />}</div>
      </div>
      <p className="text-2xl font-bold text-so-black">{value}</p>
    </div>
  );    
  
}

  StatBox.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.string,
  };