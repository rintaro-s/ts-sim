import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function GameGrid() {
  // ダミーのグリッドデータを生成
  const gridSize = 5;
  const grid = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0));

  return (
    <Card className="w-full aspect-square">
      <CardHeader>
        <CardTitle className="text-center">ライフゲーム盤面</CardTitle>
      </CardHeader>
      <CardContent className="h-full flex items-center justify-center">
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            width: '100%',
            height: '100%',
          }}
        >
          {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="aspect-square bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs"
              >
                {/* セルの内容（行動アイコンなど）は後で追加 */}
              </div>
            ))
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
