from datetime import datetime as dt
from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey
from .base import Base


class Diary(Base):
    """
    Diary Model
    """

    __tablename__ = 'diaries'

    Id = Column(Integer(), primary_key=True, autoincrement=True)
    IdUser = Column(Integer(), ForeignKey('users.Id'), nullable=False)
    Title = Column(String(40), nullable=False)
    Description = Column(String(256), nullable=False)
    Timestamp = Column(TIMESTAMP(), nullable=False, default=dt.now())

    def serialize(self):
        """
        Serialize the data

        Returns:
            dict: The serialized data
        """

        return {
            "Id": self.Id,
            "IdUser": self.IdUser,
            "Title": self.Title,
            "Description": self.Description,
            "Timestamp": self.Timestamp.strftime('%d-%m-%Y'),
        }
