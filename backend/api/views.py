import pandas as pd
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializers import *


@api_view(['POST'])
def signup(request):
    serializer = signup_serializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        response = {
            "message": "User created successfully.",
            "success": True,
        }
        return Response(response, status=status.HTTP_201_CREATED)

    response = {
        'data': serializer.errors,
        "message": "User not created.",
        "success": False,
    }
    return Response(response, status=status.HTTP_400_BAD_REQUEST)


def get_company_instance(request):

    try:
        company_symbol = request.data['symbol']
    except:
        company_symbol = request.data['file'].name[:-4]

    try:
        company_name = request.data['compnay']
    except:
        company_name = company_symbol

    try:
        company_instance = Company.objects.get(symbol=company_symbol)
    except:
        company_instance = Company.objects.create(
            name=company_name, symbol=company_symbol)

    return company_instance


def get_float(num):
    n=int(num)
    m=num-n
    m=m*100
    m=int(m)
    m=m/100
    return n+m

def convert_csv_into_list(price, compnay_id):
    price_list = []
    for i in range(len(price['Date'])):
        try:
            price_list.append(
                Data(
                    company=compnay_id,
                    date=price['Date'][i],
                    open=get_float(price['Open'][i]),
                    high=get_float(price['High'][i]),
                    low=get_float(price['Low'][i]),
                    close=get_float(price['Close'][i]),
                    adj_close=get_float(price['Adj Close'][i]),
                    volume=price['Volume'][i],
                )
            )
        except:
            pass
    return price_list


@api_view(['POST'])
def uploadCSV(request):
    company_instance = get_company_instance(request)
    try:
        file = pd.read_csv(request.data['file'])
        price_list = convert_csv_into_list(file, company_instance)
        d=Data.objects.bulk_create(price_list, ignore_conflicts=True)
        response = {
            "message": "Data added successfully.",
            "success": True,
        }

        return Response(response, status=status.HTTP_200_OK)
    except:
        return Response("something went wrong", status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_data(request):
    try:
        category = request.query_params['category']
        symbol=request.query_params['symbol']
    except:
        response = {
            "message": "Please Enter symbol and category.",
            "success": False,
        }

        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    if category == '3m' or category == '3M':
        gap = 1
    elif category == '6m' or category == '6M':
        gap = 2
    elif category == '1y' or category == '1Y':
        gap = 7
    elif category == '5y' or category == '5Y':
        gap = 28
    else:
        response = {
            "message": "Please Enter Correct Category.",
            "success": False,
        }

        return Response(response, status=status.HTTP_400_BAD_REQUEST)



    company = Company.objects.get(symbol=symbol)
    queryset = Data.objects.filter(company=company).order_by("date")[::gap]

    serializer = DataSerializer(queryset, many=True)
    high_min = float(serializer.data[0]['high'])
    high_max = 0.0

    for values in serializer.data:
        high_max = max(high_max, float(values['high']))
        high_min = min(high_min, float(values['high']))

    response = {
        'data': serializer.data,
        'ymax': high_max,
        'ymin': high_min,
        'compnay name': company.name,
        'compnay symbol': company.symbol,
        'category': category,
        'success': True,
    }

    return Response(response, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_company_list(requst):
    queryset=Company.objects.all()
    serializer = CompanySerializer(queryset, many=True)
    response = {
        'data':serializer.data,
        "message": "Done",
        "success": False,
    }

    return Response(response, status=status.HTTP_200_OK)

