from django.db import models


class Company(models.Model):
    name=models.CharField(max_length=40)
    symbol=models.CharField(max_length=15,unique=True)

class Data(models.Model):
    company=models.ForeignKey(Company,on_delete=models.CASCADE,blank=False)
    date=models.DateField()
    open=models.DecimalField(max_digits=7,decimal_places=2)
    close=models.DecimalField(max_digits=7,decimal_places=2)
    high=models.DecimalField(max_digits=7,decimal_places=2)
    low=models.DecimalField(max_digits=7,decimal_places=2)
    adj_close=models.DecimalField(max_digits=7,decimal_places=2)
    volume=models.IntegerField()

    class Meta:
        unique_together = (('company', 'date'),)
        index_together = (('company', 'date'),)
    
