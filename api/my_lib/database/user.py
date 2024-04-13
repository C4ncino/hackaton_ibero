from sqlalchemy import Column, Integer, String, TIMESTAMP
from .base import Base
from datetime import datetime

class User(Base):
    __tablename__ = 'users'

    Id = Column(Integer(), primary_key=True)
    FirstName = Column(String(20), nullable=False)
    LastName = Column(String(30), nullable=False)
    Age = Column(Integer(), nullable=False)
    Username = Column(String(15), nullable=False, unique=True)
    Password = Column(String(50), nullable=False)
    Prestige = Column(Integer(), nullable=False, default=0)
    Coins = Column(Integer(), nullable=False, default=0)
    Streak = Column(Integer(), nullable=False, default=0)
    CreatedDate = Column(TIMESTAMP(), nullable=False, default=datetime.now())

    def serialize(self):
        return {
            "id": self.Id,
            "firstName": self.FirstName,
            "lastName": self.LastName,
            "age": self.Age,
            "username": self.Username,
            "prestige": self.Prestige,
            "coins": self.Coins,
            "streak": self.Streak,
            "createdDate": self.CreatedDate
        }
