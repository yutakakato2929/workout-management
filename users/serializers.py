from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """ユーザー情報のシリアライザー"""
    password = serializers.CharField(write_only=True)  # パスワードは書き込み専用

    class Meta:
        model = User
        fields = ("id", "email", "username", "password")

    def create(self, validated_data):
        """ユーザー作成時にパスワードをハッシュ化"""
        user = User.objects.create_user(
            email=validated_data["email"],
            username=validated_data["username"],
            password=validated_data["password"]
        )
        return user