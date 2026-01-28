import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

type PieceType = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";
type PieceColor = "white" | "black";
type Piece = { type: PieceType; color: PieceColor } | null;
type Board = Piece[][];
type Position = { row: number; col: number };

const PIECE_SYMBOLS: Record<PieceColor, Record<PieceType, string>> = {
  white: { king: "♔", queen: "♕", rook: "♖", bishop: "♗", knight: "♘", pawn: "♙" },
  black: { king: "♚", queen: "♛", rook: "♜", bishop: "♝", knight: "♞", pawn: "♟" },
};

const createInitialBoard = (): Board => {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Place pawns
  for (let col = 0; col < 8; col++) {
    board[1][col] = { type: "pawn", color: "black" };
    board[6][col] = { type: "pawn", color: "white" };
  }
  
  // Place other pieces
  const backRow: PieceType[] = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
  for (let col = 0; col < 8; col++) {
    board[0][col] = { type: backRow[col], color: "black" };
    board[7][col] = { type: backRow[col], color: "white" };
  }
  
  return board;
};

const ChessGame = () => {
  const [board, setBoard] = useState<Board>(createInitialBoard);
  const [selectedPos, setSelectedPos] = useState<Position | null>(null);
  const [currentTurn, setCurrentTurn] = useState<PieceColor>("white");
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);

  const isValidPosition = (row: number, col: number) => 
    row >= 0 && row < 8 && col >= 0 && col < 8;

  const getValidMoves = useCallback((pos: Position, board: Board): Position[] => {
    const piece = board[pos.row][pos.col];
    if (!piece) return [];

    const moves: Position[] = [];
    const { type, color } = piece;
    const direction = color === "white" ? -1 : 1;

    const addMove = (row: number, col: number) => {
      if (!isValidPosition(row, col)) return false;
      const target = board[row][col];
      if (target && target.color === color) return false;
      moves.push({ row, col });
      return !target; // Continue if empty
    };

    const addLineMoves = (dRow: number, dCol: number) => {
      for (let i = 1; i < 8; i++) {
        if (!addMove(pos.row + dRow * i, pos.col + dCol * i)) break;
      }
    };

    switch (type) {
      case "pawn":
        // Forward move
        if (isValidPosition(pos.row + direction, pos.col) && 
            !board[pos.row + direction][pos.col]) {
          moves.push({ row: pos.row + direction, col: pos.col });
          // Initial double move
          const startRow = color === "white" ? 6 : 1;
          if (pos.row === startRow && !board[pos.row + 2 * direction][pos.col]) {
            moves.push({ row: pos.row + 2 * direction, col: pos.col });
          }
        }
        // Captures
        [-1, 1].forEach(dc => {
          const newRow = pos.row + direction;
          const newCol = pos.col + dc;
          if (isValidPosition(newRow, newCol)) {
            const target = board[newRow][newCol];
            if (target && target.color !== color) {
              moves.push({ row: newRow, col: newCol });
            }
          }
        });
        break;

      case "knight":
        [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]
          .forEach(([dr, dc]) => addMove(pos.row + dr, pos.col + dc));
        break;

      case "bishop":
        [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([dr, dc]) => addLineMoves(dr, dc));
        break;

      case "rook":
        [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dr, dc]) => addLineMoves(dr, dc));
        break;

      case "queen":
        [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
          .forEach(([dr, dc]) => addLineMoves(dr, dc));
        break;

      case "king":
        [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
          .forEach(([dr, dc]) => addMove(pos.row + dr, pos.col + dc));
        break;
    }

    return moves;
  }, []);

  const handleCellClick = (row: number, col: number) => {
    const clickedPiece = board[row][col];

    // If no piece selected
    if (!selectedPos) {
      if (clickedPiece && clickedPiece.color === currentTurn) {
        setSelectedPos({ row, col });
        setValidMoves(getValidMoves({ row, col }, board));
      }
      return;
    }

    // If clicking the same piece, deselect
    if (selectedPos.row === row && selectedPos.col === col) {
      setSelectedPos(null);
      setValidMoves([]);
      return;
    }

    // If clicking another own piece, select it instead
    if (clickedPiece && clickedPiece.color === currentTurn) {
      setSelectedPos({ row, col });
      setValidMoves(getValidMoves({ row, col }, board));
      return;
    }

    // Check if move is valid
    const isValid = validMoves.some(m => m.row === row && m.col === col);
    if (!isValid) {
      setSelectedPos(null);
      setValidMoves([]);
      return;
    }

    // Execute move
    const newBoard = board.map(r => [...r]);
    const movingPiece = newBoard[selectedPos.row][selectedPos.col]!;
    const capturedPiece = newBoard[row][col];
    
    newBoard[row][col] = movingPiece;
    newBoard[selectedPos.row][selectedPos.col] = null;

    // Record move
    const cols = "abcdefgh";
    const moveNotation = `${movingPiece.type[0].toUpperCase()}${cols[selectedPos.col]}${8 - selectedPos.row}→${cols[col]}${8 - row}${capturedPiece ? "×" : ""}`;
    
    setBoard(newBoard);
    setSelectedPos(null);
    setValidMoves([]);
    setCurrentTurn(currentTurn === "white" ? "black" : "white");
    setMoveHistory(prev => [...prev, moveNotation]);
  };

  const resetGame = () => {
    setBoard(createInitialBoard());
    setSelectedPos(null);
    setValidMoves([]);
    setCurrentTurn("white");
    setMoveHistory([]);
  };

  const isValidMove = (row: number, col: number) => 
    validMoves.some(m => m.row === row && m.col === col);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Status bar */}
      <div className="flex items-center justify-between w-full max-w-md px-4">
        <div className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded-full ${currentTurn === "white" ? "bg-white border border-border" : "bg-gray-800"}`} />
          <span className="text-sm font-medium">
            {currentTurn === "white" ? "White" : "Black"}'s turn
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={resetGame}>
          <RotateCcw className="h-4 w-4 mr-1" /> Reset
        </Button>
      </div>

      {/* Chess Board */}
      <div className="border-2 border-border rounded-lg overflow-hidden shadow-lg">
        {board.map((row, rowIdx) => (
          <div key={rowIdx} className="flex">
            {row.map((piece, colIdx) => {
              const isLight = (rowIdx + colIdx) % 2 === 0;
              const isSelected = selectedPos?.row === rowIdx && selectedPos?.col === colIdx;
              const isValid = isValidMove(rowIdx, colIdx);
              const hasCapture = isValid && piece;

              return (
                <div
                  key={colIdx}
                  onClick={() => handleCellClick(rowIdx, colIdx)}
                  className={`
                    w-12 h-12 flex items-center justify-center cursor-pointer
                    text-3xl select-none transition-colors relative
                    ${isLight ? "bg-amber-100 dark:bg-amber-900/30" : "bg-amber-700 dark:bg-amber-950/50"}
                    ${isSelected ? "ring-2 ring-inset ring-accent" : ""}
                    ${isValid && !piece ? "after:absolute after:w-3 after:h-3 after:rounded-full after:bg-accent/50" : ""}
                    ${hasCapture ? "ring-2 ring-inset ring-destructive/50" : ""}
                    hover:brightness-110
                  `}
                >
                  {piece && (
                    <span className={piece.color === "white" ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" : "text-gray-900 dark:text-gray-800"}>
                      {PIECE_SYMBOLS[piece.color][piece.type]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Move history */}
      {moveHistory.length > 0 && (
        <div className="max-w-md w-full">
          <p className="text-xs text-muted-foreground mb-1">Move History:</p>
          <div className="flex flex-wrap gap-1 text-xs font-mono">
            {moveHistory.slice(-10).map((move, i) => (
              <span key={i} className="px-1.5 py-0.5 bg-muted rounded">
                {move}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <p className="text-xs text-muted-foreground text-center max-w-md">
        Click a piece to select, then click a highlighted square to move. 
        Valid moves are shown as dots, captures as red rings.
      </p>
    </div>
  );
};

export default ChessGame;
