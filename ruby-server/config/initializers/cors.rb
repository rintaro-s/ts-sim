Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*' # 開発中は全て許可
    resource '*'
    headers :any
    methods [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
