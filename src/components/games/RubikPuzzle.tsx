import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Shuffle, RotateCw } from "lucide-react";

type FaceColor = "red" | "blue" | "green" | "yellow" | "orange" | "white";
type Face = FaceColor[][];

// 2x2 cube with 6 faces
type CubeState = {
  front: Face;
  back: Face;
  left: Face;
  right: Face;
  top: Face;
  bottom: Face;
};

const COLORS: Record<FaceColor, string> = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-400",
  orange: "bg-orange-500",
  white: "bg-white border border-gray-300",
};

const createSolvedCube = (): CubeState => ({
  front: [["red", "red"], ["red", "red"]],
  back: [["orange", "orange"], ["orange", "orange"]],
  left: [["green", "green"], ["green", "green"]],
  right: [["blue", "blue"], ["blue", "blue"]],
  top: [["white", "white"], ["white", "white"]],
  bottom: [["yellow", "yellow"], ["yellow", "yellow"]],
});

const rotateFaceClockwise = (face: Face): Face => [
  [face[1][0], face[0][0]],
  [face[1][1], face[0][1]],
];

const rotateFaceCounterClockwise = (face: Face): Face => [
  [face[0][1], face[1][1]],
  [face[0][0], face[1][0]],
];

const cloneCube = (cube: CubeState): CubeState => ({
  front: cube.front.map(row => [...row]) as Face,
  back: cube.back.map(row => [...row]) as Face,
  left: cube.left.map(row => [...row]) as Face,
  right: cube.right.map(row => [...row]) as Face,
  top: cube.top.map(row => [...row]) as Face,
  bottom: cube.bottom.map(row => [...row]) as Face,
});

