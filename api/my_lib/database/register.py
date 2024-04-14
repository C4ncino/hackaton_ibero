from datetime import datetime as dt
from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey
from .base import Base


class Register(Base):
    """
    Register Model
    """

    __tablename__ = 'registers'

    Id = Column(Integer(), primary_key=True)
    IdDiary = Column(Integer(), ForeignKey('diaries.Id'), nullable=False)
    IdQuestion = Column(Integer(), ForeignKey('questions.Id'), nullable=False)
    Answer = Column(String(512), nullable=False)
    Timestamp = Column(TIMESTAMP(), nullable=False, default=dt.now())

    def serialize(self):
        """
        Serialize the data

        Returns:
            dict: The serialized data
        """

        return {
            "Id": self.Id,
            "IdDiary": self.IdDiary,
            "IdQuestion": self.IdQuestion,
            "Answer": self.Answer,
            "Timestamp": self.Timestamp.strftime('%d-%m-%Y'),
        }
