from django.urls import path
from rest_framework import routers
from .views import *


router = routers.DefaultRouter()

urlpatterns = [
    path('signup/', signup),
    path('uploadCSV/', uploadCSV),
    path('get_data/', get_data),
    path('get_company_list/', get_company_list),
    
]