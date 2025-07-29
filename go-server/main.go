package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"_github.com/mattn/go-sqlite3"
)

type GameState struct {
	Mode      string `json:"mode"`
	Male      int    `json:"male"`
	Female    int    `json:"female"`
	Crisis    int    `json:"crisis"`
}

type ActionRequest struct {
	UserID string `json:"userId"`
	Action string `json:"action"`
}

var db *sql.DB

func initDB() {
	var err error
	db, err = sql.Open("sqlite3", "./game.db")
	if err != nil {
		log.Fatal(err)
	}

	sqlStmt := `
	CREATE TABLE IF NOT EXISTS actions (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id TEXT NOT NULL,
		turn INTEGER NOT NULL,
		mode TEXT NOT NULL,
		processed_by TEXT NOT NULL,
		action TEXT NOT NULL,
		male_score_change INTEGER,
		female_score_change INTEGER,
		crisis_score_change INTEGER,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);
	`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		log.Printf("%q: %s\n", err, sqlStmt)
		return
	}
}

func main() {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Initialize SQLite DB
	initDB()
	defer db.Close()

	// Routes
	e.POST("/api/life/update", updateLife)
	e.GET("/api/state/mode", getStateMode)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	e.Logger.Fatal(e.Start(":" + port))
}

func updateLife(c echo.Context) error {
	mode := c.Request().Header.Get("X-TS-Mode")
	if mode == "" || mode == "O" {
		return c.String(http.StatusBadRequest, "Invalid X-TS-Mode header for Mahiro mode")
	}

	req := new(ActionRequest)
	if err := c.Bind(req); err != nil {
		return err
	}

	// ダミーのスコア計算
	maleChange := 0
	femaleChange := 0
	crisisChange := 0

	switch req.Action {
	case "makeup":
		femaleChange = 10
		crisisChange = -5
	case "study":
		femaleChange = 5
		maleChange = 5
		crisisChange = -2
	case "workout":
		maleChange = 10
		crisisChange = 5
	case "otaku":
		maleChange = 3
		femaleChange = 3
		crisisChange = 10
	case "sleep":
		crisisChange = -10
	}

	// SQLiteにログを書き込み
	_, err := db.Exec(
		"INSERT INTO actions (user_id, turn, mode, processed_by, action, male_score_change, female_score_change, crisis_score_change) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
		req.UserID,
		0, // ダミーのターン数
		mode,
		"go",
		req.Action,
		maleChange,
		femaleChange,
		crisisChange,
	)
	if err != nil {
		log.Printf("Error inserting into DB: %v\n", err)
		return c.String(http.StatusInternalServerError, "Failed to log action")
	}

	// ダミーのゲーム状態を返す
	gameState := GameState{
		Mode:   mode,
		Male:   50 + maleChange,   // 適当な初期値と変化を反映
		Female: 50 + femaleChange,
		Crisis: 50 + crisisChange,
	}

	return c.JSON(http.StatusOK, gameState)
}

func getStateMode(c echo.Context) error {
	// ダミーのモードを返す
	mode := c.Request().Header.Get("X-TS-Mode")
	if mode == "" {
		mode = "M" // デフォルトはまひろ
	}

	return c.JSON(http.StatusOK, map[string]string{"mode": mode})
}
