import React from 'react';
import { useDrag } from 'react-dnd';

export interface QTypeProps {
  type: string;
  label: string;
}

const QType: React.FC<QTypeProps> = ({ type, label }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'question',
    item: { type },
    collect(monitor) {
      return { isDragging: monitor.isDragging() };
    },
  }));

  return (
    <div
      className="p-4 bg-cyan-100 mb-2 rounded-lg cursor-move text-cyan-500 text-center hover:shadow-lg transition delay-150 transition-all"
      ref={dragPreview}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div ref={drag}>{label}</div>
    </div>
  );
};

export default QType;
