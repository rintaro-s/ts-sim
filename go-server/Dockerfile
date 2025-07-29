FROM golang:1.24-bookworm

WORKDIR /app

# 必要な開発ツールをインストール (Debianベース)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY . .

RUN go mod tidy
RUN go mod download

RUN go build -o main .

EXPOSE 8080

CMD ["./main"]

