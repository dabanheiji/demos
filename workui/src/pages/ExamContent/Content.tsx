import React from 'react';
import { useDrop } from 'react-dnd';
import Question from './Question';

export interface ContentProps {
  dataSource?: any[];
  onDrop?: (item: any) => void;
  onClick?: (item: any) => void;
}

const Content: React.FC<ContentProps> = ({
  dataSource = [],
  onDrop,
  onClick,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'question',
    drop: (item) => {
      console.log('drop', item);
      onDrop?.(item);
    },
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
  }));

  return (
    <div
      className="w-full overflow-y-auto p-4"
      ref={drop}
      style={{
        height: 'calc(100vh - 152px)',
        backgroundColor: isOver ? 'rgb(236 254 255)' : 'transparent',
      }}
    >
      {dataSource?.map((item, i) => (
        <Question key={i} item={item} onClick={onClick} />
      ))}
      <div className="text-center">{isOver ? '松开放下来' : ''}</div>
    </div>
  );
};

export default Content;
