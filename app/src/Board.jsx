import Chessboard from "chessboardjsx";

export default function Board({ position = "start" }) {
  return <Chessboard position={position} />;
}
