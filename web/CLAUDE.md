graphql を使用しています。
パッケージ管理は pnpm です。

## 関数の書き方

arrow 関数を使用すること

### 良い例

```
export const ComponentName = () => {
  return <div></div>;
};
```

### 悪い例

```
export function AuthGuard() {
  return <div>AuthGuard</div>;
}
```
