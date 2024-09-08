from django.db import models

# Create your models here.
class Transcription(models.Model):
  text = models.TextField(max_length=500)

  def __str__(self):
    return self.text

class Sentences(models.Model):
  sentence = models.TextField(max_length=500)

  def __str__(self):
    return self.sentence