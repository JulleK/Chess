import Chessboard from "chessboardjsx";
export default function Board({ position = "start", onDrop, orientation }) {
  return (
    <div>
      <div className="border-2 border-black">
        <Chessboard
          position={position}
          onDrop={onDrop}
          orientation={orientation}
        />
      </div>
    </div>
  );
}
