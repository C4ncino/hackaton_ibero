"""
Database class and Models
"""

# flake8: noqa
from .user import User
from .doctor import Doctor
from .patient import Patient
from .emergency_contact import EmergencyContact
from .questions import Question
from .diary import Diary
from .diary_questions import DiaryQuestions
from .register import Register

from .database import DatabaseInterface
