FROM ruby:3.2-alpine

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install --without development test

COPY . .

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
