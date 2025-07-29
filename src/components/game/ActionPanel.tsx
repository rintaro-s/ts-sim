import { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function ActionPanel() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("ActionPanel must be used within a GameProvider");
  }
  const { dispatch } = context;

  const handleAction = (actionType: string) => {
    // ここでAPIを呼び出すロジックを実装する
    console.log(`Action selected: ${actionType}`);
    // ダミーのスコア更新
    dispatch({ type: 'UPDATE_SCORES', payload: { male: 5, female: 5, crisis: -2 } });
    dispatch({ type: 'INCREMENT_TURN' });

    // モード切り替えのダミーロジック
    if (Math.random() > 0.5) {
      dispatch({ type: 'SET_MODE', payload: 'onii' });
    } else {
      dispatch({ type: 'SET_MODE', payload: 'mahito' });
    }
  };

  const actions = [
    { name: '勉強', type: 'study' },
    { name: '筋トレ', type: 'workout' },
    { name: 'お化粧', type: 'makeup' },
    { name: 'オタ活', type: 'otaku' },
    { name: '睡眠', type: 'sleep' },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">行動選択</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Button
            key={action.type}
            onClick={() => handleAction(action.type)}
            className="py-4 text-lg"
          >
            {action.name}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
