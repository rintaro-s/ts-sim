"use client";

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';

export default function ChatWindow() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<string[]>([
    "まひろ: こんにちは！今日はどんな一日だった？",
  ]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    setChatLog([...chatLog, `あなた: ${message}`]);
    setMessage('');
    // ここでLM StudioへのAPI呼び出しロジックを実装する
    setChatLog((prev) => [...prev, "まひろ: (考え中...)"]); // ダミーの応答
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">まひろとの会話</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-48 overflow-y-auto border rounded-md p-2 bg-gray-50 dark:bg-gray-700">
          {chatLog.map((log, index) => (
            <p key={index} className="text-sm mb-1">
              {log}
            </p>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            placeholder="メッセージを入力..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}>送信</Button>
        </div>
      </CardContent>
    </Card>
  );
}