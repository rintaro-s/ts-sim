FROM python:3.11-bookworm

WORKDIR /app

# 必要な開発ツールをインストール (Debianベース)
RUN apt-get update && apt-get install -y --no-install-recommends     build-essential     libpq-dev     libsqlite3-dev     && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]