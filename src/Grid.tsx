import { useCallback, useState } from "react";

export default function GridLayout({ rows = 10, cols = 10 }) {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [selected, setSelected] = useState<number[]>([]);
  const handleKeyDown = (start: number) => {
    setIsMouseDown(true);
    setSelected([start]);
  };
  const handleKeyUp = () => {
    setIsMouseDown(false);
  };
  const handleKeyEnter = useCallback(
    (end: any) => {
      if (isMouseDown) {
        let startRow = Math.floor((selected[0] - 1) / cols);
        let startCol = (selected[0] - 1) % 10;
        let endRow = Math.floor((end - 1) / cols);
        let endCol = (end - 1) % cols;
        let minRow = Math.min(startRow, endRow);
        let maxRow = Math.max(startRow, endRow);
        let minCol = Math.min(startCol, endCol);
        let maxCol = Math.max(startCol, endCol);
        setSelected([]);
        for (let i = minRow; i <= maxRow; i++) {
          for (let j = minCol; j <= maxCol; j++) {
            setSelected((prev) => [...prev, i * cols + j + 1]);
          }
        }
      }
    },
    [isMouseDown]
  );
  return (
    <div className="grid">
      <h6>Slect a Grid</h6>
      <div className="container" style={{ "--cols": cols, "--rows": rows }}>
        {Array(rows * cols)
          .fill(0)
          ?.map((_, i) => {
            return (
              <div
                className={`cell ${selected.includes(i + 1) ? "selected" : ""}`}
                onMouseDown={() => handleKeyDown(i + 1)}
                onMouseEnter={() => handleKeyEnter(i + 1)}
                onMouseUp={handleKeyUp}
              >
                {i + 1}
              </div>
            );
          })}
      </div>
    </div>
  );
}
