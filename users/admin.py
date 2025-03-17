from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser  # カスタムユーザーモデルをインポート

# Django Admin の設定をカスタマイズ
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("id", "email", "username", "is_active", "is_staff")  # 一覧で表示する項目
    list_filter = ("is_active", "is_staff")  # フィルタを追加
    ordering = ("id",)  # ID順に並び替え

    # フィールドの表示設定
    fieldsets = (
        (None, {"fields": ("email", "username", "password")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "username", "password1", "password2", "is_active", "is_staff"),
        }),
    )

# Django Admin に登録
admin.site.register(CustomUser, CustomUserAdmin)