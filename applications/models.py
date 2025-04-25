from django.db import models
from django.conf import settings

class Applications(models.Model):

    JOB_STATUS = [
        ('applied', 'Applied'),
        ('video interview', 'Video Interview'),
        ('phone screen', 'Phone Screen'),
        ('online assessment', 'Online Assessment'),
        ('assessment centre', 'Assessment Centre'),
        ('offer', 'Offer'),
        ('rejected', 'Rejected'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    company = models.CharField(max_length=200)
    role = models.CharField(max_length=300)
    location = models.CharField(max_length=200, blank=True, null=True)
    salary = models.CharField(max_length=200, blank=True, null=True)
    status = models.CharField(max_length=50, choices=JOB_STATUS, default='Applied')
    applied_date = models.DateField(auto_now_add=True)
    notes = models.CharField(max_length=10000, blank=True, null=True)
    

    def __str__(self):
        return self.role