from sqlalchemy import Column, Integer, ForeignKey
from .base import Base


class DiaryQuestions(Base):
    """
    Diary - Questions relation Model
    """

    __tablename__ = 'diaries_questions'

    Id = Column(Integer(), primary_key=True)
    IdDiary = Column(Integer(), ForeignKey('diaries.Id'),
                     nullable=False)
    IdQuestion = Column(Integer(), ForeignKey('users.Id'), nullable=False)

    def serialize(self):
        """
        Serialize the data

        Returns:
            dict: The serialized data
        """

        return {
            "Id": self.Id,
            "IdDiary": self.IdDiary,
            "IdQuestion": self.IdQuestion
        }
