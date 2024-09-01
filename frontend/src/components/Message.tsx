import '../../public/styles/message.css';

interface Props {
  message: string;
  visible: boolean;
}

const Message: React.FC<Props> = ({ message, visible }) => {

  return (
    <div className={`dialog  fixed top-4 left-1/3 right-1/3 p-4 mb-4 font-semibold text-green-700 bg-green-200 border-green-700 border-2 rounded-lg ${visible ? 'visible' : 'hidden'}`} role="alert">
      {message}
    </div>
  );
};

export default Message;
