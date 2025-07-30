FROM ruby:3.2-bookworm

WORKDIR /app

# 必要な開発ツールをインストール (Debianベース)
RUN apt-get update && apt-get install -y --no-install-recommends     build-essential     libffi-dev     libsqlite3-dev     libyaml-dev     && rm -rf /var/lib/apt/lists/*

COPY Gemfile ./
RUN bundle config set --local without 'development test'
RUN bundle install
RUN bundle clean --force

COPY . .

RUN bundle exec rails new . --force --api

EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]