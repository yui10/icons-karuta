# はじめに

このプログラムは有名サービスのロゴを名前から当てるゲームです。ロゴは[Simple icons](https://simpleicons.org/)を用いています。

# 実行する

1. コードをクローン
   ```bash
   git clone https://github.com/yui10/icons-karuta.git
   cd icons-karuta
   ```
1. docker にて実行

   本プログラムは開発環境と本番環境ごとに docker compose のファイルが違うため必要に応じて以下を参考にしてください。

   - 開発環境

   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```

   起動後,ブラウザで[http://localhost:3001](http://localhost:3001)を開く。

   - 本番環境

   ```bash
   docker compose -f docker-compose.prod.yml up -d
   ```

   起動後,ブラウザで[http://localhost:3000](http://localhost:3000)を開く。

# LICENSE

This software is released under the MIT License, see LICENSE.
