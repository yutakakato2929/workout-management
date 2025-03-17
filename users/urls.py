from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import register, CustomTokenObtainPairView

urlpatterns = [
    path('register/', register, name='register'),  # 新規登録
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),  # JWTログイン
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # トークン更新
]