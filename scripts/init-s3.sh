#!/bin/bash

# LocalStack S3バケット初期化スクリプト

# AWS認証情報を設定
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=ap-northeast-1

echo "Waiting for LocalStack to be ready..."
until curl -s http://localhost:4566/_localstack/health | grep -q '"s3": "available"'; do
  sleep 1
done

echo "LocalStack is ready. Creating S3 bucket..."

# バケット名を環境変数から取得（デフォルト: ai-bom-bucket）
BUCKET_NAME=${S3_BUCKET_NAME:-"ai-bom-bucket"}

# バケット作成
aws --endpoint-url=http://localhost:4566 \
  s3 mb s3://$BUCKET_NAME \
  --region ap-northeast-1

echo "S3 bucket '$BUCKET_NAME' created successfully!"

# バケットリストを確認
aws --endpoint-url=http://localhost:4566 \
  s3 ls \
  --region ap-northeast-1
