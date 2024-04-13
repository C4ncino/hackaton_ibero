from sqlalchemy import Column, Integer, String, ForeignKey
from .base import Base


class Question(Base):
    """
    Question Model
    """

    __tablename__ = 'questions'

    Id = Column(Integer(), primary_key=True)
    IdDoctor = Column(Integer(), ForeignKey('doctors.Id'), nullable=False)
    QuestionText = Column(String(100), nullable=False)

    def serialize(self):
        """
        Serialize the data

        Returns:
            dict: The serialized data
        """

        return {
            "IdDoctor": self.IdDoctor,
            "QuestionText": self.QuestionText,
        }, self.Id
