type Props = {
  minutes: number;
  seconds: number;
  mode: "focus" | "break";
};

export default function TimerCircle({ minutes, seconds, mode }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-48 h-48 rounded-full flex items-center justify-center
        text-4xl font-bold
        ${mode === "focus" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
      >
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </div>

      <p className="text-sm text-gray-500">
        {mode === "focus" ? "Stay focused 🔥" : "Take a break ☕"}
      </p>
    </div>
  );
}
