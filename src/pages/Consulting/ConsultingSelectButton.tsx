interface ConsultingSelectButtonProps {
  setMode: (mode: string) => void;
}

function ConsultingSelectButton({ setMode }: ConsultingSelectButtonProps) {
  return (
    <div className="flex justify-around items-center h-full">
      <button
        className="rounded-md bg-blue-300 px-8 py-4 text-white font-semibold text-xl"
        onClick={() => setMode("writing")}
      >
        컨설팅 메시지 작성
      </button>
      <button
        className="rounded-md bg-blue-300 px-8 py-4 text-white font-semibold text-xl"
        onClick={() => setMode("viewing")}
      >
        컨설팅 메시지 보기
      </button>
    </div>
  );
}

export default ConsultingSelectButton;
