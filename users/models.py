from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    """カスタムユーザーモデル"""
    email = models.EmailField(unique=True)  # メールアドレスをユニークにする
    age = models.PositiveIntegerField(null=True, blank=True)  # 年齢（オプション）
    weight = models.FloatField(null=True, blank=True)  # 体重（kg）
    height = models.FloatField(null=True, blank=True)  # 身長（cm）

    # ユーザー名の代わりにメールアドレスをログインに使う
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # スーパーユーザー作成時に必須のフィールド
    
    def __str__(self):
        return self.username  # 管理画面などで表示される名前