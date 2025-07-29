class Api::LifeController < ApplicationController
  protect_from_forgery with: :null_session

  def update
    mode = request.headers['X-TS-Mode']
    if mode.blank? || mode == "M"
      render json: { error: "Invalid X-TS-Mode header for Onii mode" }, status: :bad_request
      return
    end

    action = params[:action]
    user_id = params[:userId]

    # 意図的な遅延
    sleep(rand(0.5..1.5))

    male_change = 0
    female_change = 0
    crisis_change = 0

    case action
    when "workout"
      male_change = 10
      crisis_change = 5
    when "study"
      male_change = 5
      female_change = 5
      crisis_change = -2
    when "makeup"
      female_change = 10
      crisis_change = -5
    when "otaku"
      male_change = 3
      female_change = 3
      crisis_change = 10
    when "sleep"
      crisis_change = -10
    end

    # SQLiteにログを書き込み (ダミー)
    # ここではDB接続は行わず、ログ出力のみ
    puts "[Ruby] Logging action: userId=#{user_id}, action=#{action}, mode=#{mode}"

    # ダミーのゲーム状態を返す
    game_state = {
      mode: mode,
      gauges: {
        male: 50 + male_change,
        female: 50 + female_change,
        crisis: 50 + crisis_change,
      }
    }

    render json: game_state
  end

  def get_mode
    mode = request.headers['X-TS-Mode'] || "O" # デフォルトはお兄ちゃん
    render json: { mode: mode }
  end
end
