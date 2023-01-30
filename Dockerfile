FROM node:18.11.0

# 環境変数を定義（Dockerfileとコンテナ内で参照可）
ENV LANG=C.UTF-8 \
    TZ=Asia/Tokyo

WORKDIR /app

# npm用に設定（yarnを使用する場合は不要）
USER node
