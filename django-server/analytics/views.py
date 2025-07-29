from rest_framework.views import APIView
from rest_framework.response import Response
import sqlite3

class IdentityHistoryView(APIView):
    def get(self, request, format=None):
        user_id = request.query_params.get('userId')
        if not user_id:
            return Response({"error": "userId query parameter is required"}, status=400)

        history = []
        try:
            # Go/Rubyサーバーと同じDBファイルを参照
            conn = sqlite3.connect('/app/game.db') 
            cursor = conn.cursor()
            cursor.execute("SELECT turn, male_score_change, female_score_change, crisis_score_change FROM actions WHERE user_id = ? ORDER BY turn ASC", (user_id,))
            rows = cursor.fetchall()
            for row in rows:
                history.append({
                    "turn": row[0],
                    "male_change": row[1],
                    "female_change": row[2],
                    "crisis_change": row[3],
                })
        except sqlite3.Error as e:
            print(f"SQLite error: {e}")
            return Response({"error": "Database error"}, status=500)
        finally:
            if conn:
                conn.close()

        return Response({"history": history})
