import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Play, Pause } from "lucide-react";

type Position = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
const CELL_PERCENT = 100 / GRID_SIZE;

const SnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameState, setGameState] = useState<"idle" | "playing" | "paused" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const directionRef = useRef(direction);

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some((seg) => seg.x === newFood.x && seg.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection("RIGHT");
    directionRef.current = "RIGHT";
    setScore(0);
    setGameState("idle");
  }, [generateFood]);

  const startGame = useCallback(() => {
    if (gameState === "gameover") {
      resetGame();
    }
    setGameState("playing");
  }, [gameState, resetGame]);

  const togglePause = () => {
    setGameState((prev) => (prev === "playing" ? "paused" : "playing"));
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== "playing" && gameState !== "paused") {
        if (e.key === " " || e.key === "Enter") {
          startGame();
          return;
        }
      }

      const keyDirectionMap: Record<string, Direction> = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
        w: "UP",
        s: "DOWN",
        a: "LEFT",
        d: "RIGHT",
      };

      const newDirection = keyDirectionMap[e.key];
      if (!newDirection) return;

      const opposites: Record<Direction, Direction> = {
        UP: "DOWN",
        DOWN: "UP",
        LEFT: "RIGHT",
        RIGHT: "LEFT",
      };

      if (opposites[newDirection] !== directionRef.current) {
        setDirection(newDirection);
        directionRef.current = newDirection;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, startGame]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const moves: Record<Direction, Position> = {
          UP: { x: head.x, y: head.y - 1 },
          DOWN: { x: head.x, y: head.y + 1 },
          LEFT: { x: head.x - 1, y: head.y },
          RIGHT: { x: head.x + 1, y: head.y },
        };

        const newHead = moves[directionRef.current];

        // Check wall collision
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameState("gameover");
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameState("gameover");
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(interval);
  }, [gameState, food, generateFood]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Score & Controls */}
      <div className="flex items-center justify-between w-full max-w-md px-4">
        <div className="text-lg font-mono">
          <span className="text-muted-foreground">Score: </span>
          <span className="text-accent font-bold">{score}</span>
        </div>
        <div className="flex gap-2">
          {gameState === "playing" ? (
            <Button variant="outline" size="sm" onClick={togglePause}>
              <Pause className="h-4 w-4 mr-1" /> Pause
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={startGame}>
              <Play className="h-4 w-4 mr-1" /> {gameState === "gameover" ? "Retry" : "Start"}
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={resetGame} aria-label="Reset game">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Game Board */}
      <div
        className="relative aspect-square w-full max-w-[400px] border-2 border-border rounded-lg overflow-hidden bg-background/50"
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: `${CELL_PERCENT}% ${CELL_PERCENT}%`,
          }}
        />

        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`absolute rounded-sm transition-all duration-75 ${
              index === 0 ? "bg-accent" : "bg-accent/70"
            }`}
            style={{
              left: `${segment.x * CELL_PERCENT}%`,
              top: `${segment.y * CELL_PERCENT}%`,
              width: `${CELL_PERCENT}%`,
              height: `${CELL_PERCENT}%`,
              transform: "scale(0.9)",
            }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute rounded-full bg-destructive animate-pulse"
          style={{
            left: `${food.x * CELL_PERCENT}%`,
            top: `${food.y * CELL_PERCENT}%`,
            width: `${CELL_PERCENT}%`,
            height: `${CELL_PERCENT}%`,
            transform: "scale(0.8)",
          }}
        />

        {/* Overlay messages */}
        {gameState === "idle" && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <p className="text-muted-foreground text-center">
              Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Space</kbd> or{" "}
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd> to start
            </p>
          </div>
        )}

        {gameState === "paused" && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <p className="text-muted-foreground">Paused</p>
          </div>
        )}

        {gameState === "gameover" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90">
            <p className="text-xl font-bold text-destructive mb-2">Game Over</p>
            <p className="text-muted-foreground">Final Score: {score}</p>
          </div>
        )}
      </div>

      {/* Controls hint */}
      <p className="text-xs text-muted-foreground">
        Use <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">↑ ↓ ← →</kbd> or{" "}
        <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">W A S D</kbd> to control
      </p>
    </div>
  );
};

export default SnakeGame;