const RubikPuzzle = () => {
  const [cube, setCube] = useState<CubeState>(createSolvedCube);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(true);

  const checkSolved = useCallback((state: CubeState): boolean => {
    const faces = Object.values(state);
    return faces.every(face => {
      const color = face[0][0];
      return face.every(row => row.every(cell => cell === color));
    });
  }, []);

  // Rotate top layer clockwise
  const rotateTop = (clockwise: boolean) => {
    const newCube = cloneCube(cube);
    newCube.top = clockwise 
      ? rotateFaceClockwise(newCube.top) 
      : rotateFaceCounterClockwise(newCube.top);

    if (clockwise) {
      const temp = [newCube.front[0][0], newCube.front[0][1]];
      newCube.front[0] = [newCube.right[0][0], newCube.right[0][1]];
      newCube.right[0] = [newCube.back[0][0], newCube.back[0][1]];
      newCube.back[0] = [newCube.left[0][0], newCube.left[0][1]];
      newCube.left[0] = temp as [FaceColor, FaceColor];
    } else {
      const temp = [newCube.front[0][0], newCube.front[0][1]];
      newCube.front[0] = [newCube.left[0][0], newCube.left[0][1]];
      newCube.left[0] = [newCube.back[0][0], newCube.back[0][1]];
      newCube.back[0] = [newCube.right[0][0], newCube.right[0][1]];
      newCube.right[0] = temp as [FaceColor, FaceColor];
    }

    setCube(newCube);
    setMoves(m => m + 1);
    setIsSolved(checkSolved(newCube));
  };

  // Rotate right layer clockwise
  const rotateRight = (clockwise: boolean) => {
    const newCube = cloneCube(cube);
    newCube.right = clockwise 
      ? rotateFaceClockwise(newCube.right) 
      : rotateFaceCounterClockwise(newCube.right);

    if (clockwise) {
      const temp = [newCube.front[0][1], newCube.front[1][1]];
      newCube.front[0][1] = newCube.bottom[0][1];
      newCube.front[1][1] = newCube.bottom[1][1];
      newCube.bottom[0][1] = newCube.back[1][0];
      newCube.bottom[1][1] = newCube.back[0][0];
      newCube.back[0][0] = newCube.top[1][1];
      newCube.back[1][0] = newCube.top[0][1];
      newCube.top[0][1] = temp[0];
      newCube.top[1][1] = temp[1];
    } else {
      const temp = [newCube.front[0][1], newCube.front[1][1]];
      newCube.front[0][1] = newCube.top[0][1];
      newCube.front[1][1] = newCube.top[1][1];
      newCube.top[0][1] = newCube.back[1][0];
      newCube.top[1][1] = newCube.back[0][0];
      newCube.back[0][0] = newCube.bottom[1][1];
      newCube.back[1][0] = newCube.bottom[0][1];
      newCube.bottom[0][1] = temp[0];
      newCube.bottom[1][1] = temp[1];
    }

    setCube(newCube);
    setMoves(m => m + 1);
    setIsSolved(checkSolved(newCube));
  };

  // Rotate front layer clockwise
  const rotateFront = (clockwise: boolean) => {
    const newCube = cloneCube(cube);
    newCube.front = clockwise 
      ? rotateFaceClockwise(newCube.front) 
      : rotateFaceCounterClockwise(newCube.front);

    if (clockwise) {
      const temp = [newCube.top[1][0], newCube.top[1][1]];
      newCube.top[1][0] = newCube.left[1][1];
      newCube.top[1][1] = newCube.left[0][1];
      newCube.left[0][1] = newCube.bottom[0][0];
      newCube.left[1][1] = newCube.bottom[0][1];
      newCube.bottom[0][0] = newCube.right[1][0];
      newCube.bottom[0][1] = newCube.right[0][0];
      newCube.right[0][0] = temp[0];
      newCube.right[1][0] = temp[1];
    } else {
      const temp = [newCube.top[1][0], newCube.top[1][1]];
      newCube.top[1][0] = newCube.right[0][0];
      newCube.top[1][1] = newCube.right[1][0];
      newCube.right[0][0] = newCube.bottom[0][1];
      newCube.right[1][0] = newCube.bottom[0][0];
      newCube.bottom[0][0] = newCube.left[0][1];
      newCube.bottom[0][1] = newCube.left[1][1];
      newCube.left[0][1] = temp[1];
      newCube.left[1][1] = temp[0];
    }

    setCube(newCube);
    setMoves(m => m + 1);
    setIsSolved(checkSolved(newCube));
  };

  const shuffle = () => {
    let newCube = cloneCube(cube);
    const operations = [
      () => { newCube.top = rotateFaceClockwise(newCube.top); rotateTop(true); },
      () => { rotateTop(false); },
      () => { rotateRight(true); },
      () => { rotateRight(false); },
      () => { rotateFront(true); },
      () => { rotateFront(false); },
    ];

    // Perform random shuffles
    for (let i = 0; i < 20; i++) {
      const randomOp = Math.floor(Math.random() * 6);
      const clockwise = Math.random() > 0.5;
      
      switch (randomOp % 3) {
        case 0:
          newCube.top = clockwise ? rotateFaceClockwise(newCube.top) : rotateFaceCounterClockwise(newCube.top);
          if (clockwise) {
            const temp = [newCube.front[0][0], newCube.front[0][1]];
            newCube.front[0] = [newCube.right[0][0], newCube.right[0][1]];
            newCube.right[0] = [newCube.back[0][0], newCube.back[0][1]];
            newCube.back[0] = [newCube.left[0][0], newCube.left[0][1]];
            newCube.left[0] = temp as [FaceColor, FaceColor];
          } else {
            const temp = [newCube.front[0][0], newCube.front[0][1]];
            newCube.front[0] = [newCube.left[0][0], newCube.left[0][1]];
            newCube.left[0] = [newCube.back[0][0], newCube.back[0][1]];
            newCube.back[0] = [newCube.right[0][0], newCube.right[0][1]];
            newCube.right[0] = temp as [FaceColor, FaceColor];
          }
          break;
        case 1:
          newCube.right = clockwise ? rotateFaceClockwise(newCube.right) : rotateFaceCounterClockwise(newCube.right);
          break;
        case 2:
          newCube.front = clockwise ? rotateFaceClockwise(newCube.front) : rotateFaceCounterClockwise(newCube.front);
          break;
      }
    }

    setCube(newCube);
    setMoves(0);
    setIsSolved(false);
  };

  const reset = () => {
    setCube(createSolvedCube());
    setMoves(0);
    setIsSolved(true);
  };

  const renderFace = (face: Face, label: string) => (
    <div className="flex flex-col items-center">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="grid grid-cols-2 gap-0.5">
        {face.map((row, i) =>
          row.map((color, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-8 h-8 rounded-sm ${COLORS[color]} shadow-sm`}
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Status */}
      <div className="flex items-center justify-between w-full max-w-md px-4">
        <div className="text-lg font-mono">
          <span className="text-muted-foreground">Moves: </span>
          <span className="text-accent font-bold">{moves}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={shuffle}>
            <Shuffle className="h-4 w-4 mr-1" /> Shuffle
          </Button>
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Solved indicator */}
      {isSolved && moves > 0 && (
        <div className="px-4 py-2 bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg text-sm font-medium">
          🎉 Solved in {moves} moves!
        </div>
      )}

      {/* Cube 2D layout */}
      <div className="flex flex-col items-center gap-2">
        {/* Top row */}
        <div className="flex justify-center">
          {renderFace(cube.top, "Top")}
        </div>
        
        {/* Middle row */}
        <div className="flex gap-2">
          {renderFace(cube.left, "Left")}
          {renderFace(cube.front, "Front")}
          {renderFace(cube.right, "Right")}
          {renderFace(cube.back, "Back")}
        </div>
        
        {/* Bottom row */}
        <div className="flex justify-center">
          {renderFace(cube.bottom, "Bottom")}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <p className="text-xs text-muted-foreground text-center">Rotate Layers:</p>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" onClick={() => rotateTop(false)}>
            <RotateCcw className="h-3 w-3 mr-1" /> Top
          </Button>
          <Button variant="outline" size="sm" onClick={() => rotateFront(false)}>
            <RotateCcw className="h-3 w-3 mr-1" /> Front
          </Button>
          <Button variant="outline" size="sm" onClick={() => rotateRight(false)}>
            <RotateCcw className="h-3 w-3 mr-1" /> Right
          </Button>
          <Button variant="outline" size="sm" onClick={() => rotateTop(true)}>
            <RotateCw className="h-3 w-3 mr-1" /> Top
          </Button>
          <Button variant="outline" size="sm" onClick={() => rotateFront(true)}>
            <RotateCw className="h-3 w-3 mr-1" /> Front
          </Button>
          <Button variant="outline" size="sm" onClick={() => rotateRight(true)}>
            <RotateCw className="h-3 w-3 mr-1" /> Right
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <p className="text-xs text-muted-foreground text-center max-w-md">
        Use the rotation buttons to align all colors on each face. 
        Press Shuffle to scramble, Reset to restore.
      </p>
    </div>
  );
};

export default RubikPuzzle;
