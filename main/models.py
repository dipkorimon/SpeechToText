from django.db import models

# Create your models here.
# for transcription
class Transcription(models.Model):
  text = models.TextField(max_length=500)

  def __str__(self):
    return self.text

# for pre-defined sentences
class Sentences(models.Model):
  sentence = models.TextField(max_length=500)

  def __str__(self):
    return self.sentence